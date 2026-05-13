import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { supabaseAdmin } from '../../lib/supabase-admin';
import { getProduct, getDownloadUrls, PRODUCTS } from '../../lib/products';
import { sendDeliveryEmail } from '../../lib/resend';

export const config = { api: { bodyParser: false } };

async function readRawBody(req: VercelRequest): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req as unknown as AsyncIterable<Buffer | string>) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function verifySignature(raw: Buffer, signatureHeader: string | undefined, secret: string): boolean {
  if (!signatureHeader) return false;
  const expected = createHmac('sha256', secret).update(raw).digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signatureHeader, 'utf8');
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function resolveProductId(event: any): string | null {
  // Primary: custom_data we set on the checkout URL — ?checkout[custom][product_id]=...
  const fromCustom = event?.meta?.custom_data?.product_id;
  if (typeof fromCustom === 'string' && getProduct(fromCustom)) return fromCustom;

  // Fallback: map LS variant_id → our slug via env config
  const variantId = String(event?.data?.attributes?.first_order_item?.variant_id ?? '');
  if (variantId) {
    const mapping: Record<string, string> = {
      [process.env.LS_VARIANT_916_STORYTELLER ?? '']: '916-storyteller',
      [process.env.LS_VARIANT_GRAB_AND_KEEP ?? '']: 'grab-and-keep',
      [process.env.LS_VARIANT_STORY_MASTERY ?? '']: 'story-mastery',
      [process.env.LS_VARIANT_CREATOR_BUNDLE ?? '']: 'creator-bundle',
      [process.env.LS_VARIANT_MASTER_COLLECTION ?? '']: 'master-collection',
    };
    const slug = mapping[variantId];
    if (slug && getProduct(slug)) return slug;
  }

  // Last resort: match by product name
  const productName = event?.data?.attributes?.first_order_item?.product_name;
  if (typeof productName === 'string') {
    const match = Object.entries(PRODUCTS).find(([, def]) => def.title === productName);
    if (match) return match[0];
  }

  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    console.error('[ls-webhook] LEMON_SQUEEZY_WEBHOOK_SECRET not set');
    return res.status(500).json({ error: 'server misconfigured' });
  }

  let raw: Buffer;
  try {
    raw = await readRawBody(req);
  } catch (err) {
    console.error('[ls-webhook] failed reading body:', err);
    return res.status(400).json({ error: 'bad body' });
  }

  const sig = req.headers['x-signature'] as string | undefined;
  if (!verifySignature(raw, sig, secret)) {
    console.error('[ls-webhook] signature mismatch');
    return res.status(401).json({ error: 'invalid signature' });
  }

  let event: any;
  try {
    event = JSON.parse(raw.toString('utf8'));
  } catch {
    return res.status(400).json({ error: 'invalid json' });
  }

  const eventName = event?.meta?.event_name as string | undefined;

  // Lemon Squeezy sends many event types — we only care about order_created for delivery.
  // Acknowledge everything else with 200 so LS doesn't retry.
  if (eventName !== 'order_created') {
    return res.status(200).json({ received: true, processed: false, event: eventName });
  }

  const data = event?.data;
  const attrs = data?.attributes;
  const orderId: string | undefined = data?.id ? String(data.id) : undefined;
  const email: string | undefined = attrs?.user_email;
  const orderNumber: number | undefined = attrs?.order_number;
  const totalCents: number | undefined = attrs?.total;
  const currency: string | undefined = attrs?.currency;

  if (!orderId || !email) {
    console.error('[ls-webhook] missing orderId or email', { orderId, email });
    return res.status(200).json({ received: true, error: 'missing fields' });
  }

  const productId = resolveProductId(event);
  if (!productId) {
    console.error('[ls-webhook] could not resolve product_id from event');
    return res.status(200).json({ received: true, error: 'unknown product' });
  }

  const product = getProduct(productId)!;

  // Idempotency: LS retries on non-2xx. Skip if we've already delivered this order.
  const { data: existing } = await supabaseAdmin
    .from('orders')
    .select('id')
    .eq('lemon_order_id', orderId)
    .maybeSingle();

  if (existing) {
    return res.status(200).json({ received: true, duplicate: true });
  }

  const { error: insertErr } = await supabaseAdmin.from('orders').insert({
    lemon_order_id: orderId,
    lemon_order_number: orderNumber ?? null,
    email,
    product_id: productId,
    product_title: product.title,
    amount_cents: totalCents ?? null,
    currency: currency ?? 'USD',
  });

  if (insertErr) {
    console.error('[ls-webhook] supabase insert failed:', insertErr.message);
    // Return 500 so LS retries.
    return res.status(500).json({ error: 'db error' });
  }

  const downloadUrls = await getDownloadUrls(productId);
  if (downloadUrls.length === 0) {
    console.error('[ls-webhook] no download URLs for', productId);
  }

  try {
    await sendDeliveryEmail({ to: email, productTitle: product.title, downloadUrls });
  } catch (err) {
    console.error('[ls-webhook] email send failed:', err);
    // Order is recorded; do not retry on email failure (would create duplicates).
  }

  console.log(`[ls-webhook] delivered: order=${orderId} product=${productId} email=${email}`);
  return res.status(200).json({ received: true, processed: true });
}

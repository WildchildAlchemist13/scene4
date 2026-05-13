import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendWelcomeEmail } from '../lib/resend';

// Called by Supabase Database Webhook when a row is inserted into `leads`.
// Configure in Supabase: Database → Webhooks → Create
//   Table: leads | Event: INSERT | URL: https://scene4.tech/api/leads
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }

  // Supabase webhook payload shape: { type, table, record: { email, ... }, ... }
  const record = (req.body as any)?.record;
  const email: string | undefined = record?.email;

  if (!email) {
    console.error('[leads] missing email in payload');
    return res.status(400).json({ error: 'missing email' });
  }

  await sendWelcomeEmail(email);
  return res.status(200).json({ sent: true, email });
}

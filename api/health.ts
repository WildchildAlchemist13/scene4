import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const envOk = {
    supabase_url: Boolean(process.env.SUPABASE_URL),
    supabase_service_role: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    resend_api_key: Boolean(process.env.RESEND_API_KEY),
    lemon_webhook_secret: Boolean(process.env.LEMON_SQUEEZY_WEBHOOK_SECRET),
  };
  const ready = Object.values(envOk).every(Boolean);
  res.status(200).json({ ok: true, ready, env: envOk, ts: new Date().toISOString() });
}

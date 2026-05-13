-- ============================================================
-- Scene4 — Database Schema (Lemon Squeezy)
-- Run in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Orders table: filled by the Lemon Squeezy webhook on `order_created`.
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lemon_order_id TEXT UNIQUE NOT NULL,
  lemon_order_number BIGINT,
  email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  amount_cents INTEGER,
  currency TEXT DEFAULT 'USD',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS orders_email_idx ON public.orders(email);
CREATE INDEX IF NOT EXISTS orders_product_id_idx ON public.orders(product_id);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders(created_at DESC);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users see own orders" ON public.orders;
CREATE POLICY "Users see own orders" ON public.orders
  FOR SELECT USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Service role (used by /api/* server routes) bypasses RLS automatically;
-- no insert policy required for the webhook handler.

-- ============================================================
-- Leads table: top-of-funnel email captures (lead magnets, newsletter).
-- A Supabase Database Webhook on INSERT fires /api/leads to send the welcome email.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT,          -- e.g. 'home-hero', 'free-hooks', 'beat-sheet'
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS leads_source_idx ON public.leads(source);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads(created_at DESC);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anonymous frontend can insert (we don't want bots to read the list).
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Verify:
-- SELECT id, email, product_id, amount_cents, created_at FROM public.orders LIMIT 5;
-- SELECT id, email, source, created_at FROM public.leads LIMIT 5;

# Scene4 — Production Setup

End-to-end checklist to get scene4.tech live with payments, fulfillment, and email.
Follow top-to-bottom; nothing here depends on Vercel CLI — every step uses dashboards.

---

## 0 — Prerequisites

- GitHub access to `WildchildAlchemist13/scene4`
- Supabase project (existing)
- Hostinger account (domain only — already done)
- Working email for Lemon Squeezy + Resend signups

---

## 1 — Lemon Squeezy account + products

1. Sign up at https://lemonsqueezy.com — choose a **store name** (this becomes the subdomain, e.g. `scene4.lemonsqueezy.com`).
2. Complete the tax / payout onboarding. As an Indian seller, payout goes to your bank via Wise. You will need: PAN, bank account, and a brief description of what you sell.
3. Create **5 products** in `Products → New product`. For each, set type = **single payment** and upload the PDF as the delivery file (LS will host it; we ALSO host signed copies in Supabase for redundancy).

| Product Name | Price (USD) | Slug used in code |
|---|---|---|
| The 9:16 Storyteller | 13 | `916-storyteller` |
| Grab & Keep | 29 | `grab-and-keep` |
| Story & Screenplay Mastery | 79 | `story-mastery` |
| Creator Bundle (Books 1 + 2) | 33 | `creator-bundle` |
| Master Collection (All 3 Books) | 99 | `master-collection` |

4. For each product, click **Share → Buy link** and copy the URL. Format:
   `https://YOUR-STORE.lemonsqueezy.com/buy/VARIANT-UUID`
5. Open each product's **Variants** tab → click the menu (...) on the variant → **Get ID**. Copy the numeric variant ID.

You now have, for each of the 5 products:
- a buy URL (used in the frontend)
- a variant ID (fallback for the webhook)

---

## 2 — Lemon Squeezy webhook

1. In LS dashboard, go to **Settings → Webhooks → Create webhook**.
2. **Callback URL**: `https://scene4.tech/api/webhooks/lemon-squeezy` (this won't 200 yet — that's fine, we set it now and verify after deploy).
3. **Signing secret**: generate any random string (e.g. `openssl rand -hex 32`). Save it — you'll paste this into Vercel as `LEMON_SQUEEZY_WEBHOOK_SECRET`.
4. **Events to send**: enable `order_created`. (You can add `order_refunded`, `subscription_created`, etc. later — we'll handle them in code as we add features.)
5. Click **Save**.

---

## 3 — Supabase

### 3a. Run the migration

In Supabase Dashboard → **SQL Editor → New query**, paste the contents of [`supabase/migrations/001_orders_and_leads.sql`](supabase/migrations/001_orders_and_leads.sql) and run.

This creates:
- `orders` table — written by the LS webhook on successful payment.
- `leads` table — written by the frontend on email capture.

### 3b. Create the `books` storage bucket

Storage → **Create new bucket** → name `books` → **private** (not public).

Upload the PDFs with these exact filenames:
- `916-storyteller.pdf`
- `grab-and-keep.pdf`
- `story-mastery.pdf`

These names are referenced in [`lib/products.ts`](lib/products.ts) — change either side together if you rename.

### 3c. Database webhook for welcome emails

Database → **Webhooks → Create**:
- **Name**: `leads-welcome`
- **Table**: `leads`
- **Events**: `INSERT`
- **URL**: `https://scene4.tech/api/leads`
- **HTTP method**: `POST`

This fires `sendWelcomeEmail` whenever a new lead is captured.

### 3d. Grab your keys

Settings → API:
- **Project URL** → use for `SUPABASE_URL` and `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`
- **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY` (server-only; never commit)

---

## 4 — Resend (email)

1. Sign up at https://resend.com — free tier covers 3,000 emails/mo.
2. **Domains → Add domain → `scene4.tech`**.
3. Resend gives you DNS records (SPF, DKIM). Add them in Hostinger: **Domains → scene4.tech → Manage → DNS / Nameservers → Manage DNS records → Add record**. One TXT for SPF, three CNAME for DKIM.
4. Wait ~10 min, click **Verify** in Resend.
5. **API Keys → Create API key** → name `scene4-prod`, full access. Copy it → `RESEND_API_KEY`.
6. The sender used in code is `deliver@scene4.tech`. Resend doesn't need you to create that mailbox; once the domain is verified you can send `from` any address at the domain.

---

## 5 — Vercel deploy

1. Sign up at https://vercel.com using your GitHub account.
2. **Add New → Project → Import** the `WildchildAlchemist13/scene4` repo.
3. Framework preset: **Vite** (Vercel auto-detects).
4. **Environment Variables** — paste all of these (values come from steps 1–4):

   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   SUPABASE_URL
   SUPABASE_SERVICE_ROLE_KEY
   RESEND_API_KEY
   RESEND_FROM
   LEMON_SQUEEZY_WEBHOOK_SECRET

   LS_VARIANT_916_STORYTELLER
   LS_VARIANT_GRAB_AND_KEEP
   LS_VARIANT_STORY_MASTERY
   LS_VARIANT_CREATOR_BUNDLE
   LS_VARIANT_MASTER_COLLECTION

   VITE_LS_BUY_916_STORYTELLER
   VITE_LS_BUY_GRAB_AND_KEEP
   VITE_LS_BUY_STORY_MASTERY
   VITE_LS_BUY_CREATOR_BUNDLE
   VITE_LS_BUY_MASTER_COLLECTION
   ```

5. Click **Deploy**. First build takes ~2 min. You get a `*.vercel.app` URL.
6. Visit `https://YOUR-DEPLOY.vercel.app/api/health` — should return `{ ok: true, ready: true, ... }` with every env flag green. If `ready: false`, the response shows which env vars are missing.

---

## 6 — Point scene4.tech at Vercel (DNS)

In Vercel: **Project → Settings → Domains → Add → `scene4.tech`** and `www.scene4.tech`. Vercel will show you the two DNS records to add.

In Hostinger: **Domains → scene4.tech → Manage → DNS / Nameservers**. Add:

| Type | Name | Value | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | 3600 |

(If Vercel shows different values in your dashboard, use those — they sometimes update edge IPs.)

**Remove any existing GitHub-Pages-related A or CNAME records** for `@` or `www` — those keep traffic going to the old static site.

DNS propagates in ~10 min – 2 hours. When done, `https://scene4.tech` loads from Vercel, and your LS webhook URL (`https://scene4.tech/api/webhooks/lemon-squeezy`) becomes live.

---

## 7 — End-to-end test

1. Make sure all 5 LS products have **Test mode** disabled (or use a test variant for the first run).
2. Visit `https://scene4.tech/books`, click the cheapest book ($13), enter your real email, click **Proceed to Checkout**.
3. Pay with a real card (LS doesn't ship test cards in production — refund yourself after).
4. Within 60 seconds you should receive the delivery email with a signed download link.
5. Verify in Supabase: `SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;` — the new row is there.
6. If anything is wrong: Vercel **Logs** tab shows webhook invocations in real time.

After this passes once, the autonomous fulfillment loop is real.

---

## 8 — Common issues

| Symptom | Likely cause |
|---|---|
| `/api/health` returns 404 | Vercel didn't see the `api/` directory. Check `vercel.json` exists at repo root. |
| `/api/health` returns `ready: false` | Env var(s) missing. Match the names exactly in Vercel settings. |
| LS webhook gets `401 invalid signature` | `LEMON_SQUEEZY_WEBHOOK_SECRET` in Vercel doesn't match the one you set in LS. |
| Email fails with `from address not allowed` | Resend domain not verified yet, or `RESEND_FROM` uses a different domain. |
| Download link 404 | PDF filename in Supabase Storage doesn't match `lib/products.ts`. Case-sensitive. |
| DNS not propagating | Old GH Pages records still present. Remove them. Use https://dnschecker.org to verify. |

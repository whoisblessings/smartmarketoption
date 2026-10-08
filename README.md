# Smart Market Option

Investment platform with **glassmorphism UI**, **AMOLED black + green accent**, bottom navigation, **M-Pesa Daraja** payments, and a full **admin panel**.

**Repo:** https://github.com/whoisblessings/smartmarketoption

## Features

- 🌑 AMOLED black theme with `#00C853` green accent
- ✨ Glassmorphism cards (backdrop-blur)
- 📱 Bottom navigation (Home, Invest, Wallet, History, Profile)
- 🎨 Google Material Symbols (flat icons)
- 📦 3 adjustable investment packages (amount, interest rate, min investment)
- 💳 M-Pesa STK Push via Safaricom Daraja API
- 👤 Admin panel: users, packages, payments, stats
- 🗄️ Supabase Auth + Database
- 🖼️ Landing page with free Unsplash stock images

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/whoisblessings/smartmarketoption.git
cd smartmarketoption
npm install
```

### 2. Environment

Copy `.env.example` → `.env.local` (already pre-filled with your Supabase URL & key):

```env
NEXT_PUBLIC_SUPABASE_URL=https://ccbqjkptvyphxmtgemsh.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_1Rf038tDokOxRnAB5mbfkQ_LbFwJT9W

# Optional – for full server control of payments
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Daraja (get from https://developer.safaricom.co.ke)
DARAJA_CONSUMER_KEY=
DARAJA_CONSUMER_SECRET=
DARAJA_PASSKEY=
DARAJA_SHORTCODE=174379
DARAJA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
DARAJA_ENV=sandbox

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Supabase Setup

1. Open your project: https://supabase.com/dashboard
2. Go to **SQL Editor** → New query
3. Paste and run the contents of `supabase/schema.sql`
4. (Optional) After first user registers, promote to admin:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'you@example.com';
```

### 4. Run

```bash
npm run dev
```

Open http://localhost:3000

## Admin Panel

- Path: `/admin`
- Only users with `role = 'admin'` can access
- Manage packages (name, min/max amount, interest %, duration, active status)
- View/manage users & roles
- Approve/reject pending payments
- Live stats dashboard

## Daraja Integration

- STK Push endpoint: `POST /api/mpesa/stk`
- Callback: `POST /api/mpesa/callback`
- Without credentials the app runs in **demo mode** (creates pending payments)
- For production: use production shortcode + set `DARAJA_ENV=production`

## Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Framework    | Next.js 15 (App Router)       |
| Styling      | Tailwind CSS + Glassmorphism  |
| Icons        | Google Material Symbols       |
| Auth & DB    | Supabase                      |
| Payments     | Safaricom Daraja (M-Pesa)     |
| Charts (opt) | Recharts                      |

## Project Structure

```
app/
  page.tsx              # Landing
  auth/login|register   # Auth
  dashboard/            # User home
  invest/               # Packages & invest
  wallet/               # Deposit / Withdraw
  history/              # History
  profile/              # Profile + logout
  admin/                # Full admin control
  api/mpesa/            # Daraja STK + callback
components/
  BottomNav.tsx
  AppShell.tsx
  ui/                   # GlassCard, Icon
lib/
  supabase/             # Client & server helpers
  types.ts
  utils.ts
supabase/
  schema.sql            # Full DB schema + seed
```

## License

MIT

# Real Estate Companies Admin - Setup Guide

## Implementation Complete!

I've successfully created a comprehensive Real Estate Companies admin section with full Supabase and Stripe integration.

---

## What Was Created

### Database Schema
- `supabase-companies-schema.sql` - Complete database schema with:
  - `companies` table (full company info, subscription, billing)
  - `company_agents` table (agent management per company)
  - `company_invoices` table (payment history)
  - Indexes, RLS policies, and sample data

### API Routes

**Companies API** (`/api/companies/`):
- GET `/api/companies` - List all companies with filters
- POST `/api/companies` - Create new company
- GET `/api/companies/[id]` - Get single company
- PUT `/api/companies/[id]` - Update company
- DELETE `/api/companies/[id]` - Delete company
- GET `/api/companies/summary` - Dashboard summary stats
- GET `/api/companies/[id]/agents` - Get company agents
- POST `/api/companies/[id]/agents` - Add agent
- DELETE `/api/companies/[id]/agents` - Remove agent
- GET `/api/companies/[id]/invoices` - Get invoices
- POST `/api/companies/[id]/invoices` - Create invoice

**Stripe API** (`/api/stripe/`):
- POST `/api/stripe/create-customer` - Create Stripe customer
- POST `/api/stripe/create-subscription` - Create subscription
- POST `/api/stripe/webhooks` - Handle Stripe webhooks

### Admin Pages

**Main Companies Page** (`/admin/companies`):
- Summary dashboard (Total, Active, Suspended, Revenue, Agents)
- Sortable companies table with logo, contact, plan, agents, listings
- Search and filters (status, plan, country)
- Add new company button
- Delete functionality

**New Company Page** (`/admin/companies/new`):
- Tabbed form (Company Info + Subscription Plan)
- Logo upload to Cloudinary
- Plan selection with pricing cards
- Stripe customer creation

**Company Detail Page** (`/admin/companies/[id]`):
- 6 tabs: Overview, Agents, Listings, Billing, Analytics, Settings
- Full company management interface

### Components

**Tab Components**:
- `CompanyAgentsTab` - Manage company agents
- `CompanyListingsTab` - View company properties
- `CompanyBillingTab` - Subscription & invoices
- `CompanyAnalyticsTab` - Charts and metrics
- `CompanySettingsTab` - Status, API keys, delete

### Libraries & Helpers

- `src/lib/stripe.ts` - Stripe SDK integration
- `src/types/company.ts` - TypeScript interfaces
- UI components: Switch, Label

---

## Setup Instructions

### Step 1: Install Stripe CLI (for local testing)

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Login
stripe login
```

### Step 2: Create Database Tables

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Open **SQL Editor** → **New Query**
3. Copy and paste entire contents of `supabase-companies-schema.sql`
4. Click **Run**

This creates:
- Companies table
- Company agents table
- Company invoices table
- 4 sample companies

### Step 3: Configure Stripe

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your API keys:
   - **Secret Key**: Dashboard → Developers → API keys → Secret key
   - **Publishable Key**: Dashboard → Developers → API keys → Publishable key

3. Create Price IDs:
   - Go to **Products** → **Add Product**
   - Create 3 products:
     - **Standard Plan**: €49/month
     - **Premium Plan**: €99/month
     - **Enterprise Plan**: €199/month
   - Copy each **Price ID** (starts with `price_`)

4. Set up Webhook:
   - Go to **Developers** → **Webhooks**
   - Add endpoint: `https://your-site.vercel.app/api/stripe/webhooks`
   - Select events:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.paid`
     - `invoice.payment_failed`
   - Copy **Webhook Secret** (starts with `whsec_`)

### Step 4: Add Environment Variables

Add to `.env.local`:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

# Stripe Price IDs
STRIPE_PRICE_STANDARD=price_your_standard_price_id
STRIPE_PRICE_PREMIUM=price_your_premium_price_id
STRIPE_PRICE_ENTERPRISE=price_your_enterprise_price_id
```

Add to **Vercel** (for production):
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all the above variables
3. Redeploy

### Step 5: Test Locally

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward Stripe webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhooks
```

Then visit:
- Main page: `http://localhost:3000/en/admin/companies`
- Add company: `http://localhost:3000/en/admin/companies/new`

---

## Features Overview

### Companies List Page

**Summary Cards** (top):
- Total Companies
- Active Companies
- Active Agents
- Monthly Revenue

**Companies Table**:
- Sortable columns (Name, City, Plan, Agents, Listings, Status)
- Search by name, email, city
- Filter by status, plan, country
- Logo thumbnails
- Color-coded badges (Plan & Status)
- View and Delete actions

### Company Detail Page

**Overview Tab**:
- Company logo and info
- Contact details (email, phone, website, address)
- Subscription details with limits
- Statistics (agents, listings, member since)

**Agents Tab**:
- List all company agents
- Add new agent (inline form)
- Remove agents
- Role badges (Manager/Agent/Marketing)
- Listings count per agent

**Listings Tab**:
- All properties for this company
- Filter by status
- View property details
- Property thumbnails

**Billing Tab**:
- Current plan card with pricing
- Usage meters (listings & agents)
- Upgrade plan dialog
- Payment history table
- Invoice generation
- Send invoice button

**Analytics Tab**:
- Summary metrics (Views, Leads, Conversion, Active Listings)
- Views & Leads line chart
- Listings growth bar chart
- Properties by city pie chart
- Interactive Recharts visualizations

**Settings Tab**:
- Toggle active/inactive status
- API key generation
- Internal notes
- Delete company (danger zone)

---

## Plan Features & Pricing

| Plan | Price/month | Listings | Agents | Features |
|------|-------------|----------|---------|----------|
| Free | €0 | 5 | 1 | Basic Support |
| Standard | €49 | 25 | 5 | Priority Support, Analytics |
| Premium | €99 | 50 | 10 | Custom Branding |
| Enterprise | €199 | 100 | 20 | API Access, White Label |

---

## Color Coding

**Subscription Plans**:
- Free: Gray
- Standard: Blue
- Premium: Purple
- Enterprise: Gold/Amber

**Company Status**:
- Active: Green
- Pending: Yellow
- Suspended: Red

**Agent Roles**:
- Manager: Blue
- Agent: Green
- Marketing: Purple

---

## How to Use

### Add a New Company

1. Go to **Admin** → **Companies**
2. Click **"Add New Company"**
3. Fill in **Company Info** tab:
   - Upload logo (Cloudinary)
   - Enter name, contact person, email, phone
   - Add address, city, country
   - Enter tax ID
4. Select **Subscription Plan** tab:
   - Choose plan (Free/Standard/Premium/Enterprise)
   - Set auto-renew
5. Click **"Create Company"**
6. If plan is paid, Stripe customer is created automatically

### Manage Agents

1. Open company detail page
2. Go to **Agents** tab
3. Click **"Add Agent"**
4. Enter name, email, phone, role
5. Click **"Add Agent"**
6. To remove: Click trash icon on agent row

### Upgrade Plan

1. Open company detail page
2. Go to **Billing** tab
3. Click **"Upgrade Plan"**
4. Select new plan
5. Click **"Update Plan"**
6. Limits automatically updated

### View Analytics

1. Open company detail page
2. Go to **Analytics** tab
3. See:
   - Property views and leads
   - Listings growth over time
   - Properties by city distribution
   - Conversion rates

---

## API Integration

### Create Company with Stripe

```typescript
const response = await fetch('/api/companies', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    company: {
      name: 'My Company',
      email: 'contact@company.com',
      // ... other fields
    },
    createStripeCustomer: true, // Creates Stripe customer
  }),
});
```

### Fetch Company with Counts

```typescript
const response = await fetch('/api/companies/[id]');
const { company } = await response.json();
// company includes agents_count and listings_count
```

---

## Stripe Webhooks

The webhook handler (`/api/stripe/webhooks`) automatically:

**On subscription created/updated**:
- Updates company payment status
- Sets plan start/end dates

**On subscription deleted**:
- Downgrades to free plan
- Updates limits

**On invoice paid**:
- Marks invoice as paid
- Updates payment status

**On payment failed**:
- Marks payment as overdue

---

## Testing Checklist

- [ ] Database schema created in Supabase
- [ ] Sample companies visible in admin panel
- [ ] Can add new company
- [ ] Logo upload works (Cloudinary configured)
- [ ] Can add/remove agents
- [ ] Can view company listings
- [ ] Can upgrade subscription plan
- [ ] Analytics charts display
- [ ] Can toggle company status
- [ ] Can delete company
- [ ] Stripe webhooks working (test with Stripe CLI)

---

## File Structure

```
src/
├── app/
│   ├── [lang]/admin/companies/
│   │   ├── page.tsx                  # Main list
│   │   ├── new/page.tsx              # Add company
│   │   └── [id]/
│   │       ├── page.tsx              # Detail page
│   │       └── components/
│   │           ├── CompanyAgentsTab.tsx
│   │           ├── CompanyListingsTab.tsx
│   │           ├── CompanyBillingTab.tsx
│   │           ├── CompanyAnalyticsTab.tsx
│   │           └── CompanySettingsTab.tsx
│   └── api/
│       ├── companies/
│       │   ├── route.ts              # List & Create
│       │   ├── summary/route.ts      # Dashboard stats
│       │   └── [id]/
│       │       ├── route.ts          # Get, Update, Delete
│       │       ├── agents/route.ts   # Agent management
│       │       └── invoices/route.ts # Invoice management
│       └── stripe/
│           ├── create-customer/route.ts
│           ├── create-subscription/route.ts
│           └── webhooks/route.ts
├── components/
│   ├── admin/AdminLayout.tsx         # Updated with Companies link
│   └── ui/
│       ├── label.tsx                 # New
│       └── switch.tsx                # New
├── lib/
│   └── stripe.ts                     # Stripe helpers
└── types/
    └── company.ts                    # TypeScript interfaces
```

---

## Dependencies Installed

- `stripe` - Stripe SDK
- `@radix-ui/react-switch` - Toggle component
- `recharts` - Charts library (already installed)

---

## Next Steps

1. **Run SQL schema** in Supabase
2. **Configure Stripe** (API keys, products, webhooks)
3. **Add environment variables** to `.env.local` and Vercel
4. **Test locally** with Stripe CLI
5. **Deploy to Vercel**

---

## Production Deployment

Before deploying to production:

1. **Switch Stripe to Live Mode**:
   - Get live API keys from Stripe
   - Update all env vars with live keys
   - Update webhook endpoint to production URL

2. **Set Vercel Environment Variables**:
   - All Stripe keys
   - Price IDs for all plans

3. **Configure Stripe Webhook**:
   - Production URL: `https://your-domain.com/api/stripe/webhooks`
   - Add webhook secret to Vercel

4. **Test End-to-End**:
   - Create test company
   - Add test agent
   - Upgrade plan
   - Verify webhook triggers

---

## Troubleshooting

### "Stripe not configured"
**Fix**: Add `STRIPE_SECRET_KEY` to `.env.local`

### Webhooks not working
**Fix**: 
1. Use Stripe CLI locally: `stripe listen --forward-to localhost:3000/api/stripe/webhooks`
2. Check webhook secret matches env var

### Company counts not showing
**Fix**: Make sure `company_id` column was added to `properties` table (run schema SQL)

### Logo upload fails
**Fix**: Verify Cloudinary is configured (see Cloudinary setup guide)

---

## Success!

You now have a complete real estate companies management system with:

- Full CRUD operations
- Stripe billing integration
- Agent management
- Analytics dashboard
- Invoice generation
- Multi-tier subscriptions
- Professional admin UI

**Ready to use!** Just complete the setup steps above and start managing companies!


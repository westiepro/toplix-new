# Environment Variables Required for Production

This document lists all environment variables used in the application. Add these to your Vercel project settings.

## Required Variables (Application won't work without these)

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for admin operations)

## Optional Variables (Features will be disabled if missing)

### Stripe (Payment Processing)
- `STRIPE_SECRET_KEY` - Stripe secret key for payment processing
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret for verifying webhook requests
- `STRIPE_PRICE_STANDARD` - Stripe price ID for Standard plan
- `STRIPE_PRICE_PREMIUM` - Stripe price ID for Premium plan
- `STRIPE_PRICE_ENTERPRISE` - Stripe price ID for Enterprise plan

### Mapbox (Map Display)
- `NEXT_PUBLIC_MAPBOX_TOKEN` - Mapbox access token for map rendering

### Google Services
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key for embedded maps
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics 4 measurement ID

### Cloudinary (Image Management)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` - Cloudinary upload preset
- `CLOUDINARY_API_KEY` - Cloudinary API key (server-side only)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (server-side only)

### Plausible Analytics
- `NEXT_PUBLIC_PLAUSIBLE_URL` - Plausible analytics URL (defaults to https://plausible.io)
- `PLAUSIBLE_API_KEY` - Plausible API key (server-side only)
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - Plausible site domain

### OpenAI (AI Features)
- `OPENAI_API_KEY` - OpenAI API key for AI-powered features

### Site Configuration
- `NEXT_PUBLIC_SITE_URL` - Your site's public URL (e.g., https://yourdomain.com)

### Unsplash (Image Scripts - Development Only)
- `UNSPLASH_ACCESS_KEY` - Unsplash API key (used in development scripts only)

## Vercel-Specific Variables

Vercel automatically provides:
- `VERCEL` - Set to "1" when running on Vercel
- `NODE_ENV` - Set to "production" in production builds

## Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser and should not contain secrets
- Variables without `NEXT_PUBLIC_` are server-side only and can contain secrets
- All optional variables have fallback behavior - the app will work without them, but specific features will be disabled


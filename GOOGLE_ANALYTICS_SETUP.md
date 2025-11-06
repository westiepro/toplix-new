# Google Analytics 4 (GA4) - Complete Setup Guide

## ✅ Installation Complete

Your real estate portal is now configured with **Google Analytics 4** instead of Plausible Analytics.

---

## 📋 What You Need to Do

### **Step 1: Create Google Analytics Account**

1. **Visit Google Analytics**
   - Go to: https://analytics.google.com
   - Sign in with your Google account

2. **Create a Property**
   - Click **"Admin"** (gear icon, bottom left)
   - Click **"Create Account"** (if needed)
     - Account name: "Toplix Real Estate"
   - Click **"Create Property"**
     - Property name: "Toplix Website"
     - Time zone: Your timezone
     - Currency: EUR (€)
   - Click **"Next"**

3. **Business Information**
   - Industry category: Real Estate
   - Business size: Select yours
   - How you plan to use: Check relevant boxes
   - Click **"Create"**
   - Accept Terms of Service

4. **Set Up Data Stream**
   - Click **"Web"**
   - Website URL: `https://yourdomain.com`
   - Stream name: "Toplix Web Stream"
   - Click **"Create stream"**

5. **Copy Your Measurement ID**
   - You'll see: **Measurement ID: G-XXXXXXXXXX**
   - **COPY THIS ID!** (You need it for the next step)

---

### **Step 2: Add Measurement ID to Your Project**

1. **Open your `.env.local` file**

2. **Add this line** (replace with your actual ID):
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Save the file**

4. **Restart your dev server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

---

### **Step 3: Verify It's Working**

1. **Open your website:** http://localhost:3001
2. **Go to Google Analytics:**
   - Navigate to **Reports** → **Realtime**
3. **You should see yourself** in the realtime visitors within 30 seconds!

**Test Events:**
- Browse some properties → Check for "view_item" events
- Add a property to favorites → Check for "add_to_wishlist" events
- Search for a city → Check for "search" events
- Click on a property card → Check for "select_item" events

---

## 🎯 Events Being Tracked

All your existing analytics are now sending to GA4:

### **E-commerce Events** (Standard GA4 Events)
- `view_item` - Property views
- `select_item` - Property card clicks
- `add_to_wishlist` - Adding favorites
- `remove_from_wishlist` - Removing favorites
- `share` - Property sharing
- `search` - Property searches
- `generate_lead` - Contact form submissions

### **Custom Events**
- `property_view` - Property page visits
- `map_interaction` - Map zoom, pan, clicks
- `filter_applied` - Search filter usage
- `language_switch` - Language changes
- `save_search` - Saved search creation
- `ai_style_view` - AI decoration views

---

## 🔧 Advanced Setup (Optional)

### **Enhanced Measurement**

In Google Analytics:
1. Go to **Admin** → **Data Streams** → Click your stream
2. Click **"Enhanced measurement"**
3. Toggle ON:
   - ✅ Page views
   - ✅ Scrolls
   - ✅ Outbound clicks
   - ✅ Site search
   - ✅ Video engagement
   - ✅ File downloads

### **Set Up Conversions**

1. Go to **Admin** → **Events**
2. Click **"Mark as conversion"** for:
   - `generate_lead` (Contact forms)
   - `add_to_wishlist` (Favorites)
   - `save_search` (Saved searches)

### **Custom Dimensions** (Optional)

Go to **Admin** → **Custom Definitions** → **Create custom dimension**:
- Property Type (item_category)
- City (city)
- Price Range (price)

---

## 📊 Viewing Your Data

### **Realtime Reports**
- **Admin** → **Realtime** → See current visitors

### **Standard Reports**
- **Reports** → **Acquisition** → Traffic sources
- **Reports** → **Engagement** → Events
- **Reports** → **Monetization** → E-commerce (for property views)

### **Custom Reports**
- **Explore** → Create custom reports
- Filter by city, property type, price range
- See conversion funnels

---

## 🚀 What Changed from Plausible

**Removed:**
- ❌ `next-plausible` package
- ❌ `PlausibleProvider` from layout
- ❌ `src/lib/plausible-api.ts`
- ❌ `src/app/api/analytics/plausible/route.ts`
- ❌ `PLAUSIBLE_ANALYTICS_SETUP.md`

**Added:**
- ✅ `@next/third-parties/google` package
- ✅ `GoogleAnalytics` component in layout
- ✅ `src/lib/google-analytics.ts` - GA4 helper functions
- ✅ `src/types/gtag.d.ts` - TypeScript declarations
- ✅ Migrated all events to GA4 format

**Updated:**
- ✅ `src/lib/analytics-events.ts` - All events now use GA4
- ✅ `src/app/[lang]/layout.tsx` - Uses GoogleAnalytics instead of Plausible

---

## 💡 Pro Tips

1. **Testing in Development:**
   - Use Chrome extension: "Google Analytics Debugger"
   - See all events in browser console

2. **Production Deployment:**
   - Add your GA measurement ID to Vercel/production environment variables
   - Events will start tracking immediately

3. **Privacy:**
   - GA4 is GDPR compliant by default
   - Consider adding a cookie consent banner for EU visitors

4. **Multiple Environments:**
   - Use different GA4 properties for dev/staging/production
   - Track separately for cleaner data

---

## ✅ Next Steps

1. **Get your GA4 Measurement ID** from Google Analytics
2. **Add to `.env.local`:** `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. **Restart your dev server**
4. **Test in GA4 Realtime reports**
5. **Deploy to production** with the measurement ID in environment variables

---

**Your analytics are now fully migrated to Google Analytics 4!** 🎉

All existing tracking events will work seamlessly with GA4's enhanced reporting and conversion tracking capabilities.





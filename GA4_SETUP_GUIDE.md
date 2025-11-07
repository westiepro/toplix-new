# Google Analytics 4 (GA4) - Complete Setup Guide

## Step 1: Create Google Analytics Account & Property

1. **Go to Google Analytics**
   - Visit: https://analytics.google.com/
   - Sign in with your Google account

2. **Create an Account** (if you don't have one)
   - Click "Start measuring"
   - Enter Account name (e.g., "My Real Estate Portal")
   - Configure data sharing settings (optional)
   - Click "Next"

3. **Create a Property**
   - Property name: "Real Estate Portal" (or your site name)
   - Reporting time zone: Select your timezone
   - Currency: EUR (or your preferred currency)
   - Click "Next"

4. **Set up Business Information**
   - Industry category: "Real Estate"
   - Business size: Select appropriate size
   - How you intend to use Google Analytics: Select options
   - Click "Create"

5. **Accept Terms of Service**
   - Read and accept the Google Analytics Terms of Service
   - Click "I Accept"

## Step 2: Get Your Measurement ID

1. **After creating the property, you'll see the "Data Streams" setup**
   - Click "Web" to add a web stream

2. **Configure Web Stream**
   - Website URL: Enter your website URL (e.g., `https://yourdomain.com`)
   - Stream name: "Main Website" (or any name)
   - Click "Create stream"

3. **Copy Your Measurement ID**
   - You'll see a page with your Measurement ID
   - It looks like: `G-XXXXXXXXXX`
   - **Copy this ID** - you'll need it in the next step

## Step 3: Add Measurement ID to Your Project

1. **Create or edit `.env.local` file** in your project root:
   ```bash
   # If file doesn't exist, create it
   touch .env.local
   ```

2. **Add your Measurement ID** to `.env.local`:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID from Step 2.

3. **Verify the file is in `.gitignore`** (it should be by default)
   - This prevents committing your Measurement ID to version control

## Step 4: Verify Installation

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Check the browser console**:
   - Open your site in the browser
   - Open Developer Tools (F12)
   - Go to the "Network" tab
   - Filter by "gtag" or "analytics"
   - You should see requests to `google-analytics.com`

3. **Check Google Analytics Real-Time Reports**:
   - Go back to Google Analytics
   - Click "Reports" → "Realtime"
   - Visit your website
   - You should see yourself appear as an active user within 30 seconds

## Step 5: Test Event Tracking (Optional)

Your project already has event tracking set up! Test it:

1. **View a property** - Should track `view_item` event
2. **Add to favorites** - Should track `add_to_wishlist` event
3. **Search for properties** - Should track `search` event
4. **Interact with map** - Should track `map_interaction` event

Check events in Google Analytics:
- Go to "Reports" → "Engagement" → "Events"
- You should see your custom events appearing

## Step 6: Configure Enhanced Features (Optional)

### Enable Enhanced Measurement
1. Go to "Admin" → "Data Streams"
2. Click on your web stream
3. Toggle on "Enhanced measurement"
4. Enable:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Video engagement
   - File downloads

### Set up Goals/Conversions
1. Go to "Admin" → "Events"
2. Mark important events as conversions:
   - `generate_lead` (Contact Agent)
   - `add_to_wishlist` (Add to Favorites)
   - `property_inquiry` (Property Inquiries)

## Troubleshooting

### Issue: No data appearing in GA4
- **Solution**: 
  - Wait 24-48 hours for standard reports (Real-time should work immediately)
  - Check that `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
  - Verify the Measurement ID starts with `G-`
  - Check browser console for errors
  - Disable ad blockers temporarily to test

### Issue: Events not tracking
- **Solution**:
  - Check browser console for JavaScript errors
  - Verify `window.gtag` is defined
  - Use Google Analytics Debugger Chrome extension
  - Check that events are being called in your code

### Issue: Development vs Production
- **Solution**:
  - Use the same Measurement ID for both (recommended)
  - Or create separate properties for dev/staging/production
  - Use environment variables to switch between IDs

## What's Already Set Up in Your Project

✅ Google Analytics component in `src/app/[lang]/layout.tsx`
✅ Helper functions in `src/lib/google-analytics.ts`
✅ Event tracking functions in `src/lib/analytics-events.ts`
✅ TypeScript declarations in `src/types/gtag.d.ts`
✅ Next.js third-parties integration (`@next/third-parties`)

## Next Steps

1. **Set up custom dimensions** (if needed):
   - User type (buyer/seller/agent)
   - Property type
   - Language preference

2. **Create custom reports**:
   - Property views by city
   - Most popular properties
   - User journey analysis

3. **Set up audiences**:
   - Frequent visitors
   - Property searchers
   - Favorites users

4. **Link with Google Ads** (if using):
   - Go to "Admin" → "Google Ads Linking"
   - Connect your Google Ads account

## Support Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Next.js Third-Parties Documentation](https://nextjs.org/docs/app/api-reference/components/third-parties)

---

**Your Google Analytics 4 is now set up!** 🎉

Once you add your Measurement ID to `.env.local`, tracking will start automatically.


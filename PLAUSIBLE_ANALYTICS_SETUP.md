# Plausible Analytics - Complete Implementation Guide

## Overview

Your real estate portal now has a complete Plausible Analytics integration with comprehensive event tracking and a powerful admin analytics dashboard.

## What Was Installed

### 1. Core Package
- ✅ **next-plausible** - Next.js integration for Plausible Analytics

### 2. Files Created

#### Utility Libraries
- `src/lib/analytics-events.ts` - Custom event tracking functions
- `src/lib/plausible-api.ts` - Plausible API helper functions

#### API Endpoints
- `src/app/api/analytics/plausible/route.ts` - Fetch Plausible stats
- `src/app/api/analytics/properties/route.ts` - Property analytics from database
- `src/app/api/analytics/realtime/route.ts` - Real-time visitor data
- `src/app/api/analytics/events/route.ts` - Custom event analytics

#### Modified Files
- `src/app/[lang]/layout.tsx` - Added PlausibleProvider
- `src/app/[lang]/property/[id]/page.tsx` - Property view tracking
- `src/components/PropertyCard.tsx` - Card click & favorite tracking
- `src/components/SearchBar.tsx` - Search query tracking
- `src/components/MapView.tsx` - Map interaction tracking
- `src/app/[lang]/admin/analytics/page.tsx` - Complete analytics dashboard

---

## Required Configuration

### Step 1: Add Environment Variables

Create or update your `.env.local` file with these variables:

```bash
# Plausible Analytics Configuration
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
NEXT_PUBLIC_PLAUSIBLE_URL=https://analytics.yourdomain.com
PLAUSIBLE_API_KEY=your-api-key-here
```

**Where to get these values:**

1. **NEXT_PUBLIC_PLAUSIBLE_DOMAIN**: Your website domain (e.g., `myrealestate.com`)
2. **NEXT_PUBLIC_PLAUSIBLE_URL**: Your self-hosted Plausible URL (e.g., `https://plausible.yourdomain.com`) or leave as `https://plausible.io` for cloud
3. **PLAUSIBLE_API_KEY**: Get from your Plausible dashboard → Settings → API Keys

### Step 2: Set Up Plausible (Self-Hosted)

If you chose self-hosted Plausible, follow these steps:

#### Requirements:
- VPS/Server (DigitalOcean, AWS, Hetzner, etc.)
- Docker & Docker Compose installed
- Domain/subdomain for Plausible (e.g., `analytics.yourdomain.com`)

#### Quick Setup:
```bash
# 1. Clone Plausible hosting repo
git clone https://github.com/plausible/hosting
cd hosting

# 2. Configure
cp plausible-conf.env.example plausible-conf.env
# Edit plausible-conf.env with your domain

# 3. Start Plausible
docker-compose up -d

# 4. Configure reverse proxy (nginx/caddy) for SSL
```

### Step 3: Create Your Plausible Account

1. Navigate to your Plausible URL
2. Create admin account
3. Add your website domain
4. Generate API key (Settings → API Keys)
5. Copy API key to `.env.local`

---

## Analytics Features Implemented

### 🎯 Tracking Events

The following events are automatically tracked across your application:

#### 1. Property Tracking
- ✅ **Property View** - When users view a property detail page
  - Tracks: property_id, property_title, price, city
- ✅ **Property Card Click** - When users click on property cards
  - Tracks: property_id, position, source (search_results/map_popup/favorites/homepage)
- ✅ **Property Favorite** - When users add/remove favorites
  - Tracks: property_id, action (add/remove)
- ✅ **Property Share** - When users share properties
  - Tracks: property_id, share_method (link/social/email)

#### 2. Search & Navigation
- ✅ **Search** - When users search for locations
  - Tracks: location, price_min, price_max, beds, baths, property_type
- ✅ **Filter Change** - When users adjust filters
  - Tracks: filter_type, value

#### 3. Map Interactions
- ✅ **Map Interaction** - User interactions with the map
  - Tracks: action (zoom_in/zoom_out/pan/marker_click), property_id

#### 4. Additional Events (Available)
- Language switches
- Saved searches
- AI style views
- Contact inquiries

---

## Admin Analytics Dashboard

Your analytics dashboard is located at: `/[lang]/admin/analytics`

### Available Analytics Tabs

#### 1. **Traffic Tab** 📊
- Unique visitors over time (line chart)
- Page views trends
- Traffic sources breakdown (pie chart)
- Top performing pages (bar chart)
- Bounce rate metrics
- Average visit duration

#### 2. **Properties Tab** 🏠
- Total properties count
- New listings this period
- Average property price
- Median property price
- Price range (min/max)
- Properties by city (bar chart)
- Properties by country
- Price distribution (bar chart)
- Bedroom distribution
- Top properties by price

#### 3. **Behavior Tab** 🎯
- Top search queries
- Most viewed properties
- User engagement metrics:
  - Average session duration
  - Total favorites
  - Total inquiries
  - Map interactions count

#### 4. **Geography Tab** 🌍
- Traffic by country (bar chart)
- Top 5 countries with stats
- Property locations by country
- Visitor distribution worldwide

#### 5. **Technology Tab** 💻
- Device breakdown (desktop/mobile/tablet) - pie chart
- Browser statistics (bar chart)
- Operating system distribution (bar chart)
- Technology trends

### Real-Time Features
- ✅ Live visitor count (updates every 10 seconds)
- ✅ Active users indicator with animated pulse
- ✅ Current activity badge

### KPI Cards
1. **Unique Visitors** - Total unique visitors (from Plausible)
2. **Page Views** - Total page views (from Plausible)
3. **Total Properties** - Properties in database + new listings
4. **Bounce Rate** - Visitor engagement metric

### Date Range Filtering
- Last 7 days
- Last 30 days (default)
- Last 90 days

---

## Complete Analytics Options Available

### 📈 Traffic Analytics (from Plausible)
1. Unique Visitors
2. Page Views
3. Bounce Rate
4. Average Session Duration
5. Total Visits
6. Traffic Sources
7. Referrer URLs
8. UTM Campaign tracking
9. Entry Pages
10. Exit Pages

### 🏠 Property Analytics (from Database)
1. Total Properties
2. New Listings (by period)
3. Properties by City
4. Properties by Country
5. Properties by Type
6. Price Distribution
7. Bedroom Distribution
8. Average Property Price
9. Median Property Price
10. Price Range (Min/Max)
11. Top Properties by Price
12. Most Viewed Properties

### 🎯 User Behavior Analytics (Custom Events)
1. Property Views
2. Property Card Clicks
3. Property Favorites
4. Property Shares
5. Search Queries
6. Search Locations
7. Filter Usage
8. Map Interactions
9. Map Zoom Events
10. Marker Clicks
11. Language Switches
12. AI Style Views

### 🌍 Geographic Analytics
1. Visitors by Country
2. Visitors by City (if available)
3. Property Locations
4. Geographic Heat Maps (data available)

### 💻 Technology Analytics
1. Device Breakdown (Desktop/Mobile/Tablet)
2. Browser Statistics
3. Operating System Distribution
4. Screen Resolution (available in Plausible)
5. Browser Version Details

### ⏱️ Real-Time Analytics
1. Current Active Visitors
2. Live Page Views
3. Recent Events Stream (available)
4. Active Pages Right Now

### 📊 Conversion Analytics (Extensible)
1. Inquiry Conversion Rate (trackable)
2. Property-to-Inquiry Ratio (calculable)
3. Favorite-to-Inquiry Rate (calculable)
4. Search-to-View Conversion (calculable)
5. View-to-Inquiry Conversion (calculable)

---

## API Endpoints Documentation

### 1. GET `/api/analytics/plausible`

Fetch Plausible analytics data.

**Query Parameters:**
- `period`: `7d`, `30d`, `90d` (default: `30d`)
- `type`: `aggregate`, `timeseries`, `sources`, `pages`, `countries`, `devices`, `browsers`, `os`, or `all` (default)

**Response:**
```json
{
  "aggregate": {
    "visitors": 12500,
    "pageviews": 45000,
    "bounceRate": 42,
    "visitDuration": 125,
    "visits": 15000
  },
  "timeseries": [...],
  "sources": [...],
  "pages": [...],
  "countries": [...],
  "devices": [...],
  "browsers": [...],
  "os": [...]
}
```

### 2. GET `/api/analytics/properties`

Fetch property analytics from database.

**Query Parameters:**
- `period`: Number of days (default: `30`)

**Response:**
```json
{
  "summary": {
    "totalProperties": 150,
    "avgPrice": 550000,
    "minPrice": 195000,
    "maxPrice": 950000,
    "medianPrice": 485000,
    "newListings": 8
  },
  "propertiesByCity": [...],
  "propertiesByCountry": [...],
  "propertiesByType": [...],
  "priceDistribution": [...],
  "bedroomDistribution": [...],
  "topPropertiesByPrice": [...]
}
```

### 3. GET `/api/analytics/realtime`

Fetch real-time visitor count.

**Response:**
```json
{
  "activeVisitors": 23,
  "timestamp": "2025-11-02T19:45:00.000Z"
}
```

### 4. GET `/api/analytics/events`

Fetch custom event analytics.

**Query Parameters:**
- `period`: `7d`, `30d`, `90d` (default: `30d`)
- `event`: `property_views`, `searches`, `inquiries`, `favorites`, `map_interactions`, `filter_changes`, or `all` (default)

**Response:**
```json
{
  "propertyViews": [...],
  "searches": [...],
  "inquiries": [...],
  "favorites": [...],
  "mapInteractions": [...],
  "filterChanges": [...]
}
```

---

## Usage Examples

### Tracking Custom Events in Your Code

```typescript
import { 
  trackPropertyView, 
  trackPropertyInquiry,
  trackSearch 
} from '@/lib/analytics-events';

// Track property view
trackPropertyView('property-123', 'Beautiful Villa in Lagos', 450000, 'Lagos');

// Track inquiry
trackPropertyInquiry('property-123', 'email');

// Track search with filters
trackSearch('Lagos', {
  priceMin: 300000,
  priceMax: 500000,
  beds: 3,
  baths: 2
});
```

### Fetching Analytics Data in Your Components

```typescript
// Fetch Plausible data
const response = await fetch('/api/analytics/plausible?period=30d&type=aggregate');
const data = await response.json();

// Fetch property analytics
const propResponse = await fetch('/api/analytics/properties?period=30');
const propData = await propResponse.json();

// Fetch realtime data
const realtimeResponse = await fetch('/api/analytics/realtime');
const realtimeData = await realtimeResponse.json();
```

---

## Testing Instructions

### 1. Test Event Tracking

1. Navigate through your site:
   - View property pages
   - Click property cards
   - Search for locations
   - Add favorites
   - Interact with the map

2. Check Plausible dashboard:
   - Go to your Plausible URL
   - Select your domain
   - Check "Events" tab
   - Verify custom events are appearing

### 2. Test Analytics Dashboard

1. Navigate to `/admin/analytics`
2. Verify all tabs load properly:
   - Traffic
   - Properties
   - Behavior
   - Geography
   - Technology
3. Check date range filtering works
4. Verify real-time visitor count updates

### 3. Test API Endpoints

```bash
# Test Plausible endpoint
curl http://localhost:3000/api/analytics/plausible?period=30d

# Test Properties endpoint
curl http://localhost:3000/api/analytics/properties?period=30

# Test Realtime endpoint
curl http://localhost:3000/api/analytics/realtime

# Test Events endpoint
curl http://localhost:3000/api/analytics/events?period=30d
```

---

## Troubleshooting

### Events Not Showing in Plausible

1. **Check environment variables** - Ensure `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set
2. **Check browser console** - Look for any errors
3. **Verify script loading** - Check Network tab for Plausible script
4. **Check ad blockers** - Some ad blockers block analytics

### API Errors

1. **403 Forbidden** - Check `PLAUSIBLE_API_KEY` is correct
2. **500 Error** - Check Plausible URL is accessible
3. **Empty Data** - Ensure events have been tracked first

### Dashboard Not Loading

1. **Check API routes** - Verify all API endpoints respond
2. **Check browser console** - Look for fetch errors
3. **Verify Supabase connection** - Property data requires database access

---

## Next Steps & Enhancements

### Recommended Additions

1. **Goals & Conversions**
   - Set up goals in Plausible for key actions
   - Track conversion funnels
   - Monitor form submissions

2. **Custom Dashboard Widgets**
   - Add agent performance widgets
   - Create property comparison charts
   - Build lead quality scorecards

3. **Automated Reports**
   - Weekly email summaries
   - Monthly analytics reports
   - Custom alert thresholds

4. **Advanced Tracking**
   - Virtual page views for SPA navigation
   - E-commerce tracking for premium listings
   - Custom dimensions for user segments

5. **Database Tables (Optional)**
   - Create `property_views` table for detailed view tracking
   - Create `property_inquiries` table for inquiry tracking
   - Create `search_queries` table for search analytics

---

## Support & Resources

### Plausible Documentation
- [Official Docs](https://plausible.io/docs)
- [Self-Hosting Guide](https://plausible.io/docs/self-hosting)
- [Events API](https://plausible.io/docs/events-api)
- [Stats API](https://plausible.io/docs/stats-api)

### Your Implementation
- All tracking functions: `src/lib/analytics-events.ts`
- API helpers: `src/lib/plausible-api.ts`
- Dashboard: `src/app/[lang]/admin/analytics/page.tsx`

---

## Summary

✅ **Package Installed**: next-plausible
✅ **Tracking Implemented**: 10+ custom events
✅ **API Endpoints Created**: 4 analytics endpoints
✅ **Dashboard Built**: 5 comprehensive tabs
✅ **Real-Time Analytics**: Live visitor tracking
✅ **Database Analytics**: Property metrics
✅ **Geography Tracking**: Country/city analytics
✅ **Technology Tracking**: Device/browser/OS stats

**Total Analytics Options**: 50+ metrics and visualizations available!

Your real estate portal now has enterprise-grade analytics that rival platforms like Zillow and Realtor.com! 🎉


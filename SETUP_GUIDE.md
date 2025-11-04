# Advanced Map Search Setup Guide

This guide will help you set up and run the advanced map-based property search feature.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **Supabase Account** (free tier works)
3. **Cloudinary Account** (free tier works)
4. **Unsplash API Key** (free tier works)

## Step 1: Install Dependencies

```bash
npm install @maplibre/maplibre-gl-draw point-in-polygon
```

## Step 2: Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary (for image optimization)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Unsplash (for fetching property images)
UNSPLASH_ACCESS_KEY=your_unsplash_access_key

# Mapbox (optional - falls back to MapLibre if not provided)
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### Getting Your API Keys:

#### Supabase
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings > API
4. Copy the `URL` and `anon/public` key

#### Cloudinary
1. Go to https://cloudinary.com
2. Sign up for free account
3. Go to Dashboard
4. Copy `Cloud Name`, `API Key`, and `API Secret`

#### Unsplash
1. Go to https://unsplash.com/developers
2. Create a new application
3. Copy the `Access Key`

#### Mapbox (Optional)
1. Go to https://mapbox.com
2. Sign up and go to Access Tokens
3. Copy your default public token

## Step 3: Set Up Database

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Run the schema file:

```bash
# Copy and paste the contents of supabase-properties-schema.sql
```

Or directly from the Supabase SQL Editor, paste the contents of:
- `supabase-properties-schema.sql`

## Step 4: Populate Database with Properties

Run the population script to fetch images and create sample properties:

```bash
npm run tsx scripts/populate-properties.ts
```

This will:
- Fetch 100+ property images from Unsplash
- Upload them to Cloudinary for optimization
- Generate 60 realistic properties across Portugal and Spain
- Insert properties and images into your Supabase database

**Note:** This may take 5-10 minutes depending on API rate limits.

## Step 5: Start Development Server

```bash
npm run dev
```

## Step 6: Test the Application

Navigate to:
- **Enhanced Version:** http://localhost:3000/homes-enhanced
- **Original Version:** http://localhost:3000/homes

## Features Overview

### Map Features
- ✅ Dynamic property markers with price display
- ✅ Marker clustering when zoomed out
- ✅ Hover effects on markers
- ✅ Enhanced popups with image sliders
- ✅ Favorite and share buttons
- ✅ Map/Satellite toggle
- ✅ Dark mode support
- ✅ Fullscreen mode
- ✅ Zoom controls

### Search Features
- ✅ City/region autocomplete
- ✅ Instant search with caching
- ✅ Smooth flyTo animations
- ✅ Bidirectional map-search sync
- ✅ URL parameter sync

### Filter Features
- ✅ Price range
- ✅ Bedrooms & bathrooms
- ✅ Property type
- ✅ Minimum area
- ✅ Viewport-based filtering

### Performance
- ✅ SWR caching
- ✅ Debounced map movements (500ms)
- ✅ Lazy image loading
- ✅ Cloudinary image optimization
- ✅ Request deduplication

### Mobile
- ✅ Responsive design
- ✅ Draggable bottom sheet
- ✅ Touch-friendly controls
- ✅ Swipeable image sliders

## Troubleshooting

### Images not loading
- Check Cloudinary credentials
- Verify Unsplash API key
- Check browser console for errors

### Properties not appearing
- Verify Supabase connection
- Check that database is populated
- Look for API errors in Network tab

### Map not displaying
- Check MapLibre/Mapbox token
- Verify no console errors
- Try different browser

### Slow performance
- Reduce number of properties
- Check network speed
- Enable SWR caching

## File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── properties/
│   │   │   ├── route.ts              # Main properties API
│   │   │   └── [id]/images/route.ts  # Property images API
│   │   └── saved-searches/route.ts   # Saved searches API
│   ├── homes/page.tsx                 # Original homes page
│   └── homes-enhanced/page.tsx        # Enhanced version with all features
├── components/
│   ├── MapView.tsx                    # Original map component
│   ├── MapViewEnhanced.tsx            # Enhanced map with clustering
│   ├── MapControls.tsx                # Map control buttons
│   ├── PropertyImageSlider.tsx        # Image carousel
│   ├── SearchBarEnhanced.tsx          # Enhanced search
│   ├── PropertyBottomSheet.tsx        # Mobile bottom sheet
│   ├── PropertyCard.tsx               # Property card
│   └── Filters.tsx                    # Filter controls
├── stores/
│   └── mapStore.ts                    # Zustand state management
├── lib/
│   ├── api.ts                         # SWR hooks & API functions
│   ├── cloudinary.ts                  # Image optimization helpers
│   ├── geocoding.ts                   # Location search
│   └── supabaseClient.ts              # Supabase client
└── scripts/
    └── populate-properties.ts         # Database population script

supabase-properties-schema.sql         # Database schema
```

## Next Steps

1. **Customize Properties:** Modify the `populate-properties.ts` script to add more realistic data
2. **Add More Cities:** Extend the cities list in the geocoding library
3. **Style Customization:** Update map styles in `MapViewEnhanced.tsx`
4. **Add Draw Tool:** Implement polygon search (see plan for details)
5. **Saved Searches:** Add UI for saving and loading searches

## Support

For issues or questions:
1. Check the console for errors
2. Verify all environment variables are set
3. Ensure database schema is applied
4. Check that dependencies are installed

## Performance Tips

1. Use Cloudinary transformations for optimal image sizes
2. Enable SWR caching for faster repeated queries
3. Debounce map movements to reduce API calls
4. Use clustering for large datasets
5. Lazy load images outside viewport

Enjoy your advanced property search map! 🗺️🏠





# Property Images Setup Guide

This guide explains how to add 5 Unsplash real estate images to every property on your site.

## Prerequisites

Make sure you have the following in your `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 1: Create Database Schema

First, you need to create the database tables in Supabase:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-properties-schema.sql`
4. Run the SQL script

This will create the following tables:
- `properties` - Stores property data
- `property_images` - Stores multiple images per property (with support for 5 images each)
- `saved_searches` - For user saved searches

## Step 2: Populate Properties (Optional)

If you don't have properties in your database yet, you can populate it with sample data:

```bash
npm run populate-properties
```

This script will:
- Generate 60 sample properties across Portugal and Spain
- Automatically add 5 images to each property
- Use diverse real estate images from Unsplash

**Note:** This script requires an Unsplash API key if you want to use the API. Add to `.env.local`:
```env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Get a free Unsplash API key at: https://unsplash.com/developers

## Step 3: Add Images to Existing Properties

If you already have properties and just want to add images to them:

```bash
npm run add-images
```

This script will:
- Fetch all existing properties from your database
- Add exactly 5 curated real estate images to each property
- Use high-quality Unsplash images (no API key required)
- Delete any existing images first to ensure clean data

## How It Works

### Image Storage

Each property can have multiple images stored in the `property_images` table with the following structure:

- `image_url` - The URL to the Unsplash image
- `display_order` - Order of the image (0-4)
- `is_featured` - Whether this is the main/featured image (first image is always featured)

### Image Assignment

The script ensures each property gets 5 unique images by:
1. Using a pool of 60+ curated real estate images from Unsplash
2. Cycling through the pool to assign different images to each property
3. Using modulo arithmetic to prevent running out of images

### Available Scripts

- `npm run add-images` - Add 5 images to all existing properties
- `npm run populate-properties` - Create sample properties with images (requires Unsplash API key)

## Frontend Integration

The site components automatically display property images:

### PropertyCard Component
Shows the featured image (first image) on property cards in search results.

### Property Detail Page
The `PropertyImageSlider` component can display all 5 images with:
- Swipe gestures on mobile
- Navigation arrows on desktop
- Dot indicators
- Image counter

### Map Popup
Shows the featured image when clicking on a property marker.

## Troubleshooting

### "Could not find the table 'public.properties'"
**Solution:** Run the SQL schema from `supabase-properties-schema.sql` in your Supabase SQL Editor.

### "No properties found"
**Solution:** Run `npm run populate-properties` to create sample properties.

### Script fails with environment variable errors
**Solution:** Make sure your `.env.local` file contains the required Supabase credentials.

## Image Sources

All images are sourced from Unsplash with proper attribution:
- High-quality professional photography
- Diverse range of property types (modern homes, villas, apartments)
- Various rooms (living rooms, kitchens, bedrooms, bathrooms)
- Outdoor spaces (gardens, pools, patios)

The images are hosted on Unsplash's CDN for fast loading and reliability.

## Next Steps

After running the scripts:

1. Verify images in Supabase dashboard
   - Go to Table Editor → `property_images`
   - You should see 5 images per property

2. Test the site
   - Run `npm run dev`
   - Browse properties to see images
   - Check that the PropertyImageSlider works on detail pages

3. Customize (optional)
   - Edit `scripts/add-property-images-simple.ts` to use different images
   - Add more images to the pool for greater variety
   - Modify image URLs to use your own CDN


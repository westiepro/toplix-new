# Quick Start: Adding 5 Unsplash Images to Every Property

This guide will get you up and running with 5 real estate images per property in just a few minutes.

## ⚡ Quick Setup (3 Steps)

### Step 1: Verify Your Setup
```bash
npm run check-setup
```

This will check if your database is ready. If not, continue to Step 2.

### Step 2: Create Database Tables

Go to your [Supabase Dashboard](https://app.supabase.com) and:

1. Click on your project
2. Go to **SQL Editor** (in left sidebar)
3. Click **New Query**
4. Copy and paste this SQL:

```sql
-- Properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    price INTEGER NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Portugal',
    beds INTEGER NOT NULL,
    baths INTEGER NOT NULL,
    area INTEGER NOT NULL,
    property_type TEXT NOT NULL DEFAULT 'Apartment',
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property images table (supports 5+ images per property)
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_lat_lng ON properties(lat, lng);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_property_images_property_id ON property_images(property_id);
CREATE INDEX IF NOT EXISTS idx_property_images_featured ON property_images(is_featured);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to properties"
    ON properties FOR SELECT USING (true);

CREATE POLICY "Allow public read access to property_images"
    ON property_images FOR SELECT USING (true);

-- Allow authenticated users to modify (for admin)
CREATE POLICY "Allow authenticated users to insert properties"
    ON properties FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update properties"
    ON properties FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to delete properties"
    ON properties FOR DELETE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert property_images"
    ON property_images FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update property_images"
    ON property_images FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to delete property_images"
    ON property_images FOR DELETE TO authenticated USING (true);
```

5. Click **Run** (or press Cmd/Ctrl + Enter)

### Step 3: Add Properties and Images

Choose one option:

**Option A: Create Sample Properties with Images** (Recommended for testing)
```bash
npm run populate-properties
```
This creates 60 properties across Portugal and Spain, each with 5 real estate images.

**Option B: Add Images to Existing Properties**
```bash
npm run add-images
```
This adds 5 images to each property already in your database.

## ✅ Verify It Worked

```bash
npm run check-setup
```

You should see:
```
✨ Setup check complete!

📊 Summary:
   Properties: 60
   Images: 300
   Average images per property: 5.0

🎉 Your database is fully set up with images!
```

## 🎨 What You Get

Each property now has **5 curated real estate images** from Unsplash:
- 🏠 Modern house exteriors
- 🛋️ Luxury living spaces
- 🍳 Contemporary kitchens
- 🛏️ Beautiful bedrooms
- 🚿 Spa-like bathrooms
- 🌳 Outdoor spaces (pools, gardens, patios)

## 🚀 Start Your App

```bash
npm run dev
```

Visit http://localhost:3000 to see your properties with images!

## 📸 Image Features

- **High Quality**: 1200px professional photography
- **Fast Loading**: Optimized for web (quality=80)
- **No API Key Needed**: Uses direct Unsplash CDN URLs
- **Variety**: 60+ unique images ensuring no duplicates

## 🎯 Using Images in Your App

The images are already being used in:

### 1. Property Cards (Search Results)
Shows the **featured image** (first image) automatically via the existing API.

### 2. Property Detail Pages
Can display all 5 images using `PropertyImageSlider`:

```tsx
import { PropertyImageSlider } from "@/components/PropertyImageSlider";
import { usePropertyImages } from "@/lib/api";

function PropertyDetail({ propertyId }) {
  const { images } = usePropertyImages(propertyId);
  
  return (
    <PropertyImageSlider 
      images={images.map(img => img.image_url)}
      className="h-96 w-full"
      showControls={true}
    />
  );
}
```

### 3. Map Popups
Shows the featured image when clicking property markers.

## 🔧 Customize Images

Want different images? Edit `scripts/add-property-images-simple.ts`:

```typescript
const unsplashRealEstatePhotos = [
  'https://images.unsplash.com/photo-YOUR-PHOTO-ID?w=1200&q=80',
  // Add more URLs here
];
```

Then re-run:
```bash
npm run add-images
```

## 📚 Available Commands

```bash
npm run check-setup        # Verify database setup
npm run populate-properties # Create sample properties + images
npm run add-images         # Add images to existing properties
npm run dev               # Start development server
```

## 🆘 Troubleshooting

### "Could not find the table 'public.properties'"
→ Run the SQL from Step 2 in your Supabase dashboard

### "No properties found"
→ Run `npm run populate-properties` to create sample data

### "Missing Supabase credentials"
→ Check your `.env.local` file has:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Images not showing on site
→ Check browser console for errors
→ Verify images exist: `npm run check-setup`
→ Check API is returning images: Visit `/api/properties/[id]/images`

## 📖 More Information

- `IMAGES_SETUP_GUIDE.md` - Detailed setup guide
- `IMPLEMENTATION_SUMMARY_IMAGES.md` - Technical details
- `supabase-properties-schema.sql` - Full database schema

## 🎉 You're Done!

Your site now has 5 beautiful real estate images for every property. Enjoy! 🏡✨



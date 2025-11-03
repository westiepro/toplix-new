# Environment Variables Setup Guide

## Required Variables

### 1. Supabase Configuration ✅ (Required)

Get these from your [Supabase Dashboard](https://app.supabase.com):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Where to find:**
1. Go to your Supabase project
2. Click **Settings** → **API**
3. Copy **Project URL** and **anon/public key**

---

## Optional Variables

### 2. Cloudinary (Optional - for file uploads)

**Without Cloudinary:** You can still add images by URL (Unsplash, etc.)  
**With Cloudinary:** You can upload files directly from your computer with automatic optimization

Get these from [Cloudinary Console](https://cloudinary.com/console):

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=property_images
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Setup Steps:**
1. Create free account at [cloudinary.com](https://cloudinary.com/users/register/free)
2. Get **Cloud Name** from dashboard
3. Get **API Key** and **API Secret** from dashboard
4. Create upload preset:
   - Go to Settings → Upload
   - Add upload preset
   - Name: `property_images`
   - Signing Mode: **Unsigned**
   - Click Save

### 3. Unsplash (Optional - for sample images script)

Only needed if you want to run `npm run populate-properties`

```bash
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

Get from: [Unsplash Developers](https://unsplash.com/developers)

---

## How to Set Up

1. **Create `.env.local` file** in your project root (if it doesn't exist)

2. **Copy the required variables** and add your actual values:

```bash
# .env.local

# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional (add when ready)
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
# NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
```

3. **Restart your development server:**

```bash
npm run dev
```

---

## Testing Your Setup

### Test Supabase Connection
```bash
npm run check-setup
```

### Test Image Upload (requires Cloudinary)
1. Go to http://localhost:3000/en/admin/properties
2. Click "Add Property"
3. Try uploading an image file
4. If Cloudinary is configured, it will upload
5. If not, you'll see "File Upload Disabled" - use URL instead

---

## Current Status

✅ **Working without Cloudinary:**
- Add images by URL
- All images from Unsplash, external CDNs work fine
- Image optimization still works for Cloudinary URLs

⚠️ **Requires Cloudinary:**
- File upload from computer
- Direct image upload in admin panel

---

## Quick Start (No Cloudinary)

You can start using the app right now without Cloudinary:

1. ✅ Make sure Supabase variables are set
2. ✅ Restart dev server: `npm run dev`
3. ✅ Go to Admin → Properties → Add Property
4. ✅ Add images by pasting Unsplash URLs like:
   - `https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80`
   - `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80`

---

## Sample Unsplash URLs for Testing

Here are some real estate image URLs you can use:

```
https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80
https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80
https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80
https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80
https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80
```

Just paste these into the "Image URL" field and click "Add URL"!


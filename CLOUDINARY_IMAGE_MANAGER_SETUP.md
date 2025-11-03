# Cloudinary Image Manager Setup Guide

## ✅ What Was Installed

Your admin panel now has a complete image management system with Cloudinary integration!

### 📦 Packages Installed
- ✅ `@dnd-kit/core` - Core drag-and-drop functionality
- ✅ `@dnd-kit/sortable` - Sortable lists
- ✅ `@dnd-kit/utilities` - Utility functions

### 🎨 Components Created
1. **PropertyImageManager** (`src/components/admin/PropertyImageManager.tsx`)
   - Drag-and-drop image reordering
   - Upload to Cloudinary
   - Add images by URL
   - Delete images
   - Featured image (first image)
   - Visual thumbnails

2. **Cloudinary Upload Functions** (`src/lib/cloudinary.ts`)
   - `uploadToCloudinary()` - Upload files
   - `deleteFromCloudinary()` - Delete files
   - Image optimization helpers

3. **Cloudinary Delete API** (`src/app/api/cloudinary/delete/route.ts`)
   - Server-side deletion endpoint
   - Secure API key handling

### 📝 Files Updated
- ✅ `src/app/[lang]/admin/properties/page.tsx` - Admin properties page with image manager
- ✅ `next.config.ts` - Added Cloudinary domains for Next.js Image

## 🔧 Configuration Required

### Step 1: Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. Go to your Dashboard

### Step 2: Get Your Credentials

From your Cloudinary Dashboard, copy:
- **Cloud Name** (e.g., `dxyz123abc`)
- **API Key** (e.g., `123456789012345`)
- **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123`)

### Step 3: Create Upload Preset

1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Click **Add upload preset**
4. Settings:
   - **Preset name**: `property_images` (or your choice)
   - **Signing Mode**: **Unsigned** (for client-side uploads)
   - **Folder**: `properties` (optional)
   - **Transformations**: None needed (handled by code)
5. Click **Save**

### Step 4: Add to Environment Variables

Add these to your `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=property_images
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important:** Replace the placeholder values with your actual Cloudinary credentials!

### Step 5: Restart Development Server

```bash
npm run dev
```

## 🎯 How to Use

### Adding Images to a Property

1. Go to **Admin Panel** → **Properties**
2. Click **Add Property** or **Edit** an existing property
3. Scroll to the **Property Images** section
4. Upload images:
   - **Option 1:** Click **Choose File** and select an image
   - **Option 2:** Paste an image URL and click **Add URL**

### Reordering Images

- **Drag and drop** images using the grip icon (⋮⋮)
- The **first image** automatically becomes the featured image (shown with ★)

### Deleting Images

- Click the **X** button on any image to remove it

### Features

✅ **Up to 8 images** per property  
✅ **Automatic Cloudinary optimization**  
✅ **Featured image** (first position)  
✅ **Drag-to-reorder**  
✅ **Live previews**  
✅ **File upload** (max 10MB)  
✅ **URL support**  

## 🎨 Image Optimization

Images uploaded to Cloudinary are automatically:
- ✅ **Compressed** for faster loading
- ✅ **Resized** to multiple sizes (thumbnails, sliders, full-size)
- ✅ **Converted** to modern formats (WebP)
- ✅ **Delivered** via global CDN
- ✅ **Lazy loaded** with Next.js Image

### Available Transformations

```typescript
getThumbnail(url)   // 400x300 for cards
getSliderImage(url) // 800x600 for galleries
getFullImage(url)   // 1200x900 for detail pages
getPlaceholder(url) // 40x30 blurred placeholder
```

## 📊 Database Integration

To save images to your database, update the `onSubmit` function in `page.tsx`:

```typescript
const onSubmit = async (data: PropertyForm) => {
  // Save property
  const property = await saveProperty(data);
  
  // Save images to property_images table
  for (const image of propertyImages) {
    await supabase
      .from('property_images')
      .insert({
        property_id: property.id,
        image_url: image.url,
        display_order: image.display_order,
        is_featured: image.is_featured,
      });
  }
};
```

## 🚀 Testing

1. **Upload Test**
   - Go to Admin → Properties → Add Property
   - Upload a test image
   - Check Cloudinary Media Library for the upload

2. **Reorder Test**
   - Add 3-5 images
   - Drag them to different positions
   - Verify first image shows "Featured"

3. **Delete Test**
   - Remove an image
   - Verify remaining images reorder correctly

## 🔒 Security Notes

- ✅ **Unsigned uploads** are safe for client-side
- ✅ **API Secret** never exposed to client
- ✅ **Delete endpoint** secured on server-side
- ✅ **File size limits** enforced (10MB max)
- ✅ **File type validation** (images only)

## 📝 Next Steps

1. ✅ **Configure Cloudinary** (add credentials to `.env.local`)
2. ✅ **Test image upload** in admin panel
3. ✅ **Connect to database** (save images to `property_images` table)
4. ✅ **Display on frontend** (use in PropertyImageGallery)

## 🎯 Frontend Integration

To display uploaded images on property detail pages, update the page to fetch from database:

```typescript
const { images } = usePropertyImages(propertyId);
const propertyImages = images.map(img => img.image_url);

<PropertyImageGallery images={propertyImages} />
```

## ⚡ Benefits

- **Faster uploads** - Direct to Cloudinary CDN
- **Auto optimization** - No manual image processing
- **Global delivery** - Fast loading worldwide
- **Responsive images** - Different sizes for different devices
- **Easy management** - Drag-and-drop interface
- **Professional UX** - Clean, modern design

## 🆘 Troubleshooting

### "Cloudinary configuration missing"
**Fix:** Add environment variables to `.env.local` and restart dev server

### Images not uploading
**Fix:** 
1. Check upload preset is "unsigned"
2. Verify cloud name is correct
3. Check browser console for errors

### Images not displaying
**Fix:**
1. Verify Cloudinary domains in `next.config.ts`
2. Restart dev server after config changes

### Delete not working
**Fix:** Ensure CLOUDINARY_API_SECRET is set for server-side deletion

---

**Implementation Complete!** 🎉

Your admin panel now has a professional image management system with Cloudinary integration.


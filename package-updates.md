# Package Updates Required

To complete the implementation, please install the following npm packages:

```bash
npm install @maplibre/maplibre-gl-draw point-in-polygon
```

## Package Details

### @maplibre/maplibre-gl-draw
- **Purpose:** Add drawing tools to the map for polygon search areas
- **Usage:** Allows users to draw custom search areas on the map
- **Size:** ~50KB gzipped

### point-in-polygon
- **Purpose:** Determine if a property is inside a drawn polygon
- **Usage:** Filter properties based on custom drawn shapes
- **Size:** ~2KB gzipped

## Already Installed Packages

The following packages are already in your package.json and support the new features:

- ✅ `zustand` - State management
- ✅ `swr` - Data fetching and caching
- ✅ `framer-motion` - Animations (image slider, bottom sheet)
- ✅ `mapbox-gl` / `maplibre-gl` - Map rendering
- ✅ `@supabase/supabase-js` - Database access
- ✅ `next` - Framework
- ✅ `react` / `react-dom` - UI library

## Optional Packages

If you want to add Cloudinary URL transformations library:

```bash
npm install @cloudinary/url-gen
```

Note: Currently using manual URL building which works fine. This library provides a more robust API but isn't strictly necessary.

## Development Tools

No additional dev dependencies are needed. All TypeScript types are included with the packages.

## Verification

After installing, verify the packages:

```bash
npm list @maplibre/maplibre-gl-draw point-in-polygon
```

You should see both packages listed with their versions.


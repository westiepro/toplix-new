/**
 * Cloudinary URL transformation helpers
 * Optimizes images for different use cases
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'crop';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  gravity?: 'auto' | 'center' | 'face' | 'faces';
}

/**
 * Build Cloudinary transformation URL
 */
export function buildCloudinaryUrl(
  imageUrl: string,
  options: CloudinaryTransformOptions = {}
): string {
  // If not a Cloudinary URL, return as-is
  if (!imageUrl.includes('cloudinary.com') && !imageUrl.includes('res.cloudinary.com')) {
    return imageUrl;
  }

  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto',
  } = options;

  // Build transformation string
  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (gravity) transformations.push(`g_${gravity}`);

  const transformString = transformations.join(',');

  // Insert transformation into URL
  // Cloudinary URLs look like: https://res.cloudinary.com/{cloud}/image/upload/{transformations}/{public_id}
  const uploadIndex = imageUrl.indexOf('/upload/');
  if (uploadIndex === -1) return imageUrl;

  const beforeUpload = imageUrl.slice(0, uploadIndex + 8); // Include '/upload/'
  const afterUpload = imageUrl.slice(uploadIndex + 8);

  return `${beforeUpload}${transformString}/${afterUpload}`;
}

/**
 * Get thumbnail version of image (for cards, list views)
 */
export function getThumbnail(imageUrl: string): string {
  return buildCloudinaryUrl(imageUrl, {
    width: 400,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
    gravity: 'auto',
  });
}

/**
 * Get slider image (for popups, sliders)
 */
export function getSliderImage(imageUrl: string): string {
  return buildCloudinaryUrl(imageUrl, {
    width: 800,
    height: 600,
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Get full-size image (for detail pages)
 */
export function getFullImage(imageUrl: string): string {
  return buildCloudinaryUrl(imageUrl, {
    width: 1200,
    height: 900,
    crop: 'fit',
    quality: 'auto',
    format: 'auto',
  });
}

/**
 * Get placeholder (blurred, low quality)
 */
export function getPlaceholder(imageUrl: string): string {
  return buildCloudinaryUrl(imageUrl, {
    width: 40,
    height: 30,
    crop: 'fill',
    quality: 30,
    format: 'auto',
  });
}

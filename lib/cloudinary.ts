// Cloudinary URL transformation utilities.
// Used by both server components (MenuList SSR) and client components
// (MenuItemCard, ItemModal, etc).

/**
 * Transform a Cloudinary URL to serve a smaller, format-optimized variant.
 * Cloudinary URLs have a /upload/ segment we inject transformations into.
 * Idempotent — safe to call on already-transformed URLs.
 */
export function cloudinaryThumb(
  url: string | null | undefined,
  w: number,
  h: number
): string {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  if (url.includes('/upload/w_') || url.includes('/upload/c_')) return url; // already transformed
  return url.replace('/upload/', `/upload/w_${w},h_${h},c_fill,q_auto,f_auto/`);
}

/**
 * Format a number as Vietnamese currency (e.g. 100000 → "100.000 ₫").
 */
export function fmt(v: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(v);
}

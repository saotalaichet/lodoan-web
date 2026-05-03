import { cache } from 'react';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export const getRestaurant = cache(async (slug: string) => {
  try {
    const res = await fetch(`${RAILWAY}/api/restaurants/slug/${slug}`, {
      next: { revalidate: 60, tags: [`restaurant:${slug}`] },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
});

export const getMenu = cache(async (restaurantId: string, slug?: string) => {
  try {
    const tags = [`menu:${restaurantId}`];
    if (slug) tags.push(`restaurant:${slug}`);
    const res = await fetch(`${RAILWAY}/api/menu/${restaurantId}`, {
      next: { revalidate: 60, tags },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
});

export const getMarketplaceRestaurants = cache(async () => {
  try {
    const res = await fetch(`${RAILWAY}/api/marketplace/restaurants`, {
      next: { revalidate: 60, tags: ['marketplace:restaurants'] },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
});

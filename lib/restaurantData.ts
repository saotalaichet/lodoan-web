import { cache } from 'react';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export const getRestaurant = cache(async (slug: string) => {
  try {
    const res = await fetch(`${RAILWAY}/api/restaurants/slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
});

export const getMenu = cache(async (restaurantId: string) => {
  try {
    const res = await fetch(`${RAILWAY}/api/admin/menu/${restaurantId}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
});

const BASE44_APP_ID = process.env.NEXT_PUBLIC_BASE44_APP_ID || process.env.BASE44_APP_ID;
const BASE44_API_KEY = process.env.NEXT_PUBLIC_BASE44_API_KEY || process.env.BASE44_API_KEY;

const BASE44_URL = `https://api.base44.app/api/apps/${BASE44_APP_ID}`;
const BASE44_HEADERS = {
  'api-key': BASE44_API_KEY!,
  'Content-Type': 'application/json',
};

// ── Types ────────────────────────────────────────────────────────────────────

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address?: string;
  phone?: string;
  logo?: string;
  banner?: string;
  cuisine_type?: string;
  is_open?: boolean;
  is_accepting_orders?: boolean;
  delivery_fee?: number;
  min_order_amount?: number;
  latitude?: number;
  longitude?: number;
  rating?: number;
  total_reviews?: number;
  hours?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  restaurant_id: string;
  sort_order?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category_id?: string;
  restaurant_id: string;
  is_available?: boolean;
  sort_order?: number;
}

export interface Promo {
  id: string;
  restaurant_id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_order_amount?: number;
  is_active?: boolean;
  expires_at?: string;
}

// ── Restaurant API ────────────────────────────────────────────────────────────

export async function getRestaurants(): Promise<Restaurant[]> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/Restaurant?is_active=true&show_on_marketplace=true`,
      {
        headers: BASE44_HEADERS,
        next: { revalidate: 60 }, // cache for 60 seconds
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/Restaurant?slug=${slug}`,
      {
        headers: BASE44_HEADERS,
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const restaurants = Array.isArray(data) ? data : [];
    return restaurants[0] || null;
  } catch {
    return null;
  }
}

// ── Menu API ──────────────────────────────────────────────────────────────────

export async function getMenuCategories(restaurantId: string): Promise<MenuCategory[]> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/MenuCategory?restaurant_id=${restaurantId}`,
      {
        headers: BASE44_HEADERS,
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.sort((a: MenuCategory, b: MenuCategory) =>
      (a.sort_order || 0) - (b.sort_order || 0)
    ) : [];
  } catch {
    return [];
  }
}

export async function getMenuItems(restaurantId: string): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/MenuItem?restaurant_id=${restaurantId}`,
      {
        headers: BASE44_HEADERS,
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data.filter((i: MenuItem) => i.is_available !== false) : [];
  } catch {
    return [];
  }
}

// ── Orders API ────────────────────────────────────────────────────────────────

export async function createOrder(orderData: Record<string, unknown>): Promise<{ id: string } | null> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/Order`,
      {
        method: 'POST',
        headers: BASE44_HEADERS,
        body: JSON.stringify(orderData),
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// ── Promo API ─────────────────────────────────────────────────────────────────

export async function getPromo(restaurantId: string, code: string): Promise<Promo | null> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/Promo?restaurant_id=${restaurantId}&code=${code}&is_active=true`,
      {
        headers: BASE44_HEADERS,
        next: { revalidate: 0 },
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const promos = Array.isArray(data) ? data : [];
    return promos[0] || null;
  } catch {
    return null;
  }
}

// ── Delivery fee via Railway ──────────────────────────────────────────────────

export async function calculateDeliveryFee(
  restaurantId: string,
  address: string
): Promise<{ fee: number; distance: number } | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RAILWAY_URL}/api/delivery/calculate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, address }),
      }
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
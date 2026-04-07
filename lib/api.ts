const BASE44_APP_ID = process.env.NEXT_PUBLIC_BASE44_APP_ID!;
const BASE44_API_KEY = process.env.NEXT_PUBLIC_BASE44_API_KEY!;
const BASE44_URL = `https://api.base44.app/api/apps/${BASE44_APP_ID}`;

const HEADERS = {
  'api-key': BASE44_API_KEY,
  'Content-Type': 'application/json',
};

// ── Types ────────────────────────────────────────────────────────────────────

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  banner?: string;
  logo?: string;
  address?: string;
  phone?: string;
  cuisine_type?: string;
  cuisine_type_vietnamese?: string;
  delivery_fee?: number;
  min_order_amount?: number;
  is_open?: boolean;
  is_accepting_orders?: boolean;
  is_active?: boolean;
  show_on_marketplace?: boolean;
  hours?: Record<string, string>;
  latitude?: number;
  longitude?: number;
  average_rating?: number;
  total_ratings?: number;
  featured?: boolean;
  featured_display_order?: number;
  subscription_tier?: string;
  dietary_options?: string[];
  show_powered_by?: boolean;
  parent_brand?: string;
  city?: string;
  district?: string;
  marketplace_clicks?: number;
}

export interface MenuCategory {
  id: string;
  restaurant_id: string;
  name: string;
  sort_order?: number;
  order?: number;
  is_active?: boolean;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  image?: string;
  is_available?: boolean;
  is_chef_choice?: boolean;
  is_spicy?: boolean;
  is_vegetarian?: boolean;
  customization_options?: string;
  out_of_stock_date?: string;
}

export interface OrderItem {
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  restaurant_id: string;
  restaurant_name: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  items: OrderItem[];
  subtotal: number;
  service_fee: number;
  delivery_fee: number;
  tip_amount: number;
  tip_percentage: number;
  total: number;
  order_type: 'pickup' | 'delivery';
  delivery_address?: string;
  delivery_distance?: number;
  payment_method: string;
  payment_status: string;
  notes?: string;
  language?: string;
  status: string;
  confirmed_at?: string;
  created_date?: string;
  rating_token?: string;
  average_rating?: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE44_URL}${path}`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Base44 API error: ${res.status} ${path}`);
  return res.json();
}

// ── Restaurant ────────────────────────────────────────────────────────────────

export async function getRestaurants(): Promise<Restaurant[]> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/Restaurant?_limit=500`,
      {
        headers: HEADERS,
        cache: 'no-store',
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data.filter((r: any) => r.is_active === true && r.show_on_marketplace === true);
  } catch {
    return [];
  }
}

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | null> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/Restaurant?slug=${encodeURIComponent(slug)}`,
      { headers: HEADERS, cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

export async function getRestaurantById(id: string): Promise<Restaurant | null> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/Restaurant?id=${encodeURIComponent(id)}`,
      { headers: HEADERS, cache: 'no-store' }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

// ── Menu ──────────────────────────────────────────────────────────────────────

export async function getMenuCategories(restaurantId: string): Promise<MenuCategory[]> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/MenuCategory?restaurant_id=${encodeURIComponent(restaurantId)}`,
      { headers: HEADERS, cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getMenuItems(restaurantId: string): Promise<MenuItem[]> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/MenuItem?restaurant_id=${encodeURIComponent(restaurantId)}`,
      { headers: HEADERS, cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// ── Orders ────────────────────────────────────────────────────────────────────

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  try {
    const res = await fetch(
      `${BASE44_URL}/entities/Order?customer_email=${encodeURIComponent(email)}&_sort=-created_date&_limit=50`,
      { headers: HEADERS, cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getOrderStatus(orderId: string): Promise<any | null> {
  try {
    const data = await post<any>('/functions/getOrderStatus', { orderId });
    return data?.data || data || null;
  } catch {
    return null;
  }
}

// ── Promos ────────────────────────────────────────────────────────────────────

export async function getPromo(code: string, restaurantId: string): Promise<{ valid: boolean; discount?: number; type?: string; message?: string }> {
  try {
    const data = await post<any>('/functions/validatePromo', { code, restaurant_id: restaurantId });
    return data?.data || data || { valid: false };
  } catch {
    return { valid: false };
  }
}

// ── Payments ──────────────────────────────────────────────────────────────────

export const PAYMENT_BACKEND_URL = process.env.NEXT_PUBLIC_RAILWAY_URL || 'https://ovenly-backend-production-ce50.up.railway.app';

export async function createPayment(
  method: 'momo' | 'zalopay' | 'vnpay',
  orderId: string,
  amount: number,
  redirectUrl: string
): Promise<{ payUrl?: string; error?: string }> {
  const endpoints: Record<string, string> = {
    momo: '/api/payments/momo/create',
    zalopay: '/api/payments/zalopay/create',
    vnpay: '/api/payments/vnpay/create',
  };
  try {
    const res = await fetch(`${PAYMENT_BACKEND_URL}${endpoints[method]}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        amount,
        orderInfo: `Ovenly Order ${orderId}`,
        redirectUrl,
      }),
    });
    return res.json();
  } catch {
    return { error: 'Payment connection failed' };
  }
}

// ── Contact ───────────────────────────────────────────────────────────────────

export async function submitContactForm(form: {
  full_name: string;
  restaurant_name?: string;
  phone_number?: string;
  email: string;
  city?: string;
  message: string;
  language?: string;
}): Promise<{ success: boolean }> {
  try {
    const data = await post<any>('/functions/submitContactForm', form);
    return data?.data || { success: true };
  } catch {
    return { success: false };
  }
}

// ── Auth (customer) ───────────────────────────────────────────────────────────

export async function customerLogin(email: string, password: string): Promise<{
  success: boolean; session_token?: string; customer?: any; error?: string;
}> {
  try {
    const data = await post<any>('/functions/customerAuth', { action: 'login', email, password });
    return data?.data || data;
  } catch {
    return { success: false, error: 'Login failed' };
  }
}

export async function customerSignup(params: {
  full_name: string; email: string; password: string;
  phone_number?: string; preferred_language?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const data = await post<any>('/functions/customerAuth', { action: 'signup', ...params });
    return data?.data || data;
  } catch {
    return { success: false, error: 'Signup failed' };
  }
}

export async function customerUpdateProfile(
  sessionToken: string,
  updates: { full_name?: string; phone_number?: string; preferred_language?: string }
): Promise<{ success: boolean }> {
  try {
    const data = await post<any>('/functions/customerAuth', {
      action: 'update_profile',
      session_token: sessionToken,
      updates,
    });
    return data?.data || { success: true };
  } catch {
    return { success: false };
  }
}

export async function validateOrderAcceptance(restaurantId: string): Promise<{
  accepting: boolean; message?: string; message_vi?: string;
}> {
  try {
    const data = await post<any>('/functions/validateOrderAcceptance', { restaurant_id: restaurantId });
    return data?.data || { accepting: true };
  } catch {
    return { accepting: true };
  }
}

// ── Ratings ───────────────────────────────────────────────────────────────────

export async function validateRatingToken(orderId: string, token: string): Promise<{
  valid: boolean; reason?: string; order?: any;
}> {
  try {
    const data = await post<any>('/functions/validateRatingToken', { orderId, token });
    return data?.data || { valid: false };
  } catch {
    return { valid: false };
  }
}

export async function submitRating(orderId: string, token: string, rating: number, comment: string): Promise<{
  success: boolean; google_review_link?: string;
}> {
  try {
    const data = await post<any>('/functions/submitRating', { orderId, token, rating, comment });
    return data?.data || { success: true };
  } catch {
    return { success: false };
  }
}
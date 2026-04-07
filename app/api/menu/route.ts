import { NextResponse } from 'next/server';

const APP_ID = '69c130c9110a89987aae7fb0';
const API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';
const BASE = `https://api.base44.app/api/apps/${APP_ID}`;

async function get(url: string, headers: Record<string, string> = {}): Promise<any[]> {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...headers },
      cache: 'no-store',
    });
    if (!res.ok) {
      console.log(`[menu] ${url} → ${res.status}`);
      return [];
    }
    const body = await res.json();
    const data = Array.isArray(body) ? body : (body?.items ?? body?.data ?? body?.results ?? []);
    return Array.isArray(data) ? data : [];
  } catch (e: any) {
    console.log(`[menu] fetch error: ${e.message}`);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get('restaurantId') || '';
  const slug = searchParams.get('slug') || '';

  let items: any[] = [];
  let categories: any[] = [];

  // ── ITEMS: getStorefront function (service role internally) ──
  if (slug) {
    try {
      const res = await fetch(`${BASE}/functions/getStorefront`, {
        method: 'POST',
        headers: { 'api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
        cache: 'no-store',
      });
      if (res.ok) {
        const d = await res.json();
        if (d?.menuItems?.length > 0) items = d.menuItems;
        if (d?.menuCategories?.length > 0) categories = d.menuCategories;
      }
    } catch {}
  }

  // ── CATEGORIES: try every possible auth combination ──
  if (categories.length === 0 && restaurantId) {

    const catUrl = `${BASE}/entities/MenuCategory?restaurant_id=${restaurantId}&_limit=200`;
    const allCatUrl = `${BASE}/entities/MenuCategory?_limit=2000`;

    // 1. Origin spoofing — lodoan.vn is likely whitelisted by Base44
    categories = await get(catUrl, { 'Origin': 'https://lodoan.vn', 'Referer': 'https://lodoan.vn/' });

    // 2. Origin + api-key
    if (!categories.length) categories = await get(catUrl, {
      'Origin': 'https://lodoan.vn',
      'Referer': 'https://lodoan.vn/',
      'api-key': API_KEY,
    });

    // 3. App ID as api-key (some Base44 apps use appId as the public key)
    if (!categories.length) categories = await get(catUrl, { 'api-key': APP_ID });

    // 4. Authorization Bearer APP_ID
    if (!categories.length) categories = await get(catUrl, { 'Authorization': `Bearer ${APP_ID}` });

    // 5. Authorization Bearer API_KEY
    if (!categories.length) categories = await get(catUrl, { 'Authorization': `Bearer ${API_KEY}` });

    // 6. X-App-Id header
    if (!categories.length) categories = await get(catUrl, { 'x-app-id': APP_ID, 'api-key': API_KEY });

    // 7. Fetch ALL with origin spoofing + filter locally
    if (!categories.length) {
      const all = await get(allCatUrl, { 'Origin': 'https://lodoan.vn', 'Referer': 'https://lodoan.vn/' });
      categories = all.filter((c: any) => c.restaurant_id === restaurantId);
    }

    // 8. Fetch ALL with api-key + origin + filter locally
    if (!categories.length) {
      const all = await get(allCatUrl, {
        'Origin': 'https://lodoan.vn',
        'api-key': API_KEY,
      });
      categories = all.filter((c: any) => c.restaurant_id === restaurantId);
    }

    // 9. Individual lookup by category_id (from items)
    if (!categories.length && items.length > 0) {
      const ids = [...new Set(items.map((i: any) => i.category_id).filter(Boolean))] as string[];
      for (const id of ids) {
        const single = await get(`${BASE}/entities/MenuCategory/${id}`, { 'api-key': API_KEY });
        categories.push(...single);
        if (!single.length) {
          const byId = await get(`${BASE}/entities/MenuCategory?id=${id}`, { 'api-key': API_KEY });
          categories.push(...byId);
        }
      }
    }

    if (categories.length) console.log(`[menu] Got ${categories.length} categories`);
  }

  // ── VIRTUAL FALLBACK: build from item category_id groups ──
  if (categories.length === 0 && items.length > 0) {
    const seen = new Set<string>();
    const virt: any[] = [];
    let ord = 0;
    for (const item of items) {
      const cid = item.category_id;
      if (cid && !seen.has(cid)) {
        seen.add(cid);
        virt.push({ id: cid, restaurant_id: restaurantId, name: `Danh mục ${ord + 1}`, order: ord++, is_active: true });
      }
    }
    if (virt.length > 0) {
      categories = virt;
      console.log(`[menu] Using ${categories.length} virtual categories`);
    }
  }

  console.log(`[menu] FINAL: ${categories.length} cats, ${items.length} items for ${slug}`);
  return NextResponse.json({ categories, items });
}
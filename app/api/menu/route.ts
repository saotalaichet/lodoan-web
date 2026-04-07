import { NextResponse } from 'next/server';

const BASE44_APP_ID = '69c130c9110a89987aae7fb0';
const BASE44_API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';
const BASE = `https://api.base44.app/api/apps/${BASE44_APP_ID}`;

async function tryEntityFetch(url: string, headers: Record<string, string> = {}): Promise<any[]> {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...headers },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const body = await res.json();
    const data = Array.isArray(body) ? body : (body?.items ?? body?.data ?? body?.results ?? []);
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get('restaurantId');
  const slug = searchParams.get('slug');

  if (!restaurantId && !slug) {
    return NextResponse.json({ categories: [], items: [] }, { status: 400 });
  }

  let items: any[] = [];
  let categories: any[] = [];

  // ── ITEMS: use getStorefront function (runs as service role inside Base44) ──
  // This is the ONLY way to read MenuItem — entity API is locked to service role
  if (slug) {
    try {
      const res = await fetch(`${BASE}/functions/getStorefront`, {
        method: 'POST',
        headers: { 'api-key': BASE44_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
        cache: 'no-store',
      });
      const text = await res.text();
      console.log(`[menu] getStorefront(${slug}) → ${res.status}: ${text.slice(0, 200)}`);
      if (res.ok) {
        const data = JSON.parse(text);
        if (Array.isArray(data.menuItems) && data.menuItems.length > 0) {
          items = data.menuItems;
        }
      }
    } catch (e: any) {
      console.error('[menu] getStorefront error:', e.message);
    }
  }

  // ── CATEGORIES: try entity API (MenuCategory may be publicly readable) ──
  if (restaurantId) {
    // Try 1: no auth
    categories = await tryEntityFetch(
      `${BASE}/entities/MenuCategory?restaurant_id=${restaurantId}&_limit=500`
    );

    // Try 2: with api-key header
    if (categories.length === 0) {
      categories = await tryEntityFetch(
        `${BASE}/entities/MenuCategory?restaurant_id=${restaurantId}&_limit=500`,
        { 'api-key': BASE44_API_KEY }
      );
    }

    // Try 3: fetch ALL categories, filter locally
    if (categories.length === 0) {
      const all = await tryEntityFetch(`${BASE}/entities/MenuCategory?_limit=2000`);
      categories = all.filter((c: any) => c.restaurant_id === restaurantId);
    }

    // Try 4: fetch ALL with api-key, filter locally
    if (categories.length === 0) {
      const all = await tryEntityFetch(
        `${BASE}/entities/MenuCategory?_limit=2000`,
        { 'api-key': BASE44_API_KEY }
      );
      categories = all.filter((c: any) => c.restaurant_id === restaurantId);
    }
  }

  console.log(`[menu] FINAL for ${slug || restaurantId}: ${categories.length} cats, ${items.length} items`);
  return NextResponse.json({ categories, items });
}
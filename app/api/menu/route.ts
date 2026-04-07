import { NextResponse } from 'next/server';

const BASE44_APP_ID = '69c130c9110a89987aae7fb0';
const BASE44_API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';
const BASE = `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities`;

async function tryFetch(url: string, headers: Record<string, string> = {}): Promise<any[]> {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...headers },
      cache: 'no-store',
    });
    const text = await res.text();
    console.log(`[menu] ${url} → ${res.status} (${text.slice(0, 120)})`);
    let body: any;
    try { body = JSON.parse(text); } catch { return []; }
    const data = Array.isArray(body) ? body : (body?.items ?? body?.data ?? body?.results ?? []);
    return Array.isArray(data) ? data : [];
  } catch (e: any) {
    console.error(`[menu] FETCH ERROR ${url}: ${e.message}`);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get('restaurantId');

  if (!restaurantId) {
    return NextResponse.json({ categories: [], items: [] }, { status: 400 });
  }

  console.log(`[menu] Fetching menu for restaurantId=${restaurantId}`);

  // Strategy 1: filter by restaurant_id in URL param, no auth
  let items = await tryFetch(`${BASE}/MenuItem?restaurant_id=${restaurantId}&_limit=500`);
  let categories = await tryFetch(`${BASE}/MenuCategory?restaurant_id=${restaurantId}&_limit=500`);

  // Strategy 2: filter with api-key header
  if (items.length === 0) {
    items = await tryFetch(`${BASE}/MenuItem?restaurant_id=${restaurantId}&_limit=500`, { 'api-key': BASE44_API_KEY });
  }
  if (categories.length === 0) {
    categories = await tryFetch(`${BASE}/MenuCategory?restaurant_id=${restaurantId}&_limit=500`, { 'api-key': BASE44_API_KEY });
  }

  // Strategy 3: JSON-encoded filter param
  if (items.length === 0) {
    const f = encodeURIComponent(JSON.stringify({ restaurant_id: restaurantId }));
    items = await tryFetch(`${BASE}/MenuItem?filter=${f}`);
  }
  if (categories.length === 0) {
    const f = encodeURIComponent(JSON.stringify({ restaurant_id: restaurantId }));
    categories = await tryFetch(`${BASE}/MenuCategory?filter=${f}`);
  }

  // Strategy 4: Authorization Bearer header
  if (items.length === 0) {
    items = await tryFetch(`${BASE}/MenuItem?restaurant_id=${restaurantId}&_limit=500`, {
      'Authorization': `Bearer ${BASE44_API_KEY}`,
    });
  }

  // Strategy 5: fetch ALL and filter server-side
  if (items.length === 0) {
    const all = await tryFetch(`${BASE}/MenuItem?_limit=2000`);
    items = all.filter((i: any) => i.restaurant_id === restaurantId);
    console.log(`[menu] Strategy 5 (all): ${all.length} total items, ${items.length} for this restaurant`);
  }
  if (categories.length === 0) {
    const all = await tryFetch(`${BASE}/MenuCategory?_limit=2000`);
    categories = all.filter((c: any) => c.restaurant_id === restaurantId);
    console.log(`[menu] Strategy 5 (all): ${all.length} total cats, ${categories.length} for this restaurant`);
  }

  // Strategy 6: fetch ALL with api-key header
  if (items.length === 0) {
    const all = await tryFetch(`${BASE}/MenuItem?_limit=2000`, { 'api-key': BASE44_API_KEY });
    items = all.filter((i: any) => i.restaurant_id === restaurantId);
    console.log(`[menu] Strategy 6 (all+apikey): ${all.length} total items, ${items.length} for this restaurant`);
  }
  if (categories.length === 0) {
    const all = await tryFetch(`${BASE}/MenuCategory?_limit=2000`, { 'api-key': BASE44_API_KEY });
    categories = all.filter((c: any) => c.restaurant_id === restaurantId);
  }

  console.log(`[menu] FINAL: ${categories.length} categories, ${items.length} items for restaurant ${restaurantId}`);

  return NextResponse.json({ categories, items });
}
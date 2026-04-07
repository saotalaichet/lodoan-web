import { NextResponse } from 'next/server';

const BASE44_APP_ID = '69c130c9110a89987aae7fb0';
const BASE44_API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';

async function fetchAll(entity: string): Promise<any[]> {
  // Try without auth first (this is how restaurants load successfully)
  try {
    const res = await fetch(
      `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities/${entity}?_limit=2000`,
      { headers: { 'Content-Type': 'application/json' }, cache: 'no-store' }
    );
    if (res.ok) {
      const body = await res.json();
      const data = Array.isArray(body) ? body : (body?.items ?? body?.data ?? body?.results ?? []);
      if (Array.isArray(data)) return data;
    }
  } catch {}

  // Fallback: try with api-key
  try {
    const res = await fetch(
      `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities/${entity}?_limit=2000`,
      { headers: { 'api-key': BASE44_API_KEY, 'Content-Type': 'application/json' }, cache: 'no-store' }
    );
    if (res.ok) {
      const body = await res.json();
      const data = Array.isArray(body) ? body : (body?.items ?? body?.data ?? body?.results ?? []);
      if (Array.isArray(data)) return data;
    }
  } catch {}

  return [];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get('restaurantId');

  if (!restaurantId) {
    return NextResponse.json({ categories: [], items: [] }, { status: 400 });
  }

  // Fetch ALL then filter server-side — same pattern that successfully loads restaurants
  const [allCategories, allItems] = await Promise.all([
    fetchAll('MenuCategory'),
    fetchAll('MenuItem'),
  ]);

  const categories = allCategories.filter(
    (c: any) => c.restaurant_id === restaurantId
  );

  const items = allItems.filter(
    (i: any) => i.restaurant_id === restaurantId
  );

  console.log(`Menu for ${restaurantId}: ${categories.length} categories, ${items.length} items (from ${allCategories.length} total cats, ${allItems.length} total items)`);

  return NextResponse.json({ categories, items });
}
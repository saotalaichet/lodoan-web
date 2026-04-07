import { NextResponse } from 'next/server';

const BASE44_APP_ID = '69c130c9110a89987aae7fb0';
const BASE44_API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';

async function fetchEntity(entity: string, restaurantId: string) {
  const res = await fetch(
    `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities/${entity}?restaurant_id=${encodeURIComponent(restaurantId)}&_limit=500`,
    {
      headers: { 'api-key': BASE44_API_KEY, 'Content-Type': 'application/json' },
      cache: 'no-store',
    }
  );
  const body = await res.json();
  return Array.isArray(body) ? body : (body?.items ?? body?.data ?? []);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get('restaurantId');

  if (!restaurantId) {
    return NextResponse.json({ categories: [], items: [] }, { status: 400 });
  }

  try {
    const [categories, items] = await Promise.all([
      fetchEntity('MenuCategory', restaurantId),
      fetchEntity('MenuItem', restaurantId),
    ]);
    return NextResponse.json({ categories, items });
  } catch (err) {
    console.error('Menu fetch error:', err);
    return NextResponse.json({ categories: [], items: [] });
  }
}
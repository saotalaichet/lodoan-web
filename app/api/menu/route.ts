import { NextResponse } from 'next/server';
const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ categories: [], items: [] }, { status: 400 });
  try {
    // Step 1 — get restaurant by slug to get its ID
    const restRes = await fetch(`${RAILWAY}/api/restaurants/slug/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!restRes.ok) return NextResponse.json({ categories: [], items: [] });
    const restaurant = await restRes.json();
    if (!restaurant?.id) return NextResponse.json({ categories: [], items: [] });

    // Step 2 — get menu by restaurant ID
    const menuRes = await fetch(`${RAILWAY}/api/menu/${restaurant.id}`, { cache: 'no-store' });
    if (!menuRes.ok) return NextResponse.json({ categories: [], items: [] });
    const data = await menuRes.json();

    return NextResponse.json({
      categories: data.categories || [],
      items: (data.items || []).filter((i: any) => i.is_available !== false),
    });
  } catch {
    return NextResponse.json({ categories: [], items: [] });
  }
}
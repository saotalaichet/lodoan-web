import { NextResponse } from 'next/server';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json({ categories: [], items: [] }, { status: 400 });

  try {
    const res = await fetch(`${RAILWAY}/api/storefront/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return NextResponse.json({ categories: [], items: [] });
    const data = await res.json();
    return NextResponse.json({
      categories: data.menuCategories || [],
      items: data.menuItems || [],
    });
  } catch {
    return NextResponse.json({ categories: [], items: [] });
  }
}
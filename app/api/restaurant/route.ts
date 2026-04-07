import { NextResponse } from 'next/server';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return NextResponse.json(null, { status: 400 });

  try {
    const res = await fetch(`${RAILWAY}/api/restaurants/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (!res.ok) return NextResponse.json(null, { status: 404 });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
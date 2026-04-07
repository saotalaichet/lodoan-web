import { NextResponse } from 'next/server';

const BASE44_APP_ID = '69c130c9110a89987aae7fb0';
const BASE44_API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const id = searchParams.get('id');

  if (!slug && !id) {
    return NextResponse.json(null, { status: 400 });
  }

  const param = slug ? `slug=${encodeURIComponent(slug)}` : `id=${encodeURIComponent(id!)}`;

  try {
    const res = await fetch(
      `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities/Restaurant?${param}`,
      {
        headers: { 'api-key': BASE44_API_KEY, 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );
    const body = await res.json();
    const data = Array.isArray(body) ? body : (body?.items ?? body?.data ?? []);
    return NextResponse.json(data.length > 0 ? data[0] : null);
  } catch (err) {
    console.error('Restaurant fetch error:', err);
    return NextResponse.json(null);
  }
}
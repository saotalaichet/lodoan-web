import { NextResponse } from 'next/server';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!token) return NextResponse.json([], { status: 400 });

  try {
    const res = await fetch(`${RAILWAY}/api/auth/customer/orders`, {
      headers: { 'Authorization': `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) return NextResponse.json([]);
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json([]);
  }
}
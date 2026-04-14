import { NextResponse } from 'next/server';

const RAILWAY = 'https://ovenly-backend-production-ce50.up.railway.app';

export async function GET() {
  try {
    const res = await fetch(`${RAILWAY}/api/marketplace/restaurants`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return NextResponse.json([]);
    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error('Failed to fetch restaurants:', err);
    return NextResponse.json([]);
  }
}
import { NextResponse } from 'next/server';

const APP_ID = '69c130c9110a89987aae7fb0';
const API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';
const BASE = `https://api.base44.app/api/apps/${APP_ID}`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) return NextResponse.json([], { status: 400 });

  try {
    const res = await fetch(`${BASE}/functions/customerAuth`, {
      method: 'POST',
      headers: { 'api-key': API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_orders', session_token: token }),
      cache: 'no-store',
    });

    if (!res.ok) return NextResponse.json([]);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.orders)) return NextResponse.json([]);
    return NextResponse.json(data.orders);
  } catch {
    return NextResponse.json([]);
  }
}
import { NextResponse } from 'next/server';

const BASE44_APP_ID = process.env.NEXT_PUBLIC_BASE44_APP_ID || '69c130c9110a89987aae7fb0';
const BASE44_API_KEY = process.env.NEXT_PUBLIC_BASE44_API_KEY || '1552c0075c5e4229b7c5a76cbbb9a457';

export async function GET() {
  try {
    const res = await fetch(
      `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities/Restaurant?_limit=500`,
      {
        headers: {
          'api-key': BASE44_API_KEY,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 30 },
      }
    );

    if (!res.ok) {
      console.error('Base44 API error:', res.status, res.statusText);
      return NextResponse.json([], { status: 200 });
    }

    const body = await res.json();
    // Handle both array and wrapped response formats
    const data = Array.isArray(body)
      ? body
      : (body.items || body.data || body.results || body.restaurants || []);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Restaurant fetch error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
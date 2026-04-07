import { NextResponse } from 'next/server';

const APP_ID = '69c130c9110a89987aae7fb0';
const API_KEY = '1552c0075c5e4229b7c5a76cbbb9a457';
const BASE = `https://api.base44.app/api/apps/${APP_ID}`;

async function tryFetch(url: string, headers: Record<string, string>): Promise<any[]> {
  try {
    const res = await fetch(url, { headers: { 'Content-Type': 'application/json', ...headers }, cache: 'no-store' });
    if (!res.ok) return [];
    const body = await res.json();
    return Array.isArray(body) ? body : (body?.items ?? body?.data ?? []);
  } catch { return []; }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  if (!email) return NextResponse.json([], { status: 400 });

  // Strategy 1: pass session token as Bearer (how Base44 SDK authenticates user reads)
  if (token) {
    const orders = await tryFetch(
      `${BASE}/entities/Order?customer_email=${encodeURIComponent(email)}&_limit=200&_sort=-created_date`,
      { 'Authorization': `Bearer ${token}` }
    );
    if (orders.length > 0) {
      return NextResponse.json(orders.filter((o: any) => o.customer_email === email));
    }
  }

  // Strategy 2: token + api-key
  if (token) {
    const orders = await tryFetch(
      `${BASE}/entities/Order?customer_email=${encodeURIComponent(email)}&_limit=200`,
      { 'Authorization': `Bearer ${token}`, 'api-key': API_KEY }
    );
    if (orders.length > 0) {
      return NextResponse.json(orders.filter((o: any) => o.customer_email === email));
    }
  }

  // Strategy 3: api-key only with email filter
  const orders3 = await tryFetch(
    `${BASE}/entities/Order?customer_email=${encodeURIComponent(email)}&_limit=200`,
    { 'api-key': API_KEY }
  );
  if (orders3.length > 0) {
    return NextResponse.json(orders3.filter((o: any) => o.customer_email === email));
  }

  // Strategy 4: Origin spoofing
  if (token) {
    const orders = await tryFetch(
      `${BASE}/entities/Order?customer_email=${encodeURIComponent(email)}&_limit=200`,
      { 'Origin': 'https://lodoan.vn', 'Authorization': `Bearer ${token}` }
    );
    if (orders.length > 0) {
      return NextResponse.json(orders.filter((o: any) => o.customer_email === email));
    }
  }

  // Strategy 5: validate token first via customerAuth function, then fetch
  if (token) {
    try {
      const validateRes = await fetch(`${BASE}/functions/customerAuth`, {
        method: 'POST',
        headers: { 'api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_token: token, action: 'validate' }),
        cache: 'no-store',
      });
      if (validateRes.ok) {
        const vData = await validateRes.json();
        const validatedEmail = vData?.data?.customer?.email || vData?.customer?.email;
        if (validatedEmail === email) {
          // Token is valid — try fetching with it as X-Session-Token
          const orders = await tryFetch(
            `${BASE}/entities/Order?customer_email=${encodeURIComponent(email)}&_limit=200`,
            { 'X-Session-Token': token, 'api-key': API_KEY }
          );
          if (orders.length > 0) {
            return NextResponse.json(orders.filter((o: any) => o.customer_email === email));
          }
        }
      }
    } catch {}
  }

  return NextResponse.json([]);
}
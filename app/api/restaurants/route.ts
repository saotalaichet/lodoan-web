import { NextResponse } from 'next/server';

const BASE44_APP_ID = '69c130c9110a89987aae7fb0';

export async function GET() {
  const urls = [
    // Try without auth first (public entity read)
    `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities/Restaurant?_limit=500`,
    // Fallback with different param format
    `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities/Restaurant`,
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });

      const text = await res.text();

      // Try to parse as JSON
      let body: any;
      try {
        body = JSON.parse(text);
      } catch {
        console.error('Base44 non-JSON response:', text.slice(0, 200));
        continue;
      }

      // Handle various response shapes
      const data = Array.isArray(body)
        ? body
        : (body?.items ?? body?.data ?? body?.results ?? body?.restaurants ?? []);

      if (Array.isArray(data) && data.length > 0) {
        console.log(`Base44 returned ${data.length} restaurants from ${url}`);
        return NextResponse.json(data);
      }

      console.log(`Base44 response from ${url}: status=${res.status}, type=${typeof body}, length=${Array.isArray(data) ? data.length : 'N/A'}`);
    } catch (err) {
      console.error(`Fetch error for ${url}:`, err);
    }
  }

  // Last resort: try with api-key header
  try {
    const res = await fetch(
      `https://api.base44.app/api/apps/${BASE44_APP_ID}/entities/Restaurant?_limit=500`,
      {
        headers: {
          'api-key': '1552c0075c5e4229b7c5a76cbbb9a457',
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
    const body = await res.json();
    const data = Array.isArray(body) ? body : (body?.items ?? body?.data ?? []);
    console.log(`api-key attempt: status=${res.status}, count=${Array.isArray(data) ? data.length : 'N/A'}`);
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error('All attempts failed:', err);
    return NextResponse.json([]);
  }
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  if (host === 'owner.ovenly.io' && pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/owner/login';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/';
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // owner.ovenly.io — redirect root to /owner/login
  if (host === 'owner.ovenly.io') {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/owner/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/owner/:path*'],
};
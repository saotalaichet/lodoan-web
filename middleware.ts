import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ROOT_DOMAIN = 'lodoan.vn';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const path = request.nextUrl.pathname;

  // Only handle *.lodoan.vn subdomains
  if (!hostname.endsWith(`.${ROOT_DOMAIN}`) || hostname.startsWith('www')) {
    return NextResponse.next();
  }

  const slug = hostname.replace(`.${ROOT_DOMAIN}`, '');

  // Map URL path to tab
  const tabMap: Record<string, string> = {
    '/menu':     'menu',
    '/location': 'location',
    '/review':   'review',
  };

  const tab = tabMap[path] || 'menu';

  const url = request.nextUrl.clone();
  url.pathname = `/${slug}`;
  url.searchParams.set('tab', tab);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
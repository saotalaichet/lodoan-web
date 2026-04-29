import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that belong only to lodoan.vn (B2C customer marketplace)
const LODOAN_ONLY_PATHS = [
  '/order/',     // customer order tracking
  '/orders/',    // customer order list
  '/profile',    // customer profile
  '/rate/',      // customer rating
  '/login',      // customer login (uses customerAuth)
  '/signup',     // customer signup
  '/register',   // customer register
  '/reset-password',
];

// Routes that have ovenly equivalents under /company
const OVENLY_REDIRECT_MAP: Record<string, string> = {
  '/terms': '/company/terms',
  '/privacy': '/company/privacy',
};

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Subdomain detection
  const isOwnerPortal = host.startsWith('owner.ovenly.io');
  const isOvenlyMain = (host === 'ovenly.io' || host === 'www.ovenly.io') && !isOwnerPortal;
  const isLodoan = host.includes('lodoan.vn');

  // ─── owner.ovenly.io: ONLY serves /owner/* paths ───────────────────────────
  if (isOwnerPortal) {
    // Homepage rewrite (existing behavior)
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/owner/login';
      return NextResponse.rewrite(url);
    }
    // Allow only /owner/* and Next.js internals (_next, api, static assets)
    if (
      pathname.startsWith('/owner/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname === '/favicon.ico' ||
      /\.(ico|png|jpg|jpeg|svg|webp|css|js|json|txt|xml)$/.test(pathname)
    ) {
      return NextResponse.next();
    }
    // Anything else on owner subdomain redirects to owner login
    return NextResponse.redirect(new URL('https://owner.ovenly.io/owner/login'));
  }

  // ─── /owner/* on wrong subdomain → owner.ovenly.io ────────────────────────
  if (pathname.startsWith('/owner/') && !isOwnerPortal) {
    return NextResponse.redirect(
      new URL(`https://owner.ovenly.io${pathname}`),
      { status: 301 }
    );
  }

  // ─── www.ovenly.io: serve company/marketing only ──────────────────────────
  if (isOvenlyMain) {
    // Homepage rewrite (existing behavior)
    if (pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = '/company';
      return NextResponse.rewrite(url);
    }

    // Map lodoan paths to ovenly equivalents (e.g. /terms → /company/terms)
    if (OVENLY_REDIRECT_MAP[pathname]) {
      return NextResponse.redirect(
        new URL(OVENLY_REDIRECT_MAP[pathname], `https://${host}`),
        { status: 301 }
      );
    }

    // Block lodoan-only paths with 404
    if (LODOAN_ONLY_PATHS.some(p => pathname === p || pathname.startsWith(p))) {
      return new NextResponse(null, { status: 404 });
    }

    // Block restaurant slug pattern (lodoan-only customer pages)
    // We assume any path that doesn't start with /company, /api, /_next, /about, /contact,
    // and doesn't match a static asset, is a restaurant slug from lodoan
    const isAllowedOvenly =
      pathname.startsWith('/company/') ||
      pathname === '/company' ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/api/') ||
      pathname === '/about' ||
      pathname === '/contact' ||
      pathname === '/favicon.ico' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      /\.(ico|png|jpg|jpeg|svg|webp|css|js|json|txt|xml)$/.test(pathname);

    if (!isAllowedOvenly) {
      return new NextResponse(null, { status: 404 });
    }

    return NextResponse.next();
  }

  // ─── www.lodoan.vn: serve customer marketplace ─────────────────────────────
  if (isLodoan) {
    // /company/* should redirect to ovenly's domain (right brand)
    if (pathname.startsWith('/company/') || pathname === '/company') {
      return NextResponse.redirect(
        new URL(`https://www.ovenly.io${pathname}`),
        { status: 301 }
      );
    }
    return NextResponse.next();
  }

  // ─── Localhost/preview: pass through ──────────────────────────────────────
  return NextResponse.next();
}

export const config = {
  // Run on most paths; exclude static asset shortcuts only
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)',
  ],
};

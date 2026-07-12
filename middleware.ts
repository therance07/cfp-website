import { NextResponse, type NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes — check for Supabase auth cookie (set by @supabase/ssr on login)
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      // A POST here can only be the native <form> fallback (auth itself never posts to this URL) — PRG back to a clean GET with a notice.
      if (request.method === 'POST') {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('fallback', '1');
        return NextResponse.redirect(loginUrl, { status: 303 });
      }
      return NextResponse.next();
    }

    // Look for any Supabase session cookie (sb-*-auth-token or sb-access-token)
    const cookies   = request.cookies.getAll();
    const hasSession = cookies.some(
      (c) => c.name.includes('sb-') && c.name.includes('auth-token') && c.value.length > 0
    );

    if (!hasSession) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // All other routes — next-intl i18n routing
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', ],
};

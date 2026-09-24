import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle Admin routes
  if (pathname.startsWith('/admin')) {
    if (!pathname.startsWith('/admin/auth')) {
      const session = request.cookies.get('session');
      if (!session) {
        return NextResponse.redirect(new URL('/admin/auth', request.url));
      }
    }
    return NextResponse.next();
  }

  // Skip api, _next, and files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, and files with an extension
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};

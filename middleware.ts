import { NextRequest, NextResponse } from 'next/server';
import { validateUser } from '@/lib/session';

export default async function middleware(request: NextRequest) {

  const app_at = request.cookies.get('app.at'); // Access the cookie
  const isLoggedIn = await validateUser(app_at?.value);


  const isOnAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (!isLoggedIn && !isOnAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isLoggedIn && isOnAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
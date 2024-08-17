import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/my-collections', '/settings'];
const publicRoutes = ['/'];
const authRoutes = ['/auth/login', '/auth/signup'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);
  const sessionCookie = cookies().get('session')?.value;
  const session = JSON.parse(sessionCookie || '{}');

  if (isProtectedRoute && !session?.user?.jwt) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isAuthRoute && session?.user?.jwt && !req.nextUrl.pathname.startsWith('/my-collections')) {
    return NextResponse.redirect(new URL('/my-collections', req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

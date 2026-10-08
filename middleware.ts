import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Skip auth checks if env is not configured (prevents build/runtime crash)
  if (!url || !key) {
    return supabaseResponse;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isGuest = request.nextUrl.searchParams.get('guest') === '1' || request.cookies.get('guest_mode')?.value === '1';

  const protectedPaths = ['/dashboard', '/invest', '/wallet', '/history', '/profile', '/admin'];
  const isProtected = protectedPaths.some((p) => path.startsWith(p));

  // Allow guest access to user-facing pages (not admin)
  if (isProtected && !user && !isGuest) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    return NextResponse.redirect(redirectUrl);
  }

  // Block guests from admin
  if (path.startsWith('/admin') && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';
    return NextResponse.redirect(redirectUrl);
  }

  // Set guest cookie when arriving with ?guest=1
  if (isGuest && !request.cookies.get('guest_mode')) {
    supabaseResponse.cookies.set('guest_mode', '1', {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'lax',
    });
  }

  if (user && (path.startsWith('/auth/login') || path.startsWith('/auth/register'))) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/mpesa/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

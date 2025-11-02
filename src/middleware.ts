import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n-config";

// Helper to detect locale from pathname
function getLocaleFromPathname(pathname: string): Locale | null {
	for (const locale of locales) {
		if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
			return locale;
		}
	}
	return null;
}

// Helper to get preferred locale
function getPreferredLocale(request: NextRequest): Locale {
	// 1. Check cookie
	const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
	if (cookieLocale && locales.includes(cookieLocale as Locale)) {
		return cookieLocale as Locale;
	}

	// 2. Check Accept-Language header
	const acceptLanguage = request.headers.get('accept-language');
	if (acceptLanguage) {
		for (const locale of locales) {
			if (acceptLanguage.toLowerCase().includes(locale)) {
				return locale;
			}
		}
	}

	// 3. Default
	return defaultLocale;
}

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Skip middleware for static files, API routes, and special Next.js paths
	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.includes('/favicon.ico') ||
		pathname.match(/\.(jpg|jpeg|gif|png|svg|ico|webp)$/)
	) {
		return NextResponse.next();
	}

	// Check if pathname already has a locale
	const pathnameLocale = getLocaleFromPathname(pathname);

	if (!pathnameLocale) {
		// Redirect to locale-prefixed URL
		const locale = getPreferredLocale(request);
		const newUrl = new URL(`/${locale}${pathname}`, request.url);
		
		// Preserve query params
		newUrl.search = request.nextUrl.search;
		
		const response = NextResponse.redirect(newUrl);
		response.cookies.set('NEXT_LOCALE', locale, { maxAge: 31536000 }); // 1 year
		return response;
	}

	// Create response with locale
	let response = NextResponse.next({
		request: {
			headers: new Headers(request.headers),
		},
	});

	// Set locale cookie
	response.cookies.set('NEXT_LOCALE', pathnameLocale, { maxAge: 31536000 });

	// Supabase auth check (existing logic)
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseAnonKey) {
		console.log("Middleware: Supabase not configured, allowing access");
		return response;
	}

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value, options }) => {
					response.cookies.set(name, value, options);
				});
			},
		},
	});

	const { data: { session } } = await supabase.auth.getSession();

	// Protected routes check (now with locale prefix)
	const protectedRoutes = [`/${pathnameLocale}/dashboard`, `/${pathnameLocale}/admin`];
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);

	// Admin login page should be accessible
	if (pathname === `/${pathnameLocale}/admin/login`) {
		return response;
	}

	// If accessing a protected route without a session, redirect to home
	if (isProtectedRoute && !session) {
		console.log("Middleware: No session found, redirecting to home");
		const redirectUrl = new URL(`/${pathnameLocale}`, request.url);
		return NextResponse.redirect(redirectUrl);
	}

	console.log("Middleware: User authenticated, allowing access to", pathname);
	return response;
}

export const config = {
	matcher: [
		// Match all pathnames except those starting with:
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
};




import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/lib/i18n-config";

// Route translations: maps translated slugs to canonical routes
const routeTranslations: Record<Locale, Record<string, string>> = {
	en: { buy: 'buy' }, // English uses canonical
	pt: { comprar: 'buy' }, // Portuguese: comprar → buy
	es: { comprar: 'buy', venta: 'buy' }, // Spanish: comprar/venta → buy
	fr: { acheter: 'buy' }, // French: acheter → buy
	de: { kaufen: 'buy' }, // German: kaufen → buy
	sv: { köp: 'buy', kopa: 'buy' }, // Swedish: köp/kopa → buy
};

// Reverse mapping: canonical route to translated slug per language
const canonicalToTranslated: Record<Locale, Record<string, string>> = {
	en: { buy: 'buy' },
	pt: { buy: 'comprar' },
	es: { buy: 'comprar' },
	fr: { buy: 'acheter' },
	de: { buy: 'kaufen' },
	sv: { buy: 'kop' }, // Use 'kop' without umlaut for URL
};

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

	// Handle translated route slugs (e.g., /pt/venda → /pt/buy)
	const pathSegments = pathname.split('/').filter(Boolean);
	if (pathSegments.length >= 2) {
		const locale = pathSegments[0] as Locale;
		const slug = pathSegments[1];
		
		// Check if this slug needs translation
		if (routeTranslations[locale]?.[slug]) {
			const canonicalSlug = routeTranslations[locale][slug];
			const remainingPath = pathSegments.slice(2).join('/');
			const rewritePath = `/${locale}/${canonicalSlug}${remainingPath ? '/' + remainingPath : ''}`;
			
			// Rewrite to canonical route internally
			const url = request.nextUrl.clone();
			url.pathname = rewritePath;
			
			return NextResponse.rewrite(url);
		}
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

	// Admin routes use localStorage-based auth, not Supabase sessions
	// So we skip the session check for admin routes
	const isAdminRoute = pathname.startsWith(`/${pathnameLocale}/admin`);
	
	// Admin login page should be accessible
	if (pathname === `/${pathnameLocale}/admin/login`) {
		return response;
	}
	
	// Allow all admin routes to pass through
	// (AuthGuard component will handle admin authentication)
	if (isAdminRoute) {
		console.log("Middleware: Admin route detected, allowing through (AuthGuard will verify)");
		return response;
	}

	// Protected routes check (user dashboard requires Supabase session)
	const protectedRoutes = [`/${pathnameLocale}/dashboard`];
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);

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




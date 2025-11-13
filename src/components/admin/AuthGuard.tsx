"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	// Extract language from pathname (e.g., /en/admin/dashboard -> en)
	const getLanguageFromPath = () => {
		const segments = pathname.split('/').filter(Boolean);
		return segments[0] || 'en'; // Default to 'en' if no language found
	};

	useEffect(() => {
		const currentLanguage = getLanguageFromPath();
		
		if (process.env.NODE_ENV === 'development') {
			console.log("🛡️ AuthGuard checking...", {
				pathname,
				currentLanguage
			});
		}
		
		// Check if user is authenticated
		const authenticated = localStorage.getItem("admin-authenticated") === "true";
		const adminUser = localStorage.getItem("admin-user");
		
		if (process.env.NODE_ENV === 'development') {
			console.log("🛡️ Auth status:", {
				authenticated,
				hasUserData: !!adminUser,
				authValue: localStorage.getItem("admin-authenticated")
			});
		}
		
		// Check if we're on the login page (with locale prefix)
		const isLoginPage = pathname.endsWith("/admin/login");
		
		// If not on login page and not authenticated, redirect to login
		if (!authenticated && !isLoginPage) {
			if (process.env.NODE_ENV === 'development') {
				console.log("❌ Not authenticated, redirecting to login");
			}
			router.push(`/${currentLanguage}/admin/login`);
		} else if (authenticated && isLoginPage) {
			if (process.env.NODE_ENV === 'development') {
				console.log("✅ Authenticated on login page, redirecting to dashboard");
			}
			router.push(`/${currentLanguage}/admin/dashboard`);
		} else {
			if (process.env.NODE_ENV === 'development') {
				console.log("✅ Auth check passed, rendering children");
			}
			setIsAuthenticated(authenticated);
		}
	}, [router, pathname]);

	// Show nothing while checking authentication
	const isLoginPage = pathname.endsWith("/admin/login");
	if (isAuthenticated === null || (!isAuthenticated && !isLoginPage)) {
		return null;
	}

	return <>{children}</>;
}




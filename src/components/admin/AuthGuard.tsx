"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export function AuthGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const { currentLanguage } = useLanguage();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		console.log("🛡️ AuthGuard checking...", {
			pathname,
			currentLanguage
		});
		
		// Check if user is authenticated
		const authenticated = localStorage.getItem("admin-authenticated") === "true";
		const adminUser = localStorage.getItem("admin-user");
		
		console.log("🛡️ Auth status:", {
			authenticated,
			hasUserData: !!adminUser,
			authValue: localStorage.getItem("admin-authenticated")
		});
		
		// Check if we're on the login page (with locale prefix)
		const isLoginPage = pathname.endsWith("/admin/login");
		
		// If not on login page and not authenticated, redirect to login
		if (!authenticated && !isLoginPage) {
			console.log("❌ Not authenticated, redirecting to login");
			router.push(`/${currentLanguage}/admin/login`);
		} else if (authenticated && isLoginPage) {
			console.log("✅ Authenticated on login page, redirecting to dashboard");
			router.push(`/${currentLanguage}/admin/dashboard`);
		} else {
			console.log("✅ Auth check passed, rendering children");
			setIsAuthenticated(authenticated);
		}
	}, [router, pathname, currentLanguage]);

	// Show nothing while checking authentication
	const isLoginPage = pathname.endsWith("/admin/login");
	if (isAuthenticated === null || (!isAuthenticated && !isLoginPage)) {
		console.log("⏳ AuthGuard waiting...", { isAuthenticated, isLoginPage });
		return null;
	}

	console.log("✅ AuthGuard rendering children");
	return <>{children}</>;
}




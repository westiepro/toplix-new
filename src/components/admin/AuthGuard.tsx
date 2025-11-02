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
		// Check if user is authenticated
		const authenticated = localStorage.getItem("admin-authenticated") === "true";
		
		// Check if we're on the login page (with locale prefix)
		const isLoginPage = pathname.endsWith("/admin/login");
		
		// If not on login page and not authenticated, redirect to login
		if (!authenticated && !isLoginPage) {
			router.push(`/${currentLanguage}/admin/login`);
		} else if (authenticated && isLoginPage) {
			router.push(`/${currentLanguage}/admin/dashboard`);
		} else {
			setIsAuthenticated(authenticated);
		}
	}, [router, pathname, currentLanguage]);

	// Show nothing while checking authentication
	const isLoginPage = pathname.endsWith("/admin/login");
	if (isAuthenticated === null || (!isAuthenticated && !isLoginPage)) {
		return null;
	}

	return <>{children}</>;
}




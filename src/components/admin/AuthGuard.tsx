"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {
		// Check if user is authenticated
		const authenticated = localStorage.getItem("admin-authenticated") === "true";
		
		// If not on login page and not authenticated, redirect to login
		if (!authenticated && pathname !== "/admin/login") {
			router.push("/admin/login");
		} else if (authenticated && pathname === "/admin/login") {
			router.push("/admin/dashboard");
		} else {
			setIsAuthenticated(authenticated);
		}
	}, [router, pathname]);

	// Show nothing while checking authentication
	if (isAuthenticated === null || (!isAuthenticated && pathname !== "/admin/login")) {
		return null;
	}

	return <>{children}</>;
}




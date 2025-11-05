"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<FavoritesProvider>
				<RecentlyViewedProvider>
					{children}
					<Toaster position="bottom-right" />
				</RecentlyViewedProvider>
			</FavoritesProvider>
		</AuthProvider>
	);
}


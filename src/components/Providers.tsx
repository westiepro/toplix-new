"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<FavoritesProvider>
				{children}
				<Toaster position="bottom-right" />
			</FavoritesProvider>
		</AuthProvider>
	);
}


"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthGuard } from "@/components/admin/AuthGuard";
import { usePathname } from "next/navigation";

export default function AdminLayoutWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const isLoginPage = pathname === "/admin/login";

	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<AuthGuard>
				{isLoginPage ? (
					children
				) : (
					<AdminLayout>{children}</AdminLayout>
				)}
			</AuthGuard>
		</ThemeProvider>
	);
}


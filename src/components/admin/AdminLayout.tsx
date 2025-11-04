"use client";

import { useState } from "react";
import { LocaleLink } from "@/components/LocaleLink";
import { usePathname } from "next/navigation";
import { 
	LayoutDashboard, 
	Home, 
	Users, 
	BarChart3, 
	Settings, 
	Menu, 
	X,
	Moon,
	Sun,
	LogOut,
	Languages,
	Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const navigation = [
	{ name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
	{ name: "Properties", href: "/admin/properties", icon: Home },
	{ name: "Companies", href: "/admin/companies", icon: Building2 },
	{ name: "Agents", href: "/admin/agents", icon: Users },
	{ name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
	{ name: "Translations", href: "/admin/translations", icon: Languages },
	{ name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const { currentLanguage } = useLanguage();
	const { theme, setTheme } = useTheme();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("admin-authenticated");
		router.push(`/${currentLanguage}/admin/login`);
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Mobile sidebar backdrop */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border transition-transform lg:translate-x-0",
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<div className="flex h-full flex-col">
					{/* Logo */}
					<div className="flex h-16 items-center justify-between px-6 border-b border-border">
						<LocaleLink href="/admin/dashboard" className="flex items-center gap-2">
							<div className="h-8 w-8 rounded-lg bg-[#198754] flex items-center justify-center">
								<Home className="h-5 w-5 text-white" />
							</div>
							<span className="font-semibold text-lg">Admin</span>
						</LocaleLink>
						<Button
							variant="ghost"
							size="icon"
							className="lg:hidden"
							onClick={() => setSidebarOpen(false)}
						>
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* Navigation */}
					<nav className="flex-1 px-4 py-6 space-y-1">
						{navigation.map((item) => {
							const localizedHref = `/${currentLanguage}${item.href}`;
							const isActive = pathname === localizedHref || pathname?.startsWith(localizedHref + "/");
							return (
								<LocaleLink
									key={item.name}
									href={item.href}
									onClick={() => setSidebarOpen(false)}
									className={cn(
										"flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
										isActive
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
									)}
								>
									<item.icon className="h-5 w-5" />
									{item.name}
								</LocaleLink>
							);
						})}
					</nav>

					{/* Footer */}
					<div className="p-4 border-t border-border">
						<div className="flex items-center gap-3 px-3 py-2">
							<Avatar className="h-8 w-8">
								<AvatarFallback>AD</AvatarFallback>
							</Avatar>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium truncate">Admin User</p>
								<p className="text-xs text-muted-foreground truncate">admin@example.com</p>
							</div>
						</div>
					</div>
				</div>
			</aside>

			{/* Main content */}
			<div className="lg:pl-64">
				{/* Header */}
				<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
					<Button
						variant="ghost"
						size="icon"
						className="lg:hidden"
						onClick={() => setSidebarOpen(true)}
					>
						<Menu className="h-5 w-5" />
					</Button>

					<div className="flex-1" />

					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						>
							<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="relative">
									<Avatar className="h-8 w-8">
										<AvatarFallback>AD</AvatarFallback>
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuItem asChild>
									<LocaleLink href="/admin/settings">
										Settings
									</LocaleLink>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={handleLogout}>
									<LogOut className="mr-2 h-4 w-4" />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>

				{/* Page content */}
				<main className="p-4 lg:p-6">{children}</main>
			</div>
		</div>
	);
}


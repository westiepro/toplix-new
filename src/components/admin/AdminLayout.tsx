"use client";

import { useState, useEffect } from "react";
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
	Building2,
	ChevronRight,
	ChevronLeft,
	ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
	{ name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
	{ name: "All Properties", href: "/admin/properties", icon: Home },
	{ name: "Real Estate Companies", href: "/admin/companies", icon: Building2 },
	{ name: "Site Users", href: "/admin/users", icon: Users },
	{ name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
	{ name: "Translations", href: "/admin/translations", icon: Languages },
	{ name: "Site Admins", href: "/admin/site-admins", icon: ShieldCheck, adminOnly: true },
	{ name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const { currentLanguage } = useLanguage();
	const { theme, setTheme } = useTheme();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isPinned, setIsPinned] = useState(false);
	const [adminUser, setAdminUser] = useState<any>(null);

	// Load admin user info
	useEffect(() => {
		const userJson = localStorage.getItem("admin-user");
		if (userJson) {
			try {
				setAdminUser(JSON.parse(userJson));
			} catch (e) {
				console.error('Failed to parse admin user:', e);
			}
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("admin-authenticated");
		localStorage.removeItem("admin-user");
		router.push(`/${currentLanguage}/admin/login`);
	};

	const togglePin = () => {
		setIsPinned(!isPinned);
		if (!isPinned) {
			setIsExpanded(true);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
			{/* Mobile sidebar backdrop */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<motion.aside
				initial={false}
				animate={{ 
					width: isExpanded || isPinned ? 256 : 64 
				}}
				transition={{ 
					duration: 0.25, 
					ease: [0.4, 0, 0.2, 1],
					type: "tween"
				}}
				onMouseEnter={() => !isPinned && setIsExpanded(true)}
				onMouseLeave={() => !isPinned && setIsExpanded(false)}
				className={cn(
					"fixed top-0 left-0 z-50 h-screen bg-slate-900 border-r border-slate-800 will-change-[width] lg:translate-x-0 overflow-hidden",
					(isExpanded || isPinned) && "shadow-2xl shadow-emerald-500/10 transition-shadow duration-300",
					sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				)}
			>
				<div className="flex h-full flex-col">
					{/* Logo */}
					<div className="flex h-16 items-center justify-between px-3 border-b border-slate-800 bg-gradient-to-r from-emerald-600 to-teal-600">
						<LocaleLink href="/admin/dashboard" className="flex items-center gap-2 min-w-0 flex-1">
							<div className="h-8 w-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30 flex-shrink-0">
								<Home className="h-5 w-5 text-white" />
							</div>
							<motion.span
								initial={false}
								animate={{ 
									opacity: (isExpanded || isPinned) ? 1 : 0,
									width: (isExpanded || isPinned) ? "auto" : 0
								}}
								transition={{ 
									duration: 0.2,
									ease: "easeOut"
								}}
								className="font-bold text-lg text-white whitespace-nowrap overflow-hidden"
							>
								Admin Panel
							</motion.span>
						</LocaleLink>
						
						{/* Toggle Pin Button - Desktop */}
						<Button
							variant="ghost"
							size="icon"
							className="hidden lg:flex text-white hover:bg-white/20 flex-shrink-0"
							onClick={togglePin}
						>
							{isPinned ? (
								<ChevronLeft className="h-4 w-4" />
							) : (
								<ChevronRight className="h-4 w-4" />
							)}
						</Button>
						
						{/* Close Button - Mobile */}
						<Button
							variant="ghost"
							size="icon"
							className="lg:hidden text-white hover:bg-white/20 flex-shrink-0"
							onClick={() => setSidebarOpen(false)}
						>
							<X className="h-5 w-5" />
						</Button>
					</div>

					{/* Navigation */}
					<nav className="flex-1 px-2 py-6 space-y-1 overflow-y-auto overflow-x-hidden">
						{navigation
							.filter((item) => {
								// Hide admin-only items if user is not an Admin
								if (item.adminOnly) {
									return adminUser?.role === 'Admin';
								}
								return true;
							})
							.map((item) => {
								const localizedHref = `/${currentLanguage}${item.href}`;
								const isActive = pathname === localizedHref || pathname?.startsWith(localizedHref + "/");
								return (
									<LocaleLink
										key={item.name}
										href={item.href}
										onClick={() => setSidebarOpen(false)}
										className={cn(
											"flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative overflow-hidden",
											isActive
												? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
												: "text-slate-200 hover:bg-slate-800 hover:text-white"
										)}
									>
										<item.icon className={cn(
											"h-5 w-5 flex-shrink-0 transition-transform group-hover:scale-110",
											isActive ? "text-white" : "text-slate-300"
										)} />
										<motion.span
											initial={false}
											animate={{ 
												opacity: (isExpanded || isPinned) ? 1 : 0,
												width: (isExpanded || isPinned) ? "auto" : 0
											}}
											transition={{ 
												duration: 0.15,
												ease: "easeOut"
											}}
											className="whitespace-nowrap overflow-hidden"
										>
											{item.name}
										</motion.span>
										
										{/* Tooltip for collapsed state */}
										{!isExpanded && !isPinned && (
											<div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
												{item.name}
											</div>
										)}
									</LocaleLink>
								);
							})}
					</nav>

					{/* Footer */}
					<div className="p-3 border-t border-slate-800 bg-slate-950">
						<div className="flex items-center gap-3 px-2 py-2 overflow-hidden">
							<Avatar className="h-9 w-9 ring-2 ring-emerald-500/30 flex-shrink-0">
								<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-xs">
									{adminUser ? adminUser.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AD'}
								</AvatarFallback>
							</Avatar>
							<motion.div
								initial={false}
								animate={{ 
									opacity: (isExpanded || isPinned) ? 1 : 0,
									width: (isExpanded || isPinned) ? "auto" : 0
								}}
								transition={{ 
									duration: 0.15,
									ease: "easeOut"
								}}
								className="flex-1 min-w-0 overflow-hidden"
							>
								<p className="text-xs font-semibold truncate text-white">
									{adminUser?.full_name || 'Admin User'}
								</p>
								<p className="text-[10px] text-slate-400 truncate">
									{adminUser?.email || 'admin@example.com'}
								</p>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.aside>

			{/* Main content */}
			<motion.div 
				initial={false}
				animate={{ 
					paddingLeft: (isExpanded || isPinned) ? "256px" : "64px" 
				}}
				transition={{ 
					duration: 0.25, 
					ease: [0.4, 0, 0.2, 1],
					type: "tween"
				}}
				className="lg:pl-16 will-change-[padding]"
			>
				{/* Header */}
				<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 px-4 lg:px-6 shadow-sm">
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
							className="hover:bg-slate-100 dark:hover:bg-slate-800"
							onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						>
							<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>

						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800">
									<Avatar className="h-8 w-8 ring-2 ring-emerald-500/20">
										<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold">
											{adminUser ? adminUser.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AD'}
										</AvatarFallback>
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
			</motion.div>
		</div>
	);
}


"use client";

import { useState, useEffect, useRef } from "react";
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
	ShieldCheck,
	Map,
	Heart,
	User,
	Briefcase,
	LayoutGrid
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
	DropdownMenu, 
	DropdownMenuContent, 
	DropdownMenuItem, 
	DropdownMenuTrigger,
	DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { FavoritesDropdown } from "@/components/FavoritesDropdown";
import { getPropertiesByIds } from "@/lib/favorites-helper";
import type { Property } from "@/components/PropertyCard";

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
	
	// New state for navbar features
	const { t } = useTranslation();
	const { getFavorites } = useFavoritesContext();
	const favoriteIds = getFavorites();
	const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
	const [favoritesDropdownOpen, setFavoritesDropdownOpen] = useState(false);
	const [userDropdownOpen, setUserDropdownOpen] = useState(false);
	const favoritesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const userTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Load admin user info and restore admin theme
	useEffect(() => {
		const userJson = localStorage.getItem("admin-user");
		if (userJson) {
			try {
				setAdminUser(JSON.parse(userJson));
			} catch (e) {
				console.error('Failed to parse admin user:', e);
			}
		}
		
		// Restore admin theme preference when entering admin panel
		const adminTheme = localStorage.getItem("admin-theme");
		if (adminTheme === "dark" || adminTheme === "light") {
			console.log("🎨 Restoring admin theme:", adminTheme);
			setTheme(adminTheme);
		}
	}, [setTheme]);

	// Load favorite properties
	useEffect(() => {
		const loadFavorites = async () => {
			const properties = await getPropertiesByIds(favoriteIds);
			setFavoriteProperties(properties);
		};
		loadFavorites();
	}, [favoriteIds]);

	const handleLogout = () => {
		// Save admin theme before logout
		const currentTheme = theme;
		localStorage.setItem("admin-theme", currentTheme || "light");
		
		localStorage.removeItem("admin-authenticated");
		localStorage.removeItem("admin-user");
		
		// Force light theme after logout
		setTheme("light");
		
		router.push(`/${currentLanguage}/admin/login`);
	};
	
	// Handle theme toggle for admin panel
	const handleAdminThemeToggle = () => {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		// Save admin theme preference
		localStorage.setItem("admin-theme", newTheme);
		console.log("🎨 Admin theme saved:", newTheme);
	};

	const togglePin = () => {
		setIsPinned(!isPinned);
		if (!isPinned) {
			setIsExpanded(true);
		}
	};

	// Language switcher for admin panel (English & Portuguese only)
	const AdminLanguageSwitcher = () => {
		const { currentLanguage, setLanguage, languages } = useLanguage();
		
		// Filter to only show English and Portuguese
		const filteredLanguages = languages.filter(lang => 
			lang.code === 'en' || lang.code === 'pt'
		);
		
		const currentLang = filteredLanguages.find((l) => l.code === currentLanguage);

		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild suppressHydrationWarning>
					<Button variant="ghost" size="sm" className="px-2" suppressHydrationWarning>
						<span className="text-2xl hover:scale-110 transition-transform">
							{currentLang?.flag_emoji || "🌐"}
						</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-48" suppressHydrationWarning>
					{filteredLanguages.map((language) => (
						<DropdownMenuItem
							key={language.code}
							onClick={() => setLanguage(language.code as any)}
							className={`flex items-center gap-3 ${
								currentLanguage === language.code ? "bg-accent" : ""
							}`}
						>
							<span className="text-xl">{language.flag_emoji}</span>
							<span className="flex-1">{language.name}</span>
						{currentLanguage === language.code && (
							<span className="text-blue-600">✓</span>
						)}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		);
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
					(isExpanded || isPinned) && "shadow-2xl shadow-blue-500/10 transition-shadow duration-300",
					sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				)}
			>
				<div className="flex h-full flex-col">
					{/* Logo */}
					<div className="flex h-16 items-center justify-between px-3 border-b border-slate-800 bg-gradient-to-r from-blue-600 to-cyan-600">
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
												? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30"
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
							<Avatar className="h-9 w-9 ring-2 ring-blue-500/30 flex-shrink-0">
								<AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-xs">
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
				{/* Header - Complete Navigation Bar */}
				<header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur" suppressHydrationWarning>
					<div className="mx-auto flex h-14 items-center justify-between px-4 lg:px-6">
						{/* Mobile Menu Button (Left) */}
						<Button
							variant="ghost"
							size="icon"
							className="lg:hidden"
							onClick={() => setSidebarOpen(true)}
						>
							<Menu className="h-5 w-5" />
						</Button>

						{/* 1. Brand Logo */}
						<LocaleLink href="/" className="flex items-center gap-2 font-semibold">
							<Home className="h-5 w-5" />
							<span>{t("navbar.brand")}</span>
						</LocaleLink>

						{/* 2. Main Navigation (Buy, Rent, Sell) */}
						<nav className="hidden items-center gap-6 md:flex">
							<LocaleLink href="/buy" className="text-sm text-muted-foreground hover:text-foreground">
								{t("home.nav.buy")}
							</LocaleLink>
							<LocaleLink href="/buy?for=rent" className="text-sm text-muted-foreground hover:text-foreground">
								{t("home.nav.rent")}
							</LocaleLink>
							<LocaleLink href="/sell" className="text-sm text-muted-foreground hover:text-foreground">
								{t("home.nav.sell")}
							</LocaleLink>
						</nav>

						{/* Right Side Actions */}
						<div className="flex items-center gap-2">
							{/* 3. Explore Button */}
							<LocaleLink href="/buy">
								<Button variant="secondary" size="sm" className="gap-2">
									<Map className="h-4 w-4" /> {t("navbar.explore")}
								</Button>
							</LocaleLink>

							{/* 4. Admin User Dropdown */}
							<DropdownMenu open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
								<DropdownMenuTrigger asChild suppressHydrationWarning>
									<Button 
										variant="ghost" 
										size="sm" 
										className="gap-2" 
										suppressHydrationWarning
										onMouseEnter={() => {
											if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
											setUserDropdownOpen(true);
										}}
										onMouseLeave={() => {
											userTimeoutRef.current = setTimeout(() => setUserDropdownOpen(false), 100);
										}}
									>
										<Avatar className="h-7 w-7 ring-2 ring-blue-500/20">
											<AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-xs">
												{adminUser ? adminUser.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'AD'}
											</AvatarFallback>
										</Avatar>
										<span className="hidden md:inline truncate max-w-[150px]">
											{adminUser?.email || 'Admin'}
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent 
									align="end" 
									className="w-64"
									sideOffset={2}
									onMouseEnter={() => {
										if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current);
										setUserDropdownOpen(true);
									}}
									onMouseLeave={() => {
										userTimeoutRef.current = setTimeout(() => setUserDropdownOpen(false), 100);
									}}
								>
									{/* User Email and Name */}
									<div className="px-2 py-1.5 text-sm">
										<p className="font-medium truncate">{adminUser?.full_name || 'Admin User'}</p>
										<p className="text-xs text-muted-foreground truncate">{adminUser?.email || 'admin@example.com'}</p>
									</div>
									<DropdownMenuSeparator />
									
									{/* Admin Dashboard Link */}
									<LocaleLink href="/admin/dashboard" className="block">
										<DropdownMenuItem className="cursor-pointer">
											<LayoutGrid className="mr-2 h-4 w-4 text-purple-600" />
											Admin Dashboard
										</DropdownMenuItem>
									</LocaleLink>

									{/* User Dashboard Link */}
									<LocaleLink href="/user-dashboard" className="block">
										<DropdownMenuItem className="cursor-pointer">
											<Home className="mr-2 h-4 w-4 text-blue-600" />
											{t("navbar.dashboard")}
										</DropdownMenuItem>
									</LocaleLink>

									{/* Agent Dashboard Link */}
									<LocaleLink href="/agent-dashboard" className="block">
										<DropdownMenuItem className="cursor-pointer">
											<Briefcase className="mr-2 h-4 w-4 text-cyan-600" />
											Agent Dashboard
										</DropdownMenuItem>
									</LocaleLink>

									<DropdownMenuSeparator />

									{/* Log Out */}
									<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
										<LogOut className="mr-2 h-4 w-4" />
										Log out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>

							{/* 5. Favourites */}
							<DropdownMenu open={favoritesDropdownOpen} onOpenChange={setFavoritesDropdownOpen}>
								<DropdownMenuTrigger asChild suppressHydrationWarning>
									<Button 
										variant="ghost" 
										size="sm" 
										className="gap-2 relative" 
										suppressHydrationWarning
										onMouseEnter={() => {
											if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
											setFavoritesDropdownOpen(true);
										}}
										onMouseLeave={() => {
											favoritesTimeoutRef.current = setTimeout(() => setFavoritesDropdownOpen(false), 100);
										}}
									>
										<Heart className="h-4 w-4" />
										<span className="hidden md:inline">{t("navbar.favorites")}</span>
										{favoriteProperties.length > 0 && (
											<Badge variant="secondary" className="ml-1 px-1.5 py-0 h-5 text-xs">
												{favoriteProperties.length}
											</Badge>
										)}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent 
									align="end" 
									className="p-0"
									sideOffset={2}
									onMouseEnter={() => {
										if (favoritesTimeoutRef.current) clearTimeout(favoritesTimeoutRef.current);
										setFavoritesDropdownOpen(true);
									}}
									onMouseLeave={() => {
										favoritesTimeoutRef.current = setTimeout(() => setFavoritesDropdownOpen(false), 100);
									}}
								>
									<FavoritesDropdown favorites={favoriteProperties} />
								</DropdownMenuContent>
							</DropdownMenu>

							{/* 6. Language Switcher (English & Portuguese Only) */}
							<AdminLanguageSwitcher />

							{/* 7. Dark Mode Toggle (Admin Panel Only) */}
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-slate-100 dark:hover:bg-slate-800"
								onClick={handleAdminThemeToggle}
								title="Toggle dark mode (Admin Panel only)"
							>
								<Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								<span className="sr-only">Toggle theme</span>
							</Button>
						</div>
					</div>
				</header>

				{/* Page content */}
				<main className="p-4 lg:p-6">{children}</main>
			</motion.div>
		</div>
	);
}


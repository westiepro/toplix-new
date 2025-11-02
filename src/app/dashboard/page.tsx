"use client";

import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PropertyCard } from "@/components/PropertyCard";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { getPropertiesByIds } from "@/lib/favorites-helper";
import { Heart, Search, Clock, Settings as SettingsIcon, User, Mail, Bell } from "lucide-react";

export default function DashboardPage() {
	const { user } = useAuth();
	const { getFavorites } = useFavoritesContext();
	const favoriteIds = getFavorites();
	const favoriteProperties = getPropertiesByIds(favoriteIds);

	// Get user initials for avatar
	const getInitials = (email: string | undefined) => {
		if (!email) return "U";
		const parts = email.split("@")[0].split(".");
		if (parts.length > 1) {
			return (parts[0][0] + parts[1][0]).toUpperCase();
		}
		return email.substring(0, 2).toUpperCase();
	};

	const getUserName = (email: string | undefined) => {
		if (!email) return "User";
		const name = email.split("@")[0];
		return name.charAt(0).toUpperCase() + name.slice(1);
	};

	return (
		<main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
			<Navbar />
			
			{/* Header Section */}
			<section className="border-b bg-background/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 py-8">
					<div className="flex items-center gap-6">
						<Avatar className="h-20 w-20 border-4 border-white shadow-lg">
							<AvatarFallback className="text-2xl bg-gradient-to-br from-[#198754] to-[#0d5c37] text-white">
								{getInitials(user?.email)}
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<h1 className="text-3xl font-bold mb-1">Welcome back, {getUserName(user?.email)}</h1>
							<p className="text-muted-foreground">{user?.email || "Manage your favorite properties and saved searches"}</p>
						</div>
						<Button variant="outline" className="gap-2">
							<SettingsIcon className="h-4 w-4" />
							Account Settings
						</Button>
					</div>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-4 py-8">
				<Tabs defaultValue="favorites" className="space-y-6">
					<TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4 h-auto p-1.5 bg-muted/50">
						<TabsTrigger 
							value="favorites" 
							className="gap-2 py-4 px-6 text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-500 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
						>
							<Heart className="h-5 w-5" />
							<span className="hidden sm:inline">Favorites</span>
							{favoriteIds.length > 0 && (
								<Badge variant="secondary" className="ml-1 px-2 py-0.5 h-5 text-xs bg-white text-black">
									{favoriteIds.length}
								</Badge>
							)}
						</TabsTrigger>
						<TabsTrigger 
							value="saved" 
							className="gap-2 py-4 px-6 text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
						>
							<Search className="h-5 w-5" />
							<span className="hidden sm:inline">Saved</span>
						</TabsTrigger>
						<TabsTrigger 
							value="recent" 
							className="gap-2 py-4 px-6 text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
						>
							<Clock className="h-5 w-5" />
							<span className="hidden sm:inline">Recent</span>
						</TabsTrigger>
						<TabsTrigger 
							value="settings" 
							className="gap-2 py-4 px-6 text-base data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-700 data-[state=active]:to-gray-900 data-[state=active]:text-white data-[state=active]:shadow-lg"
						>
							<SettingsIcon className="h-5 w-5" />
							<span className="hidden sm:inline">Settings</span>
						</TabsTrigger>
					</TabsList>

					{/* Favorites Tab */}
					<TabsContent value="favorites" className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-2xl font-semibold">My Favorite Properties</h2>
								<p className="text-sm text-muted-foreground mt-1">
									{favoriteIds.length > 0 
										? `You have ${favoriteIds.length} saved ${favoriteIds.length === 1 ? 'property' : 'properties'}`
										: 'Start saving properties you love'
									}
								</p>
							</div>
						</div>

						{favoriteProperties.length > 0 ? (
							<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
								{favoriteProperties.map((p) => (
									<PropertyCard key={p.id} property={p} />
								))}
							</div>
						) : (
							<Card className="border-dashed">
								<CardContent className="flex flex-col items-center justify-center py-16 text-center">
									<div className="mb-4 p-6 rounded-full bg-gradient-to-br from-[#198754]/10 to-[#0d5c37]/10">
										<Heart className="h-16 w-16 text-[#198754]" />
									</div>
									<h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
									<p className="text-sm text-muted-foreground max-w-md mb-6">
										Start browsing properties and click the heart icon to save your favorites here for easy access.
									</p>
									<Button asChild>
										<a href="/homes">Browse Properties</a>
									</Button>
								</CardContent>
							</Card>
						)}
					</TabsContent>

					{/* Saved Searches Tab */}
					<TabsContent value="saved" className="space-y-4">
						<div>
							<h2 className="text-2xl font-semibold">Saved Searches</h2>
							<p className="text-sm text-muted-foreground mt-1">Your custom search filters</p>
						</div>
						<Card className="border-dashed">
							<CardContent className="flex flex-col items-center justify-center py-16 text-center">
								<div className="mb-4 p-6 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-700/10">
									<Search className="h-16 w-16 text-blue-600" />
								</div>
								<h3 className="text-xl font-semibold mb-2">No saved searches</h3>
								<p className="text-sm text-muted-foreground max-w-md mb-6">
									Save your search criteria to quickly find properties that match your preferences.
								</p>
								<Button asChild variant="outline">
									<a href="/homes">Create a Search</a>
								</Button>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Recently Viewed Tab */}
					<TabsContent value="recent" className="space-y-4">
						<div>
							<h2 className="text-2xl font-semibold">Recently Viewed</h2>
							<p className="text-sm text-muted-foreground mt-1">Properties you've looked at</p>
						</div>
						<Card className="border-dashed">
							<CardContent className="flex flex-col items-center justify-center py-16 text-center">
								<div className="mb-4 p-6 rounded-full bg-gradient-to-br from-purple-500/10 to-purple-700/10">
									<Clock className="h-16 w-16 text-purple-600" />
								</div>
								<h3 className="text-xl font-semibold mb-2">No recent views</h3>
								<p className="text-sm text-muted-foreground max-w-md mb-6">
									Properties you view will appear here for quick access.
								</p>
								<Button asChild variant="outline">
									<a href="/homes">Explore Properties</a>
								</Button>
							</CardContent>
						</Card>
					</TabsContent>

					{/* Settings Tab */}
					<TabsContent value="settings" className="space-y-4">
						<div>
							<h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
						</div>

						<div className="grid gap-6 md:grid-cols-2">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<User className="h-5 w-5" />
										Personal Information
									</CardTitle>
									<CardDescription>Update your profile details</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<label className="text-sm font-medium">Full Name</label>
										<Input defaultValue={getUserName(user?.email)} />
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Email</label>
										<Input type="email" defaultValue={user?.email || ""} disabled />
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Phone</label>
										<Input type="tel" placeholder="Add your phone number" />
									</div>
									<Button className="w-full">Save Changes</Button>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Bell className="h-5 w-5" />
										Notifications
									</CardTitle>
									<CardDescription>Manage your notification preferences</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-sm">Email Notifications</p>
											<p className="text-xs text-muted-foreground">Receive updates about new properties</p>
										</div>
										<input type="checkbox" defaultChecked className="h-4 w-4" />
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-sm">Price Alerts</p>
											<p className="text-xs text-muted-foreground">Get notified of price changes</p>
										</div>
										<input type="checkbox" defaultChecked className="h-4 w-4" />
									</div>
									<div className="flex items-center justify-between">
										<div>
											<p className="font-medium text-sm">New Listings</p>
											<p className="text-xs text-muted-foreground">Alert me about new properties</p>
										</div>
										<input type="checkbox" className="h-4 w-4" />
									</div>
									<Button variant="outline" className="w-full">Update Preferences</Button>
								</CardContent>
							</Card>

							<Card className="md:col-span-2">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Mail className="h-5 w-5" />
										Account Security
									</CardTitle>
									<CardDescription>Manage your password and security settings</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid gap-4 md:grid-cols-2">
										<div className="space-y-2">
											<label className="text-sm font-medium">Current Password</label>
											<Input type="password" placeholder="••••••••" />
										</div>
										<div className="space-y-2">
											<label className="text-sm font-medium">New Password</label>
											<Input type="password" placeholder="••••••••" />
										</div>
									</div>
									<Button>Update Password</Button>
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</section>
		</main>
	);
}



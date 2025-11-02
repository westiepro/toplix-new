"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PropertyCard } from "@/components/PropertyCard";
import { useFavoritesContext } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { getPropertiesByIds } from "@/lib/favorites-helper";
import { Heart, Search, Clock, Home as HomeIcon, Settings as SettingsIcon, LogOut, Mail, Bell } from "lucide-react";

type TabType = "favourites" | "saved" | "recent" | "advertise" | "settings";

export default function DashboardPage() {
	const { user, signOut } = useAuth();
	const { getFavorites } = useFavoritesContext();
	const favoriteIds = getFavorites();
	const favoriteProperties = getPropertiesByIds(favoriteIds);
	const [activeTab, setActiveTab] = useState<TabType>("favourites");

	const getUserName = (email: string | undefined) => {
		if (!email) return "User";
		const name = email.split("@")[0];
		return name.charAt(0).toUpperCase() + name.slice(1).replace(/[._]/g, " ");
	};

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<main className="min-h-screen bg-gray-50">
			<Navbar />
			
			{/* Gradient Header */}
			<section className="mx-auto max-w-7xl px-4 py-8">
				<div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl shadow-lg p-8 mb-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-4xl font-bold text-white mb-2">My Dashboard</h1>
							<p className="text-white/90 text-lg">Welcome back, {getUserName(user?.email)}</p>
						</div>
						<Button 
							onClick={handleSignOut}
							className="bg-white/20 hover:bg-white/30 text-white border-2 border-white backdrop-blur-sm gap-2"
						>
							<LogOut className="h-4 w-4" />
							Sign Out
						</Button>
					</div>
				</div>

				{/* Tabs Navigation */}
				<div className="bg-white rounded-2xl shadow-md p-2 mb-8 flex gap-2 flex-wrap">
					<button
						onClick={() => setActiveTab("favourites")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "favourites"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<Heart className={`h-5 w-5 ${activeTab === "favourites" ? "fill-pink-200 text-pink-200" : "text-pink-400"}`} />
						<span className="font-medium">My Favourites</span>
					</button>
					<button
						onClick={() => setActiveTab("saved")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "saved"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<Search className={`h-5 w-5 ${activeTab === "saved" ? "text-white" : "text-blue-400"}`} />
						<span className="font-medium">Saved Searches</span>
					</button>
					<button
						onClick={() => setActiveTab("recent")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "recent"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<Clock className={`h-5 w-5 ${activeTab === "recent" ? "text-white" : "text-purple-400"}`} />
						<span className="font-medium">Recently Viewed</span>
					</button>
					<button
						onClick={() => setActiveTab("advertise")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "advertise"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<HomeIcon className={`h-5 w-5 ${activeTab === "advertise" ? "text-white" : "text-orange-400"}`} />
						<span className="font-medium">Advertise</span>
					</button>
					<button
						onClick={() => setActiveTab("settings")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "settings"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<SettingsIcon className={`h-5 w-5 ${activeTab === "settings" ? "text-white" : "text-yellow-500"}`} />
						<span className="font-medium">Settings</span>
					</button>
				</div>

				{/* Tab Content */}
				<div>
					{/* My Favourites Tab */}
					{activeTab === "favourites" && (
						<div className="space-y-6">
							<div>
								<h2 className="text-3xl font-bold text-blue-600 mb-1">My Favourites</h2>
								<p className="text-gray-600">Properties you love</p>
							</div>

							{favoriteProperties.length > 0 ? (
								<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
									{favoriteProperties.map((p) => (
										<PropertyCard key={p.id} property={p} />
									))}
								</div>
							) : (
								<Card className="border-2 border-dashed border-gray-300">
									<CardContent className="flex flex-col items-center justify-center py-16 text-center">
										<div className="mb-4 p-6 rounded-full bg-pink-100">
											<Heart className="h-16 w-16 text-pink-500" />
										</div>
										<h3 className="text-xl font-semibold mb-2">No favourites yet</h3>
										<p className="text-sm text-muted-foreground max-w-md mb-6">
											Start browsing properties and click the heart icon to save your favourites here for easy access.
										</p>
										<Button asChild className="bg-blue-600 hover:bg-blue-700">
											<a href="/homes">Browse Properties</a>
										</Button>
									</CardContent>
								</Card>
							)}
						</div>
					)}

					{/* Saved Searches Tab */}
					{activeTab === "saved" && (
						<div className="space-y-6">
							<div>
								<h2 className="text-3xl font-bold text-blue-600 mb-1">Saved Searches</h2>
								<p className="text-gray-600">Your custom search filters</p>
							</div>
							<Card className="border-2 border-dashed border-gray-300">
								<CardContent className="flex flex-col items-center justify-center py-16 text-center">
									<div className="mb-4 p-6 rounded-full bg-blue-100">
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
						</div>
					)}

					{/* Recently Viewed Tab */}
					{activeTab === "recent" && (
						<div className="space-y-6">
							<div>
								<h2 className="text-3xl font-bold text-blue-600 mb-1">Recently Viewed</h2>
								<p className="text-gray-600">Properties you've looked at</p>
							</div>
							<Card className="border-2 border-dashed border-gray-300">
								<CardContent className="flex flex-col items-center justify-center py-16 text-center">
									<div className="mb-4 p-6 rounded-full bg-purple-100">
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
						</div>
					)}

					{/* Advertise Tab */}
					{activeTab === "advertise" && (
						<div className="space-y-6">
							<div>
								<h2 className="text-3xl font-bold text-blue-600 mb-1">Advertise Your Property</h2>
								<p className="text-gray-600">List your property with us</p>
							</div>
							<Card>
								<CardHeader>
									<CardTitle>Ready to sell or rent?</CardTitle>
									<CardDescription>Get your property in front of thousands of buyers</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-6">
										Contact our team to learn more about advertising options.
									</p>
									<Button className="bg-blue-600 hover:bg-blue-700">Contact Us</Button>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Settings Tab */}
					{activeTab === "settings" && (
						<div className="space-y-6">
							<div>
								<h2 className="text-3xl font-bold text-blue-600 mb-1">Account Settings</h2>
								<p className="text-gray-600">Manage your account</p>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Mail className="h-5 w-5" />
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
										<Button className="w-full bg-blue-600 hover:bg-blue-700">Save Changes</Button>
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
							</div>
						</div>
					)}
				</div>
			</section>
		</main>
	);
} 

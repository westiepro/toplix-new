"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { 
	LineChart, 
	Line, 
	BarChart, 
	Bar, 
	PieChart, 
	Pie, 
	Cell, 
	XAxis, 
	YAxis, 
	CartesianGrid, 
	Tooltip, 
	Legend, 
	ResponsiveContainer 
} from "recharts";
import { Download, Eye, TrendingUp, Home, Users, Building2, UserCircle, Radio, Globe, BarChart3 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data
const visitorsData = [
	{ date: "Jan 1", visitors: 1200, pageViews: 3400 },
	{ date: "Jan 8", visitors: 1900, pageViews: 5100 },
	{ date: "Jan 15", visitors: 2800, pageViews: 7200 },
	{ date: "Jan 22", visitors: 3200, pageViews: 8900 },
	{ date: "Jan 29", visitors: 4100, pageViews: 11200 },
];

const trafficSources = [
	{ name: "Organic", value: 45, color: "#198754" },
	{ name: "Direct", value: 25, color: "#0d5c37" },
	{ name: "Social", value: 20, color: "#2d8659" },
	{ name: "Referral", value: 10, color: "#4a9d6e" },
];

const propertiesByCity = [
	{ city: "Lagos", count: 15 },
	{ city: "Faro", count: 12 },
	{ city: "Albufeira", count: 10 },
	{ city: "Portimão", count: 8 },
	{ city: "Tavira", count: 6 },
];

const priceRanges = [
	{ range: "$0-300K", count: 8 },
	{ range: "$300K-500K", count: 12 },
	{ range: "$500K-750K", count: 15 },
	{ range: "$750K-1M", count: 10 },
	{ range: "$1M+", count: 5 },
];

const topProperties = [
	{ name: "Rua da Praia 45", city: "Lagos", price: 350000, views: 1240 },
	{ name: "Marina de Vilamoura", city: "Vilamoura", price: 890000, views: 980 },
	{ name: "Praia da Falésia", city: "Albufeira", price: 620000, views: 876 },
	{ name: "Avenida da República 120", city: "Faro", price: 485000, views: 754 },
	{ name: "Praia da Rocha", city: "Portimão", price: 745000, views: 689 },
];

const agentPerformance = [
	{ name: "John Doe", listings: 12, inquiries: 45, deals: 8, conversion: 17.8 },
	{ name: "Jane Smith", listings: 15, inquiries: 52, deals: 12, conversion: 23.1 },
	{ name: "Mike Johnson", listings: 8, inquiries: 28, deals: 6, conversion: 21.4 },
	{ name: "Sarah Williams", listings: 10, inquiries: 38, deals: 9, conversion: 23.7 },
];

export default function AdminDashboard() {
	const [dateRange, setDateRange] = useState("all");
	const [liveViewers, setLiveViewers] = useState(0);
	const [isPulsing, setIsPulsing] = useState(true);
	const [totalUsers, setTotalUsers] = useState(0);
	const [loadingUsers, setLoadingUsers] = useState(true);
	const [totalVisitors, setTotalVisitors] = useState(0);
	const [totalPageViews, setTotalPageViews] = useState(0);
	const [visitorsChange, setVisitorsChange] = useState(0);
	const [pageViewsChange, setPageViewsChange] = useState(0);
	const [loadingStats, setLoadingStats] = useState(true);
	const [lastRegisteredUsers, setLastRegisteredUsers] = useState<Array<{
		id: string;
		email: string;
		createdAt: string;
		country?: string;
	}>>([]);
	const [loadingLastUsers, setLoadingLastUsers] = useState(false);
	const [adminUser, setAdminUser] = useState<any>(null);

	// Fetch admin user info
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

	// Fetch live viewer count (registration is handled by LiveViewerTracker component)
	useEffect(() => {
		const fetchLiveViewers = async () => {
			try {
				const response = await fetch('/api/analytics/live-viewers');
				const data = await response.json();
				setLiveViewers(data.count || 0);
			} catch (error) {
				console.error('Error fetching live viewers:', error);
			}
		};

		// Fetch immediately and then every 5 seconds
		fetchLiveViewers();
		const viewerCountInterval = setInterval(fetchLiveViewers, 5000);

		// Cleanup on unmount
		return () => {
			clearInterval(viewerCountInterval);
		};
	}, []);

	// Fetch last registered users
	useEffect(() => {
		const fetchLastRegisteredUsers = async () => {
			setLoadingLastUsers(true);
			try {
				const response = await fetch('/api/users');
				const data = await response.json();
				if (data.users) {
					// Filter out admin user and sort by creation date (most recent first)
					const filteredUsers = data.users
						.filter((user: any) => user.email !== 'admin@toplix.com')
						.sort((a: any, b: any) => {
							const dateA = new Date(a.createdAt).getTime();
							const dateB = new Date(b.createdAt).getTime();
							return dateB - dateA; // Most recent first
						})
						.slice(0, 10) // Get last 10 registered users
						.map((user: any) => {
							// Try to extract country from metadata (stored during signup)
							// The API returns metadata and appMetadata directly
							let country = user.metadata?.country || 
										user.appMetadata?.country ||
										undefined;
							
							// Debug logging - always log in production too for debugging
							console.log('👤 User:', user.email, {
								countryFromMetadata: country,
								metadata: user.metadata,
								appMetadata: user.appMetadata,
								hasMetadata: !!user.metadata,
								hasAppMetadata: !!user.appMetadata,
								metadataKeys: user.metadata ? Object.keys(user.metadata) : [],
								appMetadataKeys: user.appMetadata ? Object.keys(user.appMetadata) : []
							});
							
							// If no country in metadata, try to infer from email domain
							if (!country && user.email) {
								const emailDomain = user.email.split('@')[1]?.toLowerCase();
								
								// More comprehensive domain to country mapping
								const domainToCountry: Record<string, string> = {
									'co.uk': 'GB',
									'uk': 'GB',
									'pt': 'PT',
									'es': 'ES',
									'fr': 'FR',
									'de': 'DE',
									'it': 'IT',
									'nl': 'NL',
									'be': 'BE',
									'se': 'SE',
									'no': 'NO',
									'dk': 'DK',
									'fi': 'FI',
									'ie': 'IE',
									'at': 'AT',
									'ch': 'CH',
									'pl': 'PL',
									'cz': 'CZ',
									'com.au': 'AU',
									'com.br': 'BR',
									'com.mx': 'MX',
									'co.za': 'ZA',
									'co.nz': 'NZ',
								};
								
								// Check if domain ends with a country code TLD
								if (emailDomain) {
									// First check for specific country TLDs
									for (const [domain, code] of Object.entries(domainToCountry)) {
										if (emailDomain.endsWith(`.${domain}`) || emailDomain === domain) {
											country = code;
											if (process.env.NODE_ENV === 'development') {
												console.log('Detected country from domain:', emailDomain, '->', country);
											}
											break;
										}
									}
									
									// If still no country, check for common patterns
									if (!country) {
										// Extract TLD (last part after last dot)
										const parts = emailDomain.split('.');
										const tld = parts[parts.length - 1];
										
										// Check if TLD is a country code
										if (tld && tld.length === 2 && domainToCountry[tld]) {
											country = domainToCountry[tld];
											if (process.env.NODE_ENV === 'development') {
												console.log('Detected country from TLD:', tld, '->', country);
											}
										}
									}
								}
							}
							
							// Final debug
							if (process.env.NODE_ENV === 'development') {
								console.log('Final country for', user.email, ':', country);
							}
							
							return {
								id: user.id,
								email: user.email,
								createdAt: user.createdAt,
								country: country,
							};
						});
					
					setLastRegisteredUsers(filteredUsers);
				}
			} catch (error) {
				console.error('Error fetching last registered users:', error);
			} finally {
				setLoadingLastUsers(false);
			}
		};

		fetchLastRegisteredUsers();
		// Refresh every 30 seconds
		const interval = setInterval(fetchLastRegisteredUsers, 30000);
		return () => clearInterval(interval);
	}, []);

	// Pulse animation for live viewer number (toggle between full and light color)
	useEffect(() => {
		const pulseInterval = setInterval(() => {
			setIsPulsing(prev => !prev);
		}, 1000); // Toggle every second

		return () => clearInterval(pulseInterval);
	}, []);

	// Fetch total users from database
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setLoadingUsers(true);
				const response = await fetch('/api/users');
				if (!response.ok) {
					throw new Error('Failed to fetch users');
				}
				const data = await response.json();
				// Filter out admin@toplix.com and count
				const filteredUsers = (data.users || []).filter(
					(user: { email: string | null }) => 
						user.email?.toLowerCase() !== 'admin@toplix.com'
				);
				setTotalUsers(filteredUsers.length);
			} catch (error) {
				console.error('Error fetching users:', error);
			} finally {
				setLoadingUsers(false);
			}
		};

		fetchUsers();
	}, []);

	// Fetch visitor and page view statistics
	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoadingStats(true);
				// Map dateRange to API period parameter
				const periodMap: Record<string, string> = {
					'all': 'all',
					'7': '7d',
					'30': '30d',
					'90': '90d',
				};
				const period = periodMap[dateRange] || 'all';
				
				const response = await fetch(`/api/analytics/stats?period=${period}`);
				if (!response.ok) {
					throw new Error('Failed to fetch stats');
				}
				const data = await response.json();
				setTotalVisitors(data.visitors || 0);
				setTotalPageViews(data.pageViews || 0);
				setVisitorsChange(data.visitorsChange || 0);
				setPageViewsChange(data.pageViewsChange || 0);
			} catch (error) {
				console.error('Error fetching stats:', error);
			} finally {
				setLoadingStats(false);
			}
		};

		fetchStats();
	}, [dateRange]);

	const stats = useMemo(() => {
		const avgPrice = (350000 + 890000 + 620000 + 485000 + 745000) / 5;
		const avgViews = (1240 + 980 + 876 + 754 + 689) / 5;

		return {
			totalVisitors,
			totalPageViews,
			totalProperties: 60,
			totalCompanies: 12,
			totalUsers,
			avgPrice,
			avgViews: Math.round(avgViews),
		};
	}, [totalUsers, totalVisitors, totalPageViews]);

	return (
		<div className="space-y-6">
			{/* Simple Dashboard Header */}
			<div className="mb-6">
				<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
					Dashboard
				</h1>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					Overview of your property management system
				</p>
			</div>

			{/* Stats Grid - Simple white cards like image */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Views</CardTitle>
						<div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded">
							<Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-2">
							<span className={`inline-block w-2 h-2 rounded-full ${isPulsing ? 'bg-green-500' : 'bg-green-300'}`}></span>
							<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
								{liveViewers}
							</div>
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							active users on site
						</p>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Companies</CardTitle>
						<div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded">
							<Building2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
							{stats.totalCompanies}
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							real estate company
						</p>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Properties</CardTitle>
						<div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded">
							<Home className="h-4 w-4 text-gray-600 dark:text-gray-400" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
							{stats.totalProperties}
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							properties in the system
						</p>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Listings</CardTitle>
						<div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded">
							<BarChart3 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
							{stats.totalProperties}
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							currently available
						</p>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Users</CardTitle>
						<div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded">
							<Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
							{loadingUsers ? '...' : stats.totalUsers}
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							registered user
						</p>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Sale Price</CardTitle>
						<div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded">
							<span className="text-gray-600 dark:text-gray-400 text-sm font-semibold">€</span>
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
							€{Math.round(stats.avgPrice).toLocaleString()}
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							for properties for sale
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Charts Section - Simple white cards like image */}
			<div className="grid gap-4 md:grid-cols-2 mt-6">
				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
					<CardHeader>
						<CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">Properties by Type</CardTitle>
						<CardDescription className="text-xs text-gray-500 dark:text-gray-400">Distribution of property types</CardDescription>
					</CardHeader>
					<CardContent className="pt-6">
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
									data={[{ name: "Apartment", value: 100 }]}
									cx="50%"
									cy="50%"
									outerRadius={100}
									fill="#3b82f6"
									dataKey="value"
								>
									<Cell fill="#3b82f6" />
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
					<CardHeader>
						<CardTitle className="text-base font-semibold text-gray-900 dark:text-gray-100">Properties by City</CardTitle>
						<CardDescription className="text-xs text-gray-500 dark:text-gray-400">Top 5 cities with most properties</CardDescription>
					</CardHeader>
					<CardContent className="pt-6">
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={propertiesByCity}>
								<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
								<XAxis dataKey="city" stroke="#6b7280" />
								<YAxis stroke="#6b7280" />
								<Tooltip />
								<Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}


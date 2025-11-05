"use client";

import { useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
	ResponsiveContainer,
	RadarChart,
	Radar,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
} from "recharts";
import {
	Download,
	Eye,
	TrendingUp,
	Home,
	Users,
	MousePointer,
	Clock,
	Activity,
	Globe,
	Monitor,
	Search,
	Heart,
	MapPin,
} from "lucide-react";

type Period = '7d' | '30d' | '90d';

export default function AnalyticsPage() {
	const [period, setPeriod] = useState<Period>('30d');
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState('traffic');

	// State for different data types
	const [plausibleData, setPlausibleData] = useState<any>(null);
	const [propertyData, setPropertyData] = useState<any>(null);
	const [realtimeData, setRealtimeData] = useState<any>(null);
	const [eventsData, setEventsData] = useState<any>(null);

	// Fetch Plausible analytics data
	useEffect(() => {
		const fetchPlausibleData = async () => {
			try {
				const response = await fetch(`/api/analytics/plausible?period=${period}`);
				if (response.ok) {
					const data = await response.json();
					setPlausibleData(data);
				}
			} catch (error) {
				console.error('Failed to fetch Plausible data:', error);
			}
		};

		fetchPlausibleData();
	}, [period]);

	// Fetch property analytics data
	useEffect(() => {
		const fetchPropertyData = async () => {
			try {
				const response = await fetch(`/api/analytics/properties?period=${period.replace('d', '')}`);
				if (response.ok) {
					const data = await response.json();
					setPropertyData(data);
				}
			} catch (error) {
				console.error('Failed to fetch property data:', error);
			}
		};

		fetchPropertyData();
	}, [period]);

	// Fetch custom events data
	useEffect(() => {
		const fetchEventsData = async () => {
			try {
				const response = await fetch(`/api/analytics/events?period=${period}`);
				if (response.ok) {
					const data = await response.json();
					setEventsData(data);
				}
			} catch (error) {
				console.error('Failed to fetch events data:', error);
			}
		};

		fetchEventsData();
	}, [period]);

	// Fetch realtime data periodically
	useEffect(() => {
		const fetchRealtimeData = async () => {
			try {
				const response = await fetch('/api/analytics/realtime');
				if (response.ok) {
					const data = await response.json();
					setRealtimeData(data);
				}
			} catch (error) {
				console.error('Failed to fetch realtime data:', error);
			}
		};

		fetchRealtimeData();
		const interval = setInterval(fetchRealtimeData, 10000); // Update every 10 seconds

		return () => clearInterval(interval);
	}, []);

	// Set loading state
	useEffect(() => {
		if (plausibleData && propertyData) {
			setLoading(false);
		}
	}, [plausibleData, propertyData]);

	const formatNumber = (num: number) => {
		if (!num) return '0';
		return num.toLocaleString();
	};

	const formatDuration = (seconds: number) => {
		if (!seconds) return '0s';
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
	};

	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Analytics" }]} />

			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Advanced Analytics</h1>
					<p className="text-muted-foreground">Comprehensive insights and metrics</p>
				</div>
				<div className="flex items-center gap-2">
					<Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Date range" />
					</SelectTrigger>
					<SelectContent>
							<SelectItem value="7d">Last 7 days</SelectItem>
							<SelectItem value="30d">Last 30 days</SelectItem>
							<SelectItem value="90d">Last 90 days</SelectItem>
					</SelectContent>
				</Select>
					<Button variant="outline" size="sm">
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
				</div>
			</div>

			{/* Enhanced Tabs - Moved to Top */}
			<Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
				<TabsList className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-2 h-auto grid w-full grid-cols-5 gap-2 rounded-xl border-2 border-slate-200 dark:border-slate-800 shadow-lg">
					<TabsTrigger 
						value="traffic" 
						className="h-16 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-500/30 data-[state=active]:scale-[1.02] transition-all duration-200 rounded-lg font-semibold text-base hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<div className="flex flex-col items-center gap-1">
							<Activity className="h-5 w-5" />
							<span>Traffic</span>
						</div>
					</TabsTrigger>
					<TabsTrigger 
						value="properties" 
						className="h-16 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-purple-500/30 data-[state=active]:scale-[1.02] transition-all duration-200 rounded-lg font-semibold text-base hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<div className="flex flex-col items-center gap-1">
							<Home className="h-5 w-5" />
							<span>Properties</span>
						</div>
					</TabsTrigger>
					<TabsTrigger 
						value="behavior" 
						className="h-16 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-green-500/30 data-[state=active]:scale-[1.02] transition-all duration-200 rounded-lg font-semibold text-base hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<div className="flex flex-col items-center gap-1">
							<MousePointer className="h-5 w-5" />
							<span>Behavior</span>
						</div>
					</TabsTrigger>
					<TabsTrigger 
						value="geography" 
						className="h-16 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-orange-500/30 data-[state=active]:scale-[1.02] transition-all duration-200 rounded-lg font-semibold text-base hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<div className="flex flex-col items-center gap-1">
							<Globe className="h-5 w-5" />
							<span>Geography</span>
						</div>
					</TabsTrigger>
					<TabsTrigger 
						value="technology" 
						className="h-16 data-[state=active]:bg-gradient-to-br data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-indigo-500/30 data-[state=active]:scale-[1.02] transition-all duration-200 rounded-lg font-semibold text-base hover:bg-slate-100 dark:hover:bg-slate-800"
					>
						<div className="flex flex-col items-center gap-1">
							<Monitor className="h-5 w-5" />
							<span>Technology</span>
						</div>
					</TabsTrigger>
				</TabsList>

			{/* KPI Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
						<div className="p-2 bg-blue-500/10 rounded-lg">
							<Eye className="h-5 w-5 text-blue-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-blue-600">
							{loading ? '...' : formatNumber(plausibleData?.aggregate?.visitors || 0)}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							From Plausible Analytics
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Page Views</CardTitle>
						<div className="p-2 bg-green-500/10 rounded-lg">
							<TrendingUp className="h-5 w-5 text-green-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-green-600">
							{loading ? '...' : formatNumber(plausibleData?.aggregate?.pageviews || 0)}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Total page views
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-purple-500 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Properties</CardTitle>
						<div className="p-2 bg-purple-500/10 rounded-lg">
							<Home className="h-5 w-5 text-purple-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-purple-600">
							{loading ? '...' : formatNumber(propertyData?.summary?.totalProperties || 0)}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-600 font-semibold">
								+{propertyData?.summary?.newListings || 0}
							</span>{' '}
							new this period
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
						<div className="p-2 bg-orange-500/10 rounded-lg">
							<Activity className="h-5 w-5 text-orange-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-orange-600">
							{loading ? '...' : `${plausibleData?.aggregate?.bounceRate || 0}%`}
						</div>
						<p className="text-xs text-muted-foreground mt-1">
							Visitor engagement metric
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Realtime Stats */}
			{realtimeData && (
				<Card className="border-2 border-green-500/20 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/10 dark:to-emerald-950/10">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="relative flex h-3 w-3">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
									<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
								</div>
								<CardTitle className="text-lg">Real-Time Activity</CardTitle>
							</div>
							<Badge className="bg-green-500 text-white">
								{realtimeData.activeVisitors || 0} active now
							</Badge>
						</div>
					</CardHeader>
				</Card>
			)}

				{/* Traffic Tab */}
				<TabsContent value="traffic" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-t-4 border-t-blue-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
								<CardTitle className="text-blue-700 dark:text-blue-400">Visitors Over Time</CardTitle>
								<CardDescription>Daily traffic trends</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<ResponsiveContainer width="100%" height={300}>
									<LineChart data={plausibleData?.timeseries || []}>
										<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
										<XAxis dataKey="date" stroke="#6b7280" />
										<YAxis stroke="#6b7280" />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} name="Visitors" />
										<Line type="monotone" dataKey="pageviews" stroke="#06b6d4" strokeWidth={3} name="Page Views" />
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card className="border-t-4 border-t-green-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
								<CardTitle className="text-green-700 dark:text-green-400">Traffic Sources</CardTitle>
								<CardDescription>Where visitors come from</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
						<ResponsiveContainer width="100%" height={300}>
							<PieChart>
								<Pie
											data={plausibleData?.sources || []}
									cx="50%"
									cy="50%"
									labelLine={false}
											label={(entry: any) => `${entry.source}: ${entry.visitors}`}
											outerRadius={90}
									fill="#8884d8"
											dataKey="visitors"
											nameKey="source"
								>
											{(plausibleData?.sources || []).map((_: any, index: number) => (
												<Cell key={`cell-${index}`} fill={['#198754', '#0d5c37', '#2d8659', '#4a9d6e', '#6ab487'][index % 5]} />
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

					<Card className="border-t-4 border-t-purple-500 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
							<CardTitle className="text-purple-700 dark:text-purple-400">Top Pages</CardTitle>
							<CardDescription>Most visited pages</CardDescription>
					</CardHeader>
						<CardContent className="pt-6">
						<ResponsiveContainer width="100%" height={300}>
								<BarChart data={(plausibleData?.pages || []).slice(0, 10)} layout="vertical">
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis type="number" />
								<YAxis dataKey="page" type="category" width={150} />
								<Tooltip />
									<Bar dataKey="visitors" fill="#a855f7" />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Properties Tab */}
				<TabsContent value="properties" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-t-4 border-t-cyan-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-cyan-50 to-white dark:from-cyan-950/20 dark:to-background">
								<CardTitle className="text-cyan-700 dark:text-cyan-400">Property Summary</CardTitle>
								<CardDescription>Key property metrics</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3 pt-4">
								<div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-muted/50">
									<span className="text-muted-foreground">Average Price:</span>
									<span className="font-bold text-xl text-cyan-600">
										${formatNumber(propertyData?.summary?.avgPrice || 0)}
									</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-muted/50">
									<span className="text-muted-foreground">Median Price:</span>
									<span className="font-bold text-xl text-cyan-600">
										${formatNumber(propertyData?.summary?.medianPrice || 0)}
									</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-muted/50">
									<span className="text-muted-foreground">Price Range:</span>
									<span className="font-bold text-xl text-cyan-600">
										${formatNumber(propertyData?.summary?.minPrice || 0)} - ${formatNumber(propertyData?.summary?.maxPrice || 0)}
									</span>
								</div>
							</CardContent>
						</Card>

						<Card className="border-t-4 border-t-purple-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
								<CardTitle className="text-purple-700 dark:text-purple-400">Properties by City</CardTitle>
								<CardDescription>Distribution across locations</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<ResponsiveContainer width="100%" height={300}>
									<BarChart data={propertyData?.propertiesByCity || []}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="city" />
										<YAxis />
										<Tooltip />
										<Bar dataKey="count" fill="#a855f7" radius={[8, 8, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>

					<Card className="border-t-4 border-t-orange-500 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
							<CardTitle className="text-orange-700 dark:text-orange-400">Price Distribution</CardTitle>
							<CardDescription>Properties by price range</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<ResponsiveContainer width="100%" height={300}>
								<BarChart data={propertyData?.priceDistribution || []}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="range" />
									<YAxis />
									<Tooltip />
									<Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
				</TabsContent>

				{/* Behavior Tab */}
				<TabsContent value="behavior" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-t-4 border-t-green-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
								<CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
									<Search className="h-5 w-5" />
									Top Searches
								</CardTitle>
								<CardDescription>Most popular search locations</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<div className="space-y-2">
									{(eventsData?.searches || []).slice(0, 8).map((item: any, index: number) => (
										<div key={index} className="flex items-center justify-between p-2 rounded border">
											<div className="flex items-center gap-2">
												<MapPin className="h-4 w-4 text-green-600" />
												<span className="font-medium">{item.location || 'Unknown'}</span>
											</div>
											<Badge>{item.visitors || 0} searches</Badge>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card className="border-t-4 border-t-pink-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
								<CardTitle className="text-pink-700 dark:text-pink-400 flex items-center gap-2">
									<Heart className="h-5 w-5" />
									Popular Properties
								</CardTitle>
								<CardDescription>Most viewed property listings</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<div className="space-y-2">
									{(eventsData?.propertyViews || []).slice(0, 8).map((item: any, index: number) => (
										<div key={index} className="flex items-center justify-between p-2 rounded border">
											<div className="flex items-center gap-2">
												<Home className="h-4 w-4 text-pink-600" />
												<span className="font-medium">Property #{item.property_id}</span>
											</div>
											<Badge>{item.events || 0} views</Badge>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>

					<Card className="border-t-4 border-t-blue-500 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
							<CardTitle className="text-blue-700 dark:text-blue-400">Engagement Metrics</CardTitle>
							<CardDescription>User interaction statistics</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								<div className="p-4 rounded-lg border bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/10 dark:to-background">
									<div className="text-2xl font-bold text-blue-600">
										{formatDuration(plausibleData?.aggregate?.visitDuration || 0)}
									</div>
									<div className="text-sm text-muted-foreground">Avg. Duration</div>
								</div>
								<div className="p-4 rounded-lg border bg-gradient-to-br from-green-50 to-white dark:from-green-950/10 dark:to-background">
									<div className="text-2xl font-bold text-green-600">
										{formatNumber(eventsData?.favorites?.length || 0)}
									</div>
									<div className="text-sm text-muted-foreground">Favorites</div>
								</div>
								<div className="p-4 rounded-lg border bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/10 dark:to-background">
									<div className="text-2xl font-bold text-purple-600">
										{formatNumber(eventsData?.inquiries?.length || 0)}
									</div>
									<div className="text-sm text-muted-foreground">Inquiries</div>
								</div>
								<div className="p-4 rounded-lg border bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/10 dark:to-background">
									<div className="text-2xl font-bold text-orange-600">
										{formatNumber(eventsData?.mapInteractions?.length || 0)}
									</div>
									<div className="text-sm text-muted-foreground">Map Interactions</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Geography Tab */}
				<TabsContent value="geography" className="space-y-4">
					<Card className="border-t-4 border-t-indigo-500 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
							<CardTitle className="text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
								<Globe className="h-5 w-5" />
								Geographic Distribution
							</CardTitle>
						<CardDescription>Traffic by country</CardDescription>
					</CardHeader>
						<CardContent className="pt-6">
							<ResponsiveContainer width="100%" height={400}>
								<BarChart data={plausibleData?.countries || []}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="country" />
								<YAxis />
								<Tooltip />
									<Bar dataKey="visitors" fill="#6366f1" radius={[8, 8, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-t-4 border-t-green-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
								<CardTitle className="text-green-700 dark:text-green-400">Top Countries</CardTitle>
							</CardHeader>
							<CardContent className="pt-4">
								<div className="space-y-3">
									{(plausibleData?.countries || []).slice(0, 5).map((item: any, index: number) => (
										<div key={index} className="flex items-center justify-between p-3 rounded-lg border">
											<span className="font-medium">{item.country}</span>
											<div className="flex items-center gap-2">
												<Badge className="bg-green-100 text-green-700 border-green-200">
													{formatNumber(item.visitors)} visitors
												</Badge>
												<Badge className="bg-blue-100 text-blue-700 border-blue-200">
													{formatNumber(item.pageviews)} views
												</Badge>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card className="border-t-4 border-t-purple-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
								<CardTitle className="text-purple-700 dark:text-purple-400">Property Locations</CardTitle>
							</CardHeader>
							<CardContent className="pt-4">
								<div className="space-y-3">
									{(propertyData?.propertiesByCountry || []).map((item: any, index: number) => (
										<div key={index} className="flex items-center justify-between p-3 rounded-lg border">
											<span className="font-medium">{item.country}</span>
											<Badge className="bg-purple-100 text-purple-700 border-purple-200">
												{item.count} properties
											</Badge>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Technology Tab */}
				<TabsContent value="technology" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-t-4 border-t-blue-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
								<CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
									<Monitor className="h-5 w-5" />
									Devices
								</CardTitle>
								<CardDescription>Visitor device breakdown</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<ResponsiveContainer width="100%" height={300}>
									<PieChart>
										<Pie
											data={plausibleData?.devices || []}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={(entry: any) => `${entry.device}: ${entry.visitors}`}
											outerRadius={90}
											fill="#8884d8"
											dataKey="visitors"
											nameKey="device"
										>
											{(plausibleData?.devices || []).map((_: any, index: number) => (
												<Cell key={`cell-${index}`} fill={['#3b82f6', '#06b6d4', '#8b5cf6'][index % 3]} />
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card className="border-t-4 border-t-green-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
								<CardTitle className="text-green-700 dark:text-green-400">Browsers</CardTitle>
								<CardDescription>Top browsers used</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<ResponsiveContainer width="100%" height={300}>
									<BarChart data={plausibleData?.browsers || []}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="browser" />
										<YAxis />
										<Tooltip />
										<Bar dataKey="visitors" fill="#10b981" radius={[8, 8, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

					<Card className="border-t-4 border-t-purple-500 shadow-lg">
						<CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
							<CardTitle className="text-purple-700 dark:text-purple-400">Operating Systems</CardTitle>
							<CardDescription>Visitor OS breakdown</CardDescription>
				</CardHeader>
						<CardContent className="pt-6">
							<ResponsiveContainer width="100%" height={300}>
								<BarChart data={plausibleData?.os || []} layout="vertical">
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis type="number" />
									<YAxis dataKey="os" type="category" width={100} />
							<Tooltip />
									<Bar dataKey="visitors" fill="#a855f7" radius={[0, 8, 8, 0]} />
								</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
				</TabsContent>
			</Tabs>

			<div className="text-sm text-muted-foreground text-right">
				Last updated: {new Date().toLocaleString()}
			</div>
		</div>
	);
}

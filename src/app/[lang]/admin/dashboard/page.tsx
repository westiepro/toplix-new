"use client";

import { useState, useMemo } from "react";
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
import { Download, Eye, TrendingUp, Home, Users, Building2, UserCircle } from "lucide-react";

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

	const stats = useMemo(() => {
		const totalVisitors = visitorsData.reduce((sum, d) => sum + d.visitors, 0);
		const totalPageViews = visitorsData.reduce((sum, d) => sum + d.pageViews, 0);
		const avgPrice = (350000 + 890000 + 620000 + 485000 + 745000) / 5;
		const avgViews = (1240 + 980 + 876 + 754 + 689) / 5;

		return {
			totalVisitors,
			totalPageViews,
			totalProperties: 60,
			totalCompanies: 12,
			totalUsers: 450,
			avgPrice,
			avgViews: Math.round(avgViews),
		};
	}, []);

	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Dashboard" }]} />

			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Dashboard</h1>
					<p className="text-muted-foreground">Overview of your real estate portal</p>
				</div>
				<div className="flex items-center gap-2">
					<Select value={dateRange} onValueChange={setDateRange}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Date range" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All time</SelectItem>
							<SelectItem value="7">Last 7 days</SelectItem>
							<SelectItem value="30">Last 30 days</SelectItem>
							<SelectItem value="90">Last 90 days</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" size="sm">
						<Download className="h-4 w-4 mr-2" />
						Export
					</Button>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
				<Card className="border-l-4 border-l-blue-500 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
						<div className="p-2 bg-blue-500/10 rounded-lg">
							<Eye className="h-5 w-5 text-blue-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-blue-600">{stats.totalVisitors.toLocaleString()}</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-600 font-semibold">↑ 12.5%</span> from last period
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
						<div className="text-3xl font-bold text-green-600">{stats.totalPageViews.toLocaleString()}</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-600 font-semibold">↑ 8.2%</span> from last period
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
						<div className="text-3xl font-bold text-purple-600">{stats.totalProperties}</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-600 font-semibold">+5</span> new this month
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-orange-500 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Companies</CardTitle>
						<div className="p-2 bg-orange-500/10 rounded-lg">
							<Building2 className="h-5 w-5 text-orange-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-orange-600">{stats.totalCompanies}</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-600 font-semibold">+2</span> new this month
						</p>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-cyan-500 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/20 dark:to-background">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Users</CardTitle>
						<div className="p-2 bg-cyan-500/10 rounded-lg">
							<UserCircle className="h-5 w-5 text-cyan-600" />
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-3xl font-bold text-cyan-600">{stats.totalUsers}</div>
						<p className="text-xs text-muted-foreground mt-1">
							<span className="text-green-600 font-semibold">+23</span> new this week
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Charts and Tables */}
			<Tabs defaultValue="analytics" className="space-y-4">
				<TabsList className="bg-muted/50 p-1">
					<TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
						Analytics
					</TabsTrigger>
					<TabsTrigger value="properties" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
						Properties
					</TabsTrigger>
					<TabsTrigger value="agents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
						Agents
					</TabsTrigger>
				</TabsList>

				<TabsContent value="analytics" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-t-4 border-t-blue-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
								<CardTitle className="text-blue-700 dark:text-blue-400">Visitors Over Time</CardTitle>
								<CardDescription>Last {dateRange} days</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<ResponsiveContainer width="100%" height={300}>
									<LineChart data={visitorsData}>
										<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
										<XAxis dataKey="date" stroke="#6b7280" />
										<YAxis stroke="#6b7280" />
										<Tooltip />
										<Legend />
										<Line type="monotone" dataKey="visitors" stroke="#3b82f6" strokeWidth={3} />
										<Line type="monotone" dataKey="pageViews" stroke="#06b6d4" strokeWidth={3} />
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card className="border-t-4 border-t-green-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
								<CardTitle className="text-green-700 dark:text-green-400">Traffic Sources</CardTitle>
								<CardDescription>Percentage breakdown</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<ResponsiveContainer width="100%" height={300}>
									<PieChart>
										<Pie
											data={trafficSources}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={(props: any) => {
												const { name, percent } = props;
												return `${name} ${(percent * 100).toFixed(0)}%`;
											}}
											outerRadius={90}
											fill="#8884d8"
											dataKey="value"
										>
											{trafficSources.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
										</Pie>
										<Tooltip />
									</PieChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-t-4 border-t-purple-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
								<CardTitle className="text-purple-700 dark:text-purple-400">Properties by City</CardTitle>
								<CardDescription>Distribution across locations</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<ResponsiveContainer width="100%" height={300}>
									<BarChart data={propertiesByCity}>
										<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
										<XAxis dataKey="city" stroke="#6b7280" />
										<YAxis stroke="#6b7280" />
										<Tooltip />
										<Bar dataKey="count" fill="url(#colorCity)" radius={[8, 8, 0, 0]} />
										<defs>
											<linearGradient id="colorCity" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="#a855f7" stopOpacity={0.9}/>
												<stop offset="95%" stopColor="#ec4899" stopOpacity={0.9}/>
											</linearGradient>
										</defs>
									</BarChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card className="border-t-4 border-t-orange-500 shadow-lg">
							<CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
								<CardTitle className="text-orange-700 dark:text-orange-400">Properties by Price Range</CardTitle>
								<CardDescription>Price distribution</CardDescription>
							</CardHeader>
							<CardContent className="pt-6">
								<ResponsiveContainer width="100%" height={300}>
									<BarChart data={priceRanges}>
										<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
										<XAxis dataKey="range" stroke="#6b7280" />
										<YAxis stroke="#6b7280" />
										<Tooltip />
										<Bar dataKey="count" fill="url(#colorPrice)" radius={[8, 8, 0, 0]} />
										<defs>
											<linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="#f97316" stopOpacity={0.9}/>
												<stop offset="95%" stopColor="#ef4444" stopOpacity={0.9}/>
											</linearGradient>
										</defs>
									</BarChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="properties" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2">
						<Card className="border-t-4 border-t-cyan-500 shadow-lg bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/20 dark:to-background">
							<CardHeader>
								<CardTitle className="text-cyan-700 dark:text-cyan-400">Property Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-muted/50">
									<span className="text-muted-foreground">Average Price:</span>
									<span className="font-bold text-xl text-cyan-600">${Math.round(stats.avgPrice).toLocaleString()}</span>
								</div>
								<div className="flex justify-between items-center p-3 rounded-lg bg-white dark:bg-muted/50">
									<span className="text-muted-foreground">Average Views:</span>
									<span className="font-bold text-xl text-cyan-600">{stats.avgViews}</span>
								</div>
							</CardContent>
						</Card>

						<Card className="border-t-4 border-t-indigo-500 shadow-lg bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-background">
							<CardHeader>
								<CardTitle className="text-indigo-700 dark:text-indigo-400">Top Performing Properties</CardTitle>
								<CardDescription>Most viewed listings</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									{topProperties.map((prop, index) => (
										<div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-gradient-to-r from-white to-indigo-50/50 dark:from-muted/50 dark:to-indigo-950/20 hover:shadow-md transition-shadow">
											<div>
												<p className="font-medium">{prop.name}</p>
												<p className="text-sm text-muted-foreground">{prop.city}</p>
											</div>
											<div className="text-right">
												<p className="font-semibold text-indigo-600">${prop.price.toLocaleString()}</p>
												<Badge className="bg-indigo-100 text-indigo-700 border-indigo-200">{prop.views} views</Badge>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="agents" className="space-y-4">
					<Card className="border-t-4 border-t-orange-500 shadow-lg bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-background">
						<CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
							<CardTitle className="text-orange-700 dark:text-orange-400">Agent Performance</CardTitle>
							<CardDescription>Conversion rates and activity</CardDescription>
						</CardHeader>
						<CardContent className="pt-6">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b-2 border-orange-200">
											<th className="text-left p-3 font-semibold">Agent</th>
											<th className="text-left p-3 font-semibold">Listings</th>
											<th className="text-left p-3 font-semibold">Inquiries</th>
											<th className="text-left p-3 font-semibold">Deals</th>
											<th className="text-left p-3 font-semibold">Conversion</th>
										</tr>
									</thead>
									<tbody>
										{agentPerformance.map((agent, index) => (
											<tr key={index} className="border-b hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-colors">
												<td className="p-3 font-medium">{agent.name}</td>
												<td className="p-3">
													<Badge className="bg-blue-100 text-blue-700 border-blue-200">{agent.listings}</Badge>
												</td>
												<td className="p-3">
													<Badge className="bg-purple-100 text-purple-700 border-purple-200">{agent.inquiries}</Badge>
												</td>
												<td className="p-3">
													<Badge className="bg-green-100 text-green-700 border-green-200">{agent.deals}</Badge>
												</td>
												<td className="p-3">
													<Badge className={agent.conversion > 20 ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white" : "bg-gray-100 text-gray-700"}>
														{agent.conversion}%
													</Badge>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
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


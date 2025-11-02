"use client";

import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const topPages = [
	{ page: "/property/1", views: 1240 },
	{ page: "/property/5", views: 980 },
	{ page: "/property/3", views: 876 },
	{ page: "/homes", views: 754 },
	{ page: "/property/2", views: 689 },
];

const geographicData = [
	{ country: "Portugal", visitors: 4500 },
	{ country: "Spain", visitors: 3200 },
	{ country: "UK", visitors: 1800 },
	{ country: "Germany", visitors: 1200 },
	{ country: "France", visitors: 900 },
];

const agentPerformance = [
	{ agent: "Jane Smith", conversion: 23.7, deals: 12, rating: 4.9 },
	{ agent: "John Doe", conversion: 17.8, deals: 8, rating: 4.8 },
	{ agent: "Mike Johnson", conversion: 21.4, deals: 6, rating: 4.6 },
	{ agent: "Sarah Williams", conversion: 23.7, deals: 9, rating: 4.9 },
];

export default function AnalyticsPage() {
	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Analytics" }]} />

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Analytics</h1>
					<p className="text-muted-foreground">Detailed analytics and insights</p>
				</div>
				<Select defaultValue="30">
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Date range" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="7">Last 7 days</SelectItem>
						<SelectItem value="30">Last 30 days</SelectItem>
						<SelectItem value="90">Last 90 days</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Visitors Over Time</CardTitle>
						<CardDescription>Trend analysis</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<LineChart data={visitorsData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="visitors" stroke="#198754" />
								<Line type="monotone" dataKey="pageViews" stroke="#0d5c37" />
							</LineChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Traffic Sources</CardTitle>
						<CardDescription>Percentage breakdown</CardDescription>
					</CardHeader>
					<CardContent>
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
									outerRadius={80}
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
				<Card>
					<CardHeader>
						<CardTitle>Top Performing Pages</CardTitle>
						<CardDescription>Most viewed property pages</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={topPages} layout="vertical">
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis type="number" />
								<YAxis dataKey="page" type="category" width={150} />
								<Tooltip />
								<Bar dataKey="views" fill="#198754" />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Geographic Distribution</CardTitle>
						<CardDescription>Traffic by country</CardDescription>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={300}>
							<BarChart data={geographicData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="country" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="visitors" fill="#0d5c37" />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Agent Performance</CardTitle>
					<CardDescription>Conversion metrics and ratings</CardDescription>
				</CardHeader>
				<CardContent>
					<ResponsiveContainer width="100%" height={400}>
						<RadarChart data={agentPerformance}>
							<PolarGrid />
							<PolarAngleAxis dataKey="agent" />
							<PolarRadiusAxis />
							<Radar
								name="Conversion"
								dataKey="conversion"
								stroke="#198754"
								fill="#198754"
								fillOpacity={0.6}
							/>
							<Radar
								name="Rating"
								dataKey="rating"
								stroke="#0d5c37"
								fill="#0d5c37"
								fillOpacity={0.6}
							/>
							<Legend />
							<Tooltip />
						</RadarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>

			<div className="text-sm text-muted-foreground text-right">
				Last updated: {new Date().toLocaleString()}
			</div>
		</div>
	);
}


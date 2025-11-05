"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Eye, MessageSquare, Home, Users, Download, Calendar } from "lucide-react";

export function AnalyticsTab() {
	// Mock data - will be replaced with real analytics
	const stats = {
		totalViews: 3456,
		viewsChange: 12.5,
		totalInquiries: 87,
		inquiriesChange: -3.2,
		activeListings: 18,
		listingsChange: 5.8,
		conversionRate: 2.5,
		rateChange: 0.3,
	};

	const topProperties = [
		{ title: "Luxury Villa in Algarve", views: 456, inquiries: 23, conversion: "5.0%" },
		{ title: "Modern Apartment in Lisbon", views: 389, inquiries: 18, conversion: "4.6%" },
		{ title: "Beachfront Penthouse", views: 321, inquiries: 12, conversion: "3.7%" },
		{ title: "Country Estate", views: 298, inquiries: 15, conversion: "5.0%" },
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold text-blue-600 mb-1">Analytics & Reports</h2>
					<p className="text-gray-600">Track your business performance</p>
				</div>
				<div className="flex gap-2">
					<Select defaultValue="30days">
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Time Period" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7days">Last 7 Days</SelectItem>
							<SelectItem value="30days">Last 30 Days</SelectItem>
							<SelectItem value="90days">Last 90 Days</SelectItem>
							<SelectItem value="year">This Year</SelectItem>
						</SelectContent>
					</Select>
					<Button variant="outline" className="gap-2">
						<Download className="h-4 w-4" />
						Export Report
					</Button>
				</div>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
							Total Views
							<Eye className="h-4 w-4 text-gray-400" />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold text-blue-600 mb-1">{stats.totalViews.toLocaleString()}</p>
						<div className="flex items-center gap-1 text-sm">
							<TrendingUp className="h-4 w-4 text-green-600" />
							<span className="text-green-600 font-medium">+{stats.viewsChange}%</span>
							<span className="text-gray-500">vs last period</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
							Inquiries
							<MessageSquare className="h-4 w-4 text-gray-400" />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold text-purple-600 mb-1">{stats.totalInquiries}</p>
						<div className="flex items-center gap-1 text-sm">
							<TrendingDown className="h-4 w-4 text-red-600" />
							<span className="text-red-600 font-medium">{stats.inquiriesChange}%</span>
							<span className="text-gray-500">vs last period</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
							Active Listings
							<Home className="h-4 w-4 text-gray-400" />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold text-green-600 mb-1">{stats.activeListings}</p>
						<div className="flex items-center gap-1 text-sm">
							<TrendingUp className="h-4 w-4 text-green-600" />
							<span className="text-green-600 font-medium">+{stats.listingsChange}%</span>
							<span className="text-gray-500">vs last period</span>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
							Conversion Rate
							<Users className="h-4 w-4 text-gray-400" />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold text-orange-600 mb-1">{stats.conversionRate}%</p>
						<div className="flex items-center gap-1 text-sm">
							<TrendingUp className="h-4 w-4 text-green-600" />
							<span className="text-green-600 font-medium">+{stats.rateChange}%</span>
							<span className="text-gray-500">vs last period</span>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Placeholder */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Views Over Time</CardTitle>
						<CardDescription>Property views in the last 30 days</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-12 text-center">
							<Calendar className="h-16 w-16 text-blue-400 mx-auto mb-4" />
							<p className="text-gray-600 mb-2">Chart visualization coming soon</p>
							<p className="text-sm text-gray-500">Line chart showing daily views trend</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Inquiries by Property Type</CardTitle>
						<CardDescription>Breakdown of customer interest</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-12 text-center">
							<TrendingUp className="h-16 w-16 text-purple-400 mx-auto mb-4" />
							<p className="text-gray-600 mb-2">Chart visualization coming soon</p>
							<p className="text-sm text-gray-500">Pie chart showing inquiry distribution</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Top Performing Properties */}
			<Card>
				<CardHeader>
					<CardTitle>Top Performing Properties</CardTitle>
					<CardDescription>Your most viewed and inquired listings</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{topProperties.map((property, index) => (
							<div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
								<div className="flex items-center gap-4 flex-1">
									<div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
										{index + 1}
									</div>
									<div className="flex-1">
										<h4 className="font-semibold">{property.title}</h4>
									</div>
								</div>
								<div className="flex items-center gap-8 text-sm">
									<div className="text-center">
										<p className="font-semibold text-purple-600">{property.views}</p>
										<p className="text-gray-500 text-xs">Views</p>
									</div>
									<div className="text-center">
										<p className="font-semibold text-orange-600">{property.inquiries}</p>
										<p className="text-gray-500 text-xs">Inquiries</p>
									</div>
									<div className="text-center">
										<p className="font-semibold text-green-600">{property.conversion}</p>
										<p className="text-gray-500 text-xs">Rate</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Performance Summary */}
			<Card>
				<CardHeader>
					<CardTitle>Performance Summary</CardTitle>
					<CardDescription>Key insights from your analytics</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-blue-50 p-6 rounded-lg">
							<p className="text-sm text-gray-600 mb-2">Average Days on Market</p>
							<p className="text-4xl font-bold text-blue-600 mb-1">23</p>
							<p className="text-sm text-gray-500">Properties sell faster than average</p>
						</div>
						<div className="bg-purple-50 p-6 rounded-lg">
							<p className="text-sm text-gray-600 mb-2">Most Popular Location</p>
							<p className="text-4xl font-bold text-purple-600 mb-1">Algarve</p>
							<p className="text-sm text-gray-500">45% of total inquiries</p>
						</div>
						<div className="bg-green-50 p-6 rounded-lg">
							<p className="text-sm text-gray-600 mb-2">Peak Viewing Time</p>
							<p className="text-4xl font-bold text-green-600 mb-1">14-17h</p>
							<p className="text-sm text-gray-500">Weekday afternoons</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


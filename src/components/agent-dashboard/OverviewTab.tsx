"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Eye, MessageSquare, TrendingUp, Calendar, DollarSign } from "lucide-react";

export function OverviewTab() {
	// Mock data - will be replaced with real data from Supabase
	const stats = {
		totalListings: 24,
		activeListings: 18,
		totalViews: 1247,
		inquiries: 32,
		pendingInquiries: 8,
		appointments: 5,
		salesThisMonth: 3,
	};

	const recentActivity = [
		{ type: "inquiry", property: "Luxury Villa in Algarve", customer: "John Doe", time: "2 hours ago" },
		{ type: "view", property: "Modern Apartment in Lisbon", count: "15 views", time: "3 hours ago" },
		{ type: "appointment", property: "Beachfront Penthouse", customer: "Jane Smith", time: "5 hours ago" },
		{ type: "inquiry", property: "Country Estate", customer: "Mike Johnson", time: "1 day ago" },
	];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h2 className="text-3xl font-bold text-blue-600 mb-1">Dashboard Overview</h2>
				<p className="text-gray-600">Quick snapshot of your business performance</p>
			</div>

			{/* Key Metrics Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="border-l-4 border-l-blue-500">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-gray-600">Total Listings</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-3xl font-bold text-blue-600">{stats.totalListings}</p>
								<p className="text-xs text-green-600 mt-1">↑ {stats.activeListings} active</p>
							</div>
							<Home className="h-10 w-10 text-blue-200" />
						</div>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-purple-500">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-3xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</p>
								<p className="text-xs text-green-600 mt-1">↑ This month</p>
							</div>
							<Eye className="h-10 w-10 text-purple-200" />
						</div>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-orange-500">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-gray-600">Inquiries</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-3xl font-bold text-orange-600">{stats.inquiries}</p>
								<p className="text-xs text-red-600 mt-1">{stats.pendingInquiries} pending</p>
							</div>
							<MessageSquare className="h-10 w-10 text-orange-200" />
						</div>
					</CardContent>
				</Card>

				<Card className="border-l-4 border-l-green-500">
					<CardHeader className="pb-3">
						<CardTitle className="text-sm font-medium text-gray-600">Sales This Month</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex items-center justify-between">
							<div>
								<p className="text-3xl font-bold text-green-600">{stats.salesThisMonth}</p>
								<p className="text-xs text-green-600 mt-1">↑ +2 from last month</p>
							</div>
							<TrendingUp className="h-10 w-10 text-green-200" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions & Recent Activity */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Quick Actions */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="h-5 w-5 text-blue-600" />
							Quick Actions
						</CardTitle>
						<CardDescription>Common tasks</CardDescription>
					</CardHeader>
					<CardContent className="space-y-2">
						<Button className="w-full justify-start bg-blue-600 hover:bg-blue-700" size="lg">
							<Home className="h-5 w-5 mr-2" />
							Add New Listing
						</Button>
						<Button variant="outline" className="w-full justify-start" size="lg">
							<MessageSquare className="h-5 w-5 mr-2" />
							View Pending Inquiries ({stats.pendingInquiries})
						</Button>
						<Button variant="outline" className="w-full justify-start" size="lg">
							<Calendar className="h-5 w-5 mr-2" />
							Schedule Appointment
						</Button>
					</CardContent>
				</Card>

				{/* Recent Activity */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5 text-purple-600" />
							Recent Activity
						</CardTitle>
						<CardDescription>Latest updates from your listings</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{recentActivity.map((activity, index) => (
								<div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
									<div className={`p-2 rounded-full ${
										activity.type === 'inquiry' ? 'bg-orange-100' :
										activity.type === 'view' ? 'bg-purple-100' :
										'bg-blue-100'
									}`}>
										{activity.type === 'inquiry' && <MessageSquare className="h-4 w-4 text-orange-600" />}
										{activity.type === 'view' && <Eye className="h-4 w-4 text-purple-600" />}
										{activity.type === 'appointment' && <Calendar className="h-4 w-4 text-blue-600" />}
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-sm">{activity.property}</p>
										<p className="text-xs text-gray-600">
											{'customer' in activity ? activity.customer : activity.count}
										</p>
									</div>
									<span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Performance Summary */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<DollarSign className="h-5 w-5 text-green-600" />
						Monthly Performance
					</CardTitle>
					<CardDescription>Key metrics for the current month</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="text-center p-4 bg-blue-50 rounded-lg">
							<p className="text-sm text-gray-600 mb-2">Avg. Days on Market</p>
							<p className="text-3xl font-bold text-blue-600">23</p>
						</div>
						<div className="text-center p-4 bg-purple-50 rounded-lg">
							<p className="text-sm text-gray-600 mb-2">Inquiry → Sale Rate</p>
							<p className="text-3xl font-bold text-purple-600">12%</p>
						</div>
						<div className="text-center p-4 bg-green-50 rounded-lg">
							<p className="text-sm text-gray-600 mb-2">Most Viewed Type</p>
							<p className="text-3xl font-bold text-green-600">Villa</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}


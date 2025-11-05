"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Home as HomeIcon, MessageSquare, Calendar, BarChart3, Settings as SettingsIcon, LogOut } from "lucide-react";
import { OverviewTab } from "@/components/agent-dashboard/OverviewTab";
import { ListingsTab } from "@/components/agent-dashboard/ListingsTab";
import { InquiriesTab } from "@/components/agent-dashboard/InquiriesTab";
import { AppointmentsTab } from "@/components/agent-dashboard/AppointmentsTab";
import { AnalyticsTab } from "@/components/agent-dashboard/AnalyticsTab";
import { SettingsTab } from "@/components/agent-dashboard/SettingsTab";

type TabType = "overview" | "listings" | "inquiries" | "appointments" | "analytics" | "settings";

export default function AgentDashboardPage() {
	const { user, signOut } = useAuth();
	const searchParams = useSearchParams();
	const [activeTab, setActiveTab] = useState<TabType>("overview");

	// Check URL parameter for tab on mount
	useEffect(() => {
		const tabParam = searchParams.get('tab');
		if (tabParam && ['overview', 'listings', 'inquiries', 'appointments', 'analytics', 'settings'].includes(tabParam)) {
			setActiveTab(tabParam as TabType);
		}
	}, [searchParams]);

	const getCompanyName = (email: string | undefined) => {
		if (!email) return "Company";
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
							<h1 className="text-4xl font-bold text-white mb-2">Agent Dashboard</h1>
							<p className="text-white/90 text-lg">Welcome back, {getCompanyName(user?.email)}</p>
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
						onClick={() => setActiveTab("overview")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "overview"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<LayoutDashboard className={`h-5 w-5 ${activeTab === "overview" ? "text-white" : "text-blue-400"}`} />
						<span className="font-medium">Overview</span>
					</button>
					<button
						onClick={() => setActiveTab("listings")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "listings"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<HomeIcon className={`h-5 w-5 ${activeTab === "listings" ? "text-white" : "text-green-400"}`} />
						<span className="font-medium">My Listings</span>
					</button>
					<button
						onClick={() => setActiveTab("inquiries")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "inquiries"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<MessageSquare className={`h-5 w-5 ${activeTab === "inquiries" ? "text-white" : "text-purple-400"}`} />
						<span className="font-medium">Inquiries</span>
					</button>
					<button
						onClick={() => setActiveTab("appointments")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "appointments"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<Calendar className={`h-5 w-5 ${activeTab === "appointments" ? "text-white" : "text-orange-400"}`} />
						<span className="font-medium">Appointments</span>
					</button>
					<button
						onClick={() => setActiveTab("analytics")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "analytics"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<BarChart3 className={`h-5 w-5 ${activeTab === "analytics" ? "text-white" : "text-teal-400"}`} />
						<span className="font-medium">Analytics</span>
					</button>
					<button
						onClick={() => setActiveTab("settings")}
						className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
							activeTab === "settings"
								? "bg-blue-600 text-white shadow-md border-2 border-blue-700"
								: "text-gray-700 hover:bg-gray-100"
						}`}
					>
						<SettingsIcon className={`h-5 w-5 ${activeTab === "settings" ? "text-white" : "text-yellow-400"}`} />
						<span className="font-medium">Settings</span>
					</button>
				</div>

				{/* Tab Content */}
				<div>
					{activeTab === "overview" && <OverviewTab />}
					{activeTab === "listings" && <ListingsTab />}
					{activeTab === "inquiries" && <InquiriesTab />}
					{activeTab === "appointments" && <AppointmentsTab />}
					{activeTab === "analytics" && <AnalyticsTab />}
					{activeTab === "settings" && <SettingsTab />}
				</div>
			</section>
		</main>
	);
}


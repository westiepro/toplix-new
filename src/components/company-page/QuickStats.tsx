"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Home, TrendingUp, Users, Award } from "lucide-react";

interface QuickStatsProps {
	stats: {
		activeListings: number;
		propertiesSold: number;
		happyClients: number;
		rating: number;
	};
}

export function QuickStats({ stats }: QuickStatsProps) {
	return (
		<section className="py-12 bg-white border-b">
			<div className="mx-auto max-w-7xl px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<Card className="border-t-4 border-t-blue-600 hover:shadow-lg transition-shadow">
						<CardContent className="pt-6">
							<div className="flex items-center justify-between mb-4">
								<Home className="h-12 w-12 text-blue-600" />
								<div className="text-right">
									<div className="text-3xl font-bold text-blue-600">{stats.activeListings}</div>
									<div className="text-sm text-gray-600">Active Listings</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-t-4 border-t-green-600 hover:shadow-lg transition-shadow">
						<CardContent className="pt-6">
							<div className="flex items-center justify-between mb-4">
								<TrendingUp className="h-12 w-12 text-green-600" />
								<div className="text-right">
									<div className="text-3xl font-bold text-green-600">{stats.propertiesSold}+</div>
									<div className="text-sm text-gray-600">Properties Sold</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-t-4 border-t-purple-600 hover:shadow-lg transition-shadow">
						<CardContent className="pt-6">
							<div className="flex items-center justify-between mb-4">
								<Users className="h-12 w-12 text-purple-600" />
								<div className="text-right">
									<div className="text-3xl font-bold text-purple-600">{stats.happyClients}+</div>
									<div className="text-sm text-gray-600">Happy Clients</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-t-4 border-t-orange-600 hover:shadow-lg transition-shadow">
						<CardContent className="pt-6">
							<div className="flex items-center justify-between mb-4">
								<Award className="h-12 w-12 text-orange-600" />
								<div className="text-right">
									<div className="text-3xl font-bold text-orange-600">{stats.rating}/5</div>
									<div className="text-sm text-gray-600">Client Rating</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}


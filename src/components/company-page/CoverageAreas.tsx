"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Home } from "lucide-react";

export function CoverageAreas() {
	const areas = [
		{ name: "Lisbon", properties: 45, region: "Greater Lisbon", color: "blue" },
		{ name: "Cascais", properties: 23, region: "Greater Lisbon", color: "purple" },
		{ name: "Algarve", properties: 67, region: "South Portugal", color: "orange" },
		{ name: "Porto", properties: 34, region: "North Portugal", color: "green" },
		{ name: "Vilamoura", properties: 28, region: "Algarve", color: "teal" },
		{ name: "Lagos", properties: 19, region: "Algarve", color: "pink" },
		{ name: "Faro", properties: 31, region: "Algarve", color: "indigo" },
		{ name: "Sintra", properties: 15, region: "Greater Lisbon", color: "cyan" },
	];

	const colorClasses: Record<string, string> = {
		blue: "bg-blue-100 text-blue-800 border-blue-200",
		purple: "bg-purple-100 text-purple-800 border-purple-200",
		orange: "bg-orange-100 text-orange-800 border-orange-200",
		green: "bg-green-100 text-green-800 border-green-200",
		teal: "bg-teal-100 text-teal-800 border-teal-200",
		pink: "bg-pink-100 text-pink-800 border-pink-200",
		indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
		cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
	};

	return (
		<section className="py-16 bg-white">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-block p-3 bg-green-100 rounded-full mb-4">
						<MapPin className="h-8 w-8 text-green-600" />
					</div>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Service Coverage</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						We operate across Portugal's most sought-after locations
					</p>
				</div>

				{/* Map Placeholder */}
				<div className="mb-12 rounded-2xl overflow-hidden shadow-xl">
					<div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
						<div className="text-center">
							<MapPin className="h-24 w-24 text-blue-600 mx-auto mb-4 opacity-50" />
							<p className="text-gray-600 text-lg">Interactive Map Coming Soon</p>
							<p className="text-gray-500 text-sm">Explore our coverage areas visually</p>
						</div>
					</div>
				</div>

				{/* Areas Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{areas.map((area, index) => (
						<Card 
							key={index}
							className={`border-2 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 ${
								colorClasses[area.color]?.includes('border') 
									? `border-${area.color}-200` 
									: 'border-gray-200'
							}`}
						>
							<CardContent className="p-6">
								<div className="flex items-start justify-between mb-3">
									<div>
										<h3 className="font-bold text-xl text-gray-900">{area.name}</h3>
										<p className="text-sm text-gray-600">{area.region}</p>
									</div>
									<MapPin className="h-6 w-6 text-blue-600" />
								</div>
								<div className="flex items-center justify-between">
									<Badge className={colorClasses[area.color] || "bg-gray-100"}>
										{area.properties} Properties
									</Badge>
									<Home className="h-5 w-5 text-gray-400" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Additional Coverage Info */}
				<div className="mt-12 text-center">
					<p className="text-gray-600 mb-4">
						Don't see your area? We're constantly expanding our coverage.
					</p>
					<Button variant="outline" size="lg">
						Contact Us About Other Areas
					</Button>
				</div>
			</div>
		</section>
	);
}


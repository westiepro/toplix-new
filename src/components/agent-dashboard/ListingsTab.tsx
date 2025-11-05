"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Grid3x3, List, Edit, Eye, Trash2, Power, PowerOff } from "lucide-react";
import Image from "next/image";

export function ListingsTab() {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [statusFilter, setStatusFilter] = useState<string>("all");

	// Mock listings - will be replaced with real data from Supabase
	const mockListings = [
		{
			id: "1",
			title: "Luxury Villa in Algarve",
			address: "Vilamoura, Quarteira",
			price: 890000,
			beds: 4,
			baths: 3,
			area: 250,
			status: "active",
			views: 234,
			inquiries: 8,
			daysOnMarket: 15,
			imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400",
		},
		{
			id: "2",
			title: "Modern Apartment in Lisbon",
			address: "Parque das Nações, Lisboa",
			price: 350000,
			beds: 2,
			baths: 2,
			area: 95,
			status: "active",
			views: 156,
			inquiries: 12,
			daysOnMarket: 8,
			imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
		},
		{
			id: "3",
			title: "Beachfront Penthouse",
			address: "Cascais, Lisboa",
			price: 1200000,
			beds: 3,
			baths: 3,
			area: 180,
			status: "inactive",
			views: 89,
			inquiries: 3,
			daysOnMarket: 45,
			imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
		},
	];

	const getStatusBadge = (status: string) => {
		if (status === "active") {
			return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
		}
		return <Badge variant="secondary">Inactive</Badge>;
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold text-blue-600 mb-1">My Listings</h2>
					<p className="text-gray-600">Manage all your property listings</p>
				</div>
				<Button className="bg-blue-600 hover:bg-blue-700 gap-2">
					<Plus className="h-5 w-5" />
					Add New Listing
				</Button>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search by title, address, or ID..."
								className="pl-10"
							/>
						</div>
						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className="w-full md:w-48">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="inactive">Inactive</SelectItem>
								<SelectItem value="sold">Sold</SelectItem>
								<SelectItem value="rented">Rented</SelectItem>
							</SelectContent>
						</Select>
						<Select defaultValue="all-types">
							<SelectTrigger className="w-full md:w-48">
								<SelectValue placeholder="Property Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all-types">All Types</SelectItem>
								<SelectItem value="apartment">Apartment</SelectItem>
								<SelectItem value="house">House</SelectItem>
								<SelectItem value="villa">Villa</SelectItem>
								<SelectItem value="land">Land</SelectItem>
							</SelectContent>
						</Select>
						<div className="flex gap-2">
							<Button
								variant={viewMode === "grid" ? "default" : "outline"}
								size="icon"
								onClick={() => setViewMode("grid")}
							>
								<Grid3x3 className="h-4 w-4" />
							</Button>
							<Button
								variant={viewMode === "list" ? "default" : "outline"}
								size="icon"
								onClick={() => setViewMode("list")}
							>
								<List className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Listings */}
			{viewMode === "grid" ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{mockListings.map((listing) => (
						<Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
							<div className="relative h-48 w-full">
								<Image
									src={listing.imageUrl}
									alt={listing.title}
									fill
									className="object-cover"
								/>
								<div className="absolute top-2 right-2">
									{getStatusBadge(listing.status)}
								</div>
							</div>
							<CardHeader className="pb-3">
								<CardTitle className="text-lg">{listing.title}</CardTitle>
								<CardDescription>{listing.address}</CardDescription>
							</CardHeader>
							<CardContent className="space-y-3">
								<div className="flex items-center justify-between">
									<p className="text-2xl font-bold text-blue-600">
										€{listing.price.toLocaleString()}
									</p>
								</div>
								<div className="flex items-center gap-4 text-sm text-gray-600">
									<span>{listing.beds} beds</span>
									<span>•</span>
									<span>{listing.baths} baths</span>
									<span>•</span>
									<span>{listing.area} m²</span>
								</div>
								<div className="grid grid-cols-3 gap-2 pt-2 border-t text-xs">
									<div className="text-center">
										<p className="font-semibold text-purple-600">{listing.views}</p>
										<p className="text-gray-500">Views</p>
									</div>
									<div className="text-center">
										<p className="font-semibold text-orange-600">{listing.inquiries}</p>
										<p className="text-gray-500">Inquiries</p>
									</div>
									<div className="text-center">
										<p className="font-semibold text-gray-600">{listing.daysOnMarket}d</p>
										<p className="text-gray-500">On Market</p>
									</div>
								</div>
								<div className="flex gap-2 pt-2">
									<Button variant="outline" size="sm" className="flex-1">
										<Edit className="h-3 w-3 mr-1" />
										Edit
									</Button>
									<Button variant="outline" size="sm" className="flex-1">
										<Eye className="h-3 w-3 mr-1" />
										View
									</Button>
									<Button variant="outline" size="icon" className="text-red-600 hover:bg-red-50">
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			) : (
				<Card>
					<CardContent className="p-0">
						<div className="divide-y">
							{mockListings.map((listing) => (
								<div key={listing.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
									<div className="relative h-20 w-32 flex-shrink-0">
										<Image
											src={listing.imageUrl}
											alt={listing.title}
											fill
											className="object-cover rounded"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
										<p className="text-sm text-gray-600 mb-2">{listing.address}</p>
										<div className="flex items-center gap-4 text-sm">
											<span className="text-blue-600 font-bold">€{listing.price.toLocaleString()}</span>
											<span className="text-gray-500">{listing.beds} beds • {listing.baths} baths • {listing.area} m²</span>
										</div>
									</div>
									<div className="flex items-center gap-6 text-sm">
										<div className="text-center">
											<p className="font-semibold text-purple-600">{listing.views}</p>
											<p className="text-gray-500 text-xs">Views</p>
										</div>
										<div className="text-center">
											<p className="font-semibold text-orange-600">{listing.inquiries}</p>
											<p className="text-gray-500 text-xs">Inquiries</p>
										</div>
										<div className="text-center">
											<p className="font-semibold text-gray-600">{listing.daysOnMarket}d</p>
											<p className="text-gray-500 text-xs">On Market</p>
										</div>
									</div>
									<div className="flex-shrink-0">
										{getStatusBadge(listing.status)}
									</div>
									<div className="flex gap-2 flex-shrink-0">
										<Button variant="outline" size="sm">
											<Edit className="h-3 w-3" />
										</Button>
										<Button variant="outline" size="sm">
											<Eye className="h-3 w-3" />
										</Button>
										{listing.status === "active" ? (
											<Button variant="outline" size="sm" className="text-orange-600">
												<PowerOff className="h-3 w-3" />
											</Button>
										) : (
											<Button variant="outline" size="sm" className="text-green-600">
												<Power className="h-3 w-3" />
											</Button>
										)}
										<Button variant="outline" size="sm" className="text-red-600">
											<Trash2 className="h-3 w-3" />
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}


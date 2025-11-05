"use client";

import { useState, useEffect } from "react";
import { PropertyCard, type Property } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Grid3x3, List, MapPin, Home as HomeIcon } from "lucide-react";

interface AllListingsProps {
	companyId: string;
	companyName: string;
}

export function AllListings({ companyId, companyName }: AllListingsProps) {
	const [properties, setProperties] = useState<Property[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("all");
	const [filterStatus, setFilterStatus] = useState("all");

	useEffect(() => {
		// Fetch all company properties
		const fetchProperties = async () => {
			try {
				const response = await fetch(`/api/properties?company_id=${companyId}`);
				if (response.ok) {
					const data = await response.json();
					setProperties(data.properties || []);
				}
			} catch (error) {
				console.error('Failed to fetch properties:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProperties();
	}, [companyId]);

	// Filter properties
	const filteredProperties = properties.filter((property) => {
		const matchesSearch = searchTerm === "" || 
			property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
			property.city.toLowerCase().includes(searchTerm.toLowerCase());
		
		const matchesType = filterType === "all" || property.property_type === filterType;
		const matchesStatus = filterStatus === "all" || (property as any).status === filterStatus;

		return matchesSearch && matchesType && matchesStatus;
	});

	return (
		<section id="properties" className="py-16 bg-white">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-block p-3 bg-green-100 rounded-full mb-4">
						<HomeIcon className="h-8 w-8 text-green-600" />
					</div>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">All Properties</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Browse our complete collection of {properties.length} properties
					</p>
				</div>

				{/* Filters */}
				<div className="mb-8 space-y-4">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Search */}
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
							<Input
								placeholder="Search by location, address..."
								className="pl-10"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* Type Filter */}
						<Select value={filterType} onValueChange={setFilterType}>
							<SelectTrigger className="w-full md:w-48">
								<SelectValue placeholder="Property Type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Types</SelectItem>
								<SelectItem value="apartment">Apartment</SelectItem>
								<SelectItem value="house">House</SelectItem>
								<SelectItem value="villa">Villa</SelectItem>
								<SelectItem value="land">Land</SelectItem>
								<SelectItem value="commercial">Commercial</SelectItem>
							</SelectContent>
						</Select>

						{/* Status Filter */}
						<Select value={filterStatus} onValueChange={setFilterStatus}>
							<SelectTrigger className="w-full md:w-48">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="for-sale">For Sale</SelectItem>
								<SelectItem value="for-rent">For Rent</SelectItem>
							</SelectContent>
						</Select>

						{/* View Toggle */}
						<div className="flex gap-2">
							<Button
								variant={viewMode === "grid" ? "default" : "outline"}
								size="icon"
								onClick={() => setViewMode("grid")}
							>
								<Grid3x3 className="h-5 w-5" />
							</Button>
							<Button
								variant={viewMode === "list" ? "default" : "outline"}
								size="icon"
								onClick={() => setViewMode("list")}
							>
								<List className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Results Count */}
					<div className="flex items-center justify-between text-sm text-gray-600">
						<span>Showing {filteredProperties.length} of {properties.length} properties</span>
						{filterStatus !== "all" || filterType !== "all" || searchTerm !== "" && (
							<Button
								variant="ghost"
								size="sm"
								onClick={() => {
									setFilterStatus("all");
									setFilterType("all");
									setSearchTerm("");
								}}
							>
								Clear Filters
							</Button>
						)}
					</div>
				</div>

				{/* Properties Grid */}
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
						))}
					</div>
				) : filteredProperties.length > 0 ? (
					<div className={`grid gap-6 ${
						viewMode === "grid" 
							? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
							: "grid-cols-1"
					}`}>
						{filteredProperties.map((property) => (
							<PropertyCard key={property.id} property={property} />
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
						<p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
						<Button
							variant="outline"
							onClick={() => {
								setFilterStatus("all");
								setFilterType("all");
								setSearchTerm("");
							}}
						>
							Clear All Filters
						</Button>
					</div>
				)}
			</div>
		</section>
	);
}


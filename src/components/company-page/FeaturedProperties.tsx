"use client";

import { useState, useEffect } from "react";
import { PropertyCard, type Property } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";

interface FeaturedPropertiesProps {
	companyId: string;
}

export function FeaturedProperties({ companyId }: FeaturedPropertiesProps) {
	const [properties, setProperties] = useState<Property[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Fetch featured properties from API
		const fetchProperties = async () => {
			try {
				const response = await fetch(`/api/properties?company_id=${companyId}&featured=true&limit=6`);
				if (response.ok) {
					const data = await response.json();
					setProperties(data.properties || []);
				}
			} catch (error) {
				console.error('Failed to fetch featured properties:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchProperties();
	}, [companyId]);

	if (isLoading) {
		return (
			<section className="py-16 bg-gray-50">
				<div className="mx-auto max-w-7xl px-4">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
						<p className="text-xl text-gray-600">Loading our premium listings...</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section id="featured-properties" className="py-16 bg-gray-50">
			<div className="mx-auto max-w-7xl px-4">
				{/* Header */}
				<div className="text-center mb-12">
					<div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
						<Home className="h-8 w-8 text-blue-600" />
					</div>
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Discover our handpicked selection of premium properties
					</p>
				</div>

				{/* Properties Grid */}
				{properties.length > 0 ? (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
							{properties.map((property) => (
								<PropertyCard key={property.id} property={property} />
							))}
						</div>

						{/* View All Button */}
						<div className="text-center">
							<Button 
								size="lg" 
								className="bg-blue-600 hover:bg-blue-700"
								onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}
							>
								View All Properties
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</div>
					</>
				) : (
					<div className="text-center py-12">
						<p className="text-gray-600">No featured properties available at the moment.</p>
					</div>
				)}
			</div>
		</section>
	);
}


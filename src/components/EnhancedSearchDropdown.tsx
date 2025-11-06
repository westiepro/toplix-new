"use client";

import { MapPin, Bed, Bath } from "lucide-react";
import Image from "next/image";
import type { SearchLocation } from "@/lib/geocoding";
import type { Property } from "@/components/PropertyCard";

interface EnhancedSearchDropdownProps {
	cities: SearchLocation[];
	properties: Property[];
	propertyCounts: Record<string, number>;
	selectedIndex: number;
	onCitySelect: (city: SearchLocation) => void;
	onPropertySelect: (property: Property) => void;
}

export function EnhancedSearchDropdown({
	cities,
	properties,
	propertyCounts,
	selectedIndex,
	onCitySelect,
	onPropertySelect,
}: EnhancedSearchDropdownProps) {
	const totalItems = cities.length + properties.length;

	return (
		<div className="absolute top-full left-0 z-[1000] mt-2 w-[360px] max-h-[600px] overflow-auto rounded-xl border border-gray-200 bg-white shadow-2xl">
			{/* Cities Section */}
			{cities.length > 0 && (
				<div className="p-3">
					<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
						CITIES
					</h3>
					<div className="space-y-0.5">
						{cities.map((city, index) => {
							const isSelected = selectedIndex === index;
							const propertyCount = propertyCounts[city.name] || 0;
							
							return (
								<button
									key={city.id}
									type="button"
									onClick={() => onCitySelect(city)}
									className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
										isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
									}`}
								>
									<div className="flex items-start justify-between gap-3">
										<div className="flex items-start gap-3 flex-1 min-w-0">
											<div className="flex-shrink-0 mt-1">
												<MapPin className="h-5 w-5 text-blue-600" />
											</div>
											<div className="flex-1 min-w-0">
												<div className="font-semibold text-gray-900">
													{city.name.split(',')[0]}
												</div>
												<div className="text-sm text-gray-500">
													{city.name.split(',').slice(1).join(',').trim()}
												</div>
											</div>
										</div>
										{propertyCount > 0 && (
											<div className="flex-shrink-0">
												<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
													{propertyCount}
												</span>
											</div>
										)}
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* Properties Section */}
			{properties.length > 0 && (
				<div className="p-3 border-t border-gray-100">
					<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
						PROPERTIES
					</h3>
					<div className="space-y-0.5">
						{properties.map((property, index) => {
							const isSelected = selectedIndex === cities.length + index;
							
							return (
								<button
									key={property.id}
									type="button"
									onClick={() => onPropertySelect(property)}
									className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
										isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
									}`}
								>
									<div className="flex items-start gap-3">
										{/* Property Image */}
										<div className="flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden">
											<Image
												src={property.imageUrl}
												alt={property.address}
												fill
												className="object-cover"
												sizes="64px"
											/>
										</div>

										{/* Property Details */}
										<div className="flex-1 min-w-0">
											<div className="font-semibold text-gray-900 truncate">
												{property.address}
											</div>
											<div className="text-sm text-gray-500">
												{property.city}, {property.country || 'Portugal'}
											</div>
											<div className="flex items-center gap-3 mt-1">
												<div className="flex items-center gap-1 text-sm text-gray-600">
													<Bed className="h-4 w-4" />
													<span>{property.beds}</span>
												</div>
												<div className="flex items-center gap-1 text-sm text-gray-600">
													<Bath className="h-4 w-4" />
													<span>{property.baths}</span>
												</div>
												{property.property_type && (
													<span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
														{property.property_type}
													</span>
												)}
											</div>
										</div>

										{/* Price */}
										<div className="flex-shrink-0 text-right">
											<div className="font-bold text-blue-600">
												€{property.price.toLocaleString()}
											</div>
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* No Results */}
			{cities.length === 0 && properties.length === 0 && (
				<div className="p-8 text-center text-gray-500">
					<p>No cities or properties found</p>
					<p className="text-sm mt-1">Try a different search term</p>
				</div>
			)}
		</div>
	);
}


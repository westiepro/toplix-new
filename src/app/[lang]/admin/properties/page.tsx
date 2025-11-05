"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Edit, Eye, Download, FileDown, Trash2, ArrowUpDown, ArrowUp, ArrowDown, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PropertyImageManager, type PropertyImage } from "@/components/admin/PropertyImageManager";
import { generateFallbackPropertyUrl } from "@/lib/generate-property-url";
import { LocationMapPicker } from "@/components/admin/LocationMapPicker";
import { AVAILABLE_FEATURES, FEATURE_LABELS } from "@/lib/property-features";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const propertySchema = z.object({
	address: z.string().min(1, "Address is required"),
	city: z.string().min(1, "City is required"),
	country: z.string().min(1, "Country is required"),
	price: z.number().min(0, "Price must be positive"),
	beds: z.number().min(0),
	baths: z.number().min(0),
	area: z.number().min(0),
	type: z.string().min(1),
	company: z.string().optional(),
	lat: z.number().min(-90).max(90, "Invalid latitude"),
	lng: z.number().min(-180).max(180, "Invalid longitude"),
	description: z.string().optional(),
	features: z.array(z.string()).optional(),
	status: z.enum(["active", "inactive"]),
	show_exact_location: z.boolean(),
});

type PropertyForm = z.infer<typeof propertySchema>;

interface Property {
	id: string;
	address: string;
	city: string;
	country?: string;
	price: number;
	beds: number;
	baths: number;
	area: number;
	property_type: string;
	company?: string;
	lat: number;
	lng: number;
	description?: string;
	features?: string[];
	status?: 'active' | 'inactive';
	imageUrl?: string;
	images?: Array<{
		id: string;
		image_url: string;
		display_order: number;
		is_featured: boolean;
	}>;
}

type SortColumn = 'address' | 'city' | 'price' | 'type' | 'company' | 'beds' | 'baths' | 'status';
type SortDirection = 'asc' | 'desc' | null;

/**
 * Format address for display - remove block/unit numbers, show only street and city
 */
function formatAddressDisplay(address: string, city: string): string {
	// Remove common block/unit patterns
	let cleanAddress = address
		// Remove "Bloco X.Y, " or "Bloco X, "
		.replace(/Bloco\s+[\d.]+,?\s*/gi, '')
		// Remove "Block X, "
		.replace(/Block\s+[\d.]+,?\s*/gi, '')
		// Remove "Residence X" or "Residencia X"
		.replace(/Residen[ct]e?\s+[\d]+/gi, '')
		// Remove "Unit X"
		.replace(/Unit\s+[\d]+/gi, '')
		// Remove "Apt X" or "Apartment X"
		.replace(/Apt\.?\s+[\d]+/gi, '')
		.replace(/Apartment\s+[\d]+/gi, '')
		// Clean up multiple commas and spaces
		.replace(/,\s*,/g, ',')
		.replace(/\s+,/g, ',')
		.replace(/,\s+/g, ', ')
		.trim();

	// Remove trailing comma if any
	cleanAddress = cleanAddress.replace(/,\s*$/, '');

	return `${cleanAddress}, ${city}`;
}

export default function PropertiesPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [cityFilter, setCityFilter] = useState<string>("all");
	const [typeFilter, setTypeFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingProperty, setEditingProperty] = useState<string | null>(null);
	const [propertyImages, setPropertyImages] = useState<PropertyImage[]>([]);
	const [properties, setProperties] = useState<Property[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
	const [sortDirection, setSortDirection] = useState<SortDirection>(null);

	// Fetch properties from API
	const fetchProperties = async () => {
		try {
			const response = await fetch('/api/properties');
			const data = await response.json();
			setProperties(data.properties || []);
		} catch (error) {
			console.error('Failed to fetch properties:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProperties();
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<PropertyForm>({
		resolver: zodResolver(propertySchema),
		defaultValues: {
			address: "Rua da Praia 45",
			city: "Lagos",
			country: "Portugal",
			price: 350000,
			beds: 2,
			baths: 2,
			area: 1100,
			type: "Apartment",
			company: "",
			lat: 37.1010,
			lng: -8.6730,
			description: "",
			features: [],
			status: "active",
			show_exact_location: true,
		},
	});

	const filteredProperties = useMemo(() => {
		let filtered = properties.filter((prop) => {
			const matchesSearch = 
				prop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
				prop.city.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCity = cityFilter === "all" || prop.city === cityFilter;
			const matchesType = typeFilter === "all" || prop.property_type === typeFilter;
			const matchesStatus = statusFilter === "all" || prop.status === statusFilter;
			return matchesSearch && matchesCity && matchesType && matchesStatus;
		});

		// Apply sorting
		if (sortColumn && sortDirection) {
			filtered = [...filtered].sort((a, b) => {
				let aValue: any;
				let bValue: any;

				switch (sortColumn) {
					case 'address':
						aValue = a.address.toLowerCase();
						bValue = b.address.toLowerCase();
						break;
					case 'city':
						aValue = a.city.toLowerCase();
						bValue = b.city.toLowerCase();
						break;
					case 'price':
						aValue = a.price;
						bValue = b.price;
						break;
					case 'type':
						aValue = a.property_type.toLowerCase();
						bValue = b.property_type.toLowerCase();
						break;
					case 'company':
						aValue = (a.company || '').toLowerCase();
						bValue = (b.company || '').toLowerCase();
						break;
					case 'beds':
						aValue = a.beds;
						bValue = b.beds;
						break;
					case 'baths':
						aValue = a.baths;
						bValue = b.baths;
						break;
					case 'status':
						aValue = a.status || '';
						bValue = b.status || '';
						break;
					default:
						return 0;
				}

				if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
				if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
				return 0;
			});
		}

		return filtered;
	}, [properties, searchQuery, cityFilter, typeFilter, statusFilter, sortColumn, sortDirection]);

	const cities = Array.from(new Set(properties.map(p => p.city)));
	const types = Array.from(new Set(properties.map(p => p.property_type)));

	// Auto-translate property description in background
	const autoTranslateProperty = async (propertyId: string, data: PropertyForm) => {
		try {
			// Show a subtle notification
			toast.info("Translating description to 5 languages...", {
				duration: 2000,
			});

			const response = await fetch("/api/properties/translate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					propertyId: propertyId,
					title: `${data.type} in ${data.city}`,
					description: data.description,
					address: data.address,
				}),
			});

			const result = await response.json();

			if (result.success) {
				const successCount = result.results.filter((r: any) => r.success).length;
				
				// Subtle success notification
				if (successCount > 0) {
					toast.success(`Auto-translated to ${successCount} languages`, {
						duration: 3000,
						description: "PT, ES, FR, DE, SV",
					});
				}
			}
		} catch (error) {
			// Silent fail - don't disrupt the user
			console.warn("Background translation failed:", error);
		}
	};

	const onSubmit = async (data: PropertyForm) => {
		try {
			console.log("Submitting property:", data);
			console.log("With images:", propertyImages);
			console.log("Editing property ID:", editingProperty);
			
			// Ensure coordinates are numbers
			const propertyData = {
				...data,
				lat: typeof data.lat === 'number' ? data.lat : parseFloat(data.lat as any) || 0,
				lng: typeof data.lng === 'number' ? data.lng : parseFloat(data.lng as any) || 0,
			};
			
			console.log("Processed property data:", propertyData);
			
			// Determine if we're creating or updating
			const isEditing = !!editingProperty;
			const method = isEditing ? 'PUT' : 'POST';
			
			// Save property to Supabase via API
			const response = await fetch('/api/properties', {
				method: method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: editingProperty, // Only used for PUT
					property: propertyData,
					images: propertyImages,
				}),
			});

			if (!response.ok) {
				const errorText = await response.text();
				console.error("API Error Response:", errorText);
				console.error("Response status:", response.status);
				
				let error;
				try {
					error = JSON.parse(errorText);
				} catch (e) {
					error = { error: errorText || 'Failed to save property' };
				}
				
				console.error("Parsed API Error:", error);
				throw new Error(error.details || error.error || 'Failed to save property');
			}

		const result = await response.json();
		console.log("Property saved successfully:", result);
		
		// Get the saved property ID
		const savedPropertyId = result.property?.id || editingProperty;
		
		// Close dialog and reset form
		setIsDialogOpen(false);
		reset();
		setEditingProperty(null);
		setPropertyImages([]);
		
		// Refetch properties
		await fetchProperties();
		
		// Show success toast
		const action = isEditing ? 'updated' : 'created';
		toast.success(`Property ${action} successfully`, {
			description: `${data.address} • ${propertyImages.length} image${propertyImages.length !== 1 ? 's' : ''}`,
		});
		
		// 🎯 AUTO-TRANSLATE DESCRIPTION (if exists)
		if (savedPropertyId && data.description && data.description.trim().length > 0) {
			// Start translation in background (don't wait for it)
			autoTranslateProperty(savedPropertyId, data);
		}
	} catch (error) {
		console.error("Error saving property:", error);
		const errorMessage = error instanceof Error ? error.message : 'Failed to save property';
		
		// Show error toast
		toast.error('Failed to save property', {
			description: errorMessage,
		});
		}
	};

	const handleEdit = (property: Property) => {
		setEditingProperty(property.id);
		reset({
			address: property.address,
			city: property.city,
			country: property.country || 'Portugal',
			price: property.price,
			beds: property.beds,
			baths: property.baths,
			area: property.area,
			type: property.property_type,
			company: property.company || '',
			lat: property.lat,
			lng: property.lng,
			description: property.description || '',
			features: property.features || [],
			status: (property.status as "active" | "inactive") || "active",
			show_exact_location: (property as any).show_exact_location !== false,
		});
		
	// Load existing images from the property
	const existingImages: PropertyImage[] = (property.images || [])
		.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
		.map((img, index) => ({
			id: img.id || `img-${index}`,
			url: img.image_url,
			display_order: img.display_order !== undefined ? img.display_order : index,
			is_featured: img.is_featured !== undefined ? img.is_featured : index === 0,
			style_name: (img as any).style_name || undefined,
			is_original: (img as any).is_original || false,
			image_category: (img as any).image_category || 'gallery',
		}));
	
	console.log('Loading images for property:', property.id, existingImages);
	setPropertyImages(existingImages);
		
		setIsDialogOpen(true);
	};

	const handleSort = (column: SortColumn) => {
		if (sortColumn === column) {
			// Cycle through: asc -> desc -> null
			if (sortDirection === 'asc') {
				setSortDirection('desc');
			} else if (sortDirection === 'desc') {
				setSortColumn(null);
				setSortDirection(null);
			}
		} else {
			setSortColumn(column);
			setSortDirection('asc');
		}
	};

	const getSortIcon = (column: SortColumn) => {
		if (sortColumn !== column) {
			return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
		}
		if (sortDirection === 'asc') {
			return <ArrowUp className="h-4 w-4 text-blue-600" />;
		}
		return <ArrowDown className="h-4 w-4 text-blue-600" />;
	};

	const handleExport = (format: "csv" | "pdf") => {
		// TODO: Implement CSV/PDF export
		console.log(`Exporting as ${format}`);
		alert(`Exporting ${filteredProperties.length} properties as ${format.toUpperCase()}`);
	};

	const handleDeleteClick = (property: Property) => {
		setPropertyToDelete(property);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!propertyToDelete) return;

		setIsDeleting(true);
		const propertyAddress = propertyToDelete.address;
		
		try {
			const response = await fetch(`/api/properties/${propertyToDelete.id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'Failed to delete property');
			}

			// Success - refetch properties and close dialog
			await fetchProperties();
			setDeleteDialogOpen(false);
			setPropertyToDelete(null);
			
			// Show success toast
			toast.success('Property deleted', {
				description: `"${propertyAddress}" has been removed from the database`,
			});
		} catch (error) {
			console.error('Error deleting property:', error);
			const errorMessage = error instanceof Error ? error.message : 'Failed to delete property';
			
			// Show error toast
			toast.error('Failed to delete property', {
				description: errorMessage,
			});
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "All Properties" }]} />

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">All Properties</h1>
					<p className="text-muted-foreground">View details from all properties on the website</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={() => handleExport("csv")} className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
						<Download className="h-4 w-4 mr-2" />
						Export CSV
					</Button>
					<Button variant="outline" onClick={() => handleExport("pdf")} className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
						<FileDown className="h-4 w-4 mr-2" />
						Export PDF
					</Button>
					<Button onClick={() => { 
						setEditingProperty(null); 
						reset({
							address: "Rua da Praia 45",
							city: "Lagos",
							country: "Portugal",
							price: 350000,
							beds: 2,
							baths: 2,
							area: 1100,
							type: "Apartment",
							company: "",
							lat: 37.1010,
							lng: -8.6730,
							description: "",
							status: "active",
						}); 
						setPropertyImages([]); 
						setIsDialogOpen(true);
					}} className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30">
						<Plus className="h-4 w-4 mr-2" />
						Add Property
					</Button>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogContent className="!max-w-[80vw] !w-[80vw] max-h-[90vh] overflow-y-auto">
							<DialogHeader>
								<div className="flex items-start justify-between">
									<div>
										<DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
										<DialogDescription>
											{editingProperty ? "Update property information and images" : "Create a new property listing with images"}
										</DialogDescription>
									</div>
									<div className="flex gap-2">
										<Button type="button" variant="outline" onClick={() => {
											setIsDialogOpen(false);
											setPropertyImages([]);
										}}>
											Cancel
										</Button>
										<Button type="submit" form="property-form" className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white">
											Save Property
										</Button>
									</div>
								</div>
							</DialogHeader>
							<form id="property-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
								<div className="grid grid-cols-2 gap-4">
									{/* Location Map Picker - replaces address, city, country, lat, lng fields */}
									<div className="col-span-2">
								<LocationMapPicker
									initialLat={watch("lat")}
									initialLng={watch("lng")}
									onLocationSelect={(location) => {
										setValue("address", location.address);
										setValue("city", location.city);
										setValue("country", location.country);
										setValue("lat", location.lat);
										setValue("lng", location.lng);
									}}
								/>
							</div>

							{/* Hidden fields to store the values */}
							<input type="hidden" {...register("address")} />
							<input type="hidden" {...register("city")} />
							<input type="hidden" {...register("country")} />
							<input type="hidden" {...register("lat", { valueAsNumber: true })} />
							<input type="hidden" {...register("lng", { valueAsNumber: true })} />

							{/* Location Privacy Toggle - Below Map */}
							<div className="col-span-2">
								<div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
									<div className="flex-1">
										<label htmlFor="show-exact-location" className="font-medium text-sm cursor-pointer flex items-center gap-2">
											<MapPin className="h-4 w-4 text-blue-600" />
											Show Exact Location on Maps
										</label>
										<p className="text-xs text-gray-600 mt-1">
											If disabled, a 1km radius circle will be shown instead of the exact pin for privacy protection
										</p>
									</div>
									<Switch
										id="show-exact-location"
										checked={watch("show_exact_location") !== false}
										onCheckedChange={(checked) => setValue("show_exact_location", checked)}
									/>
								</div>
							</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Price</label>
										<Input 
											type="number" 
											{...register("price", { valueAsNumber: true })} 
											placeholder="350000" 
										/>
										{errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Type</label>
										<Select value={watch("type")} onValueChange={(value) => setValue("type", value)}>
											<SelectTrigger>
												<SelectValue placeholder="Select type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Apartment">Apartment</SelectItem>
												<SelectItem value="Villa">Villa</SelectItem>
												<SelectItem value="Townhouse">Townhouse</SelectItem>
												<SelectItem value="Land">Land</SelectItem>
												<SelectItem value="Commercial">Commercial</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Company</label>
										<Input 
											{...register("company")} 
											placeholder="Real Estate Company Name" 
										/>
										<p className="text-xs text-muted-foreground">Which company this property belongs to (optional)</p>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Bedrooms</label>
										<Input 
											type="number" 
											{...register("beds", { valueAsNumber: true })} 
											placeholder="2" 
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Bathrooms</label>
										<Input 
											type="number" 
											{...register("baths", { valueAsNumber: true })} 
											placeholder="2" 
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Area (sqft)</label>
										<Input 
											type="number" 
											{...register("area", { valueAsNumber: true })} 
											placeholder="1100" 
										/>
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">Status</label>
										<Select value={watch("status")} onValueChange={(value) => setValue("status", value as "active" | "inactive")}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="active">
													<div className="flex items-center gap-2">
														<div className="w-2 h-2 rounded-full bg-green-500"></div>
														Active
													</div>
												</SelectItem>
												<SelectItem value="inactive">
													<div className="flex items-center gap-2">
														<div className="w-2 h-2 rounded-full bg-gray-400"></div>
														Inactive
													</div>
												</SelectItem>
											</SelectContent>
										</Select>
										<p className="text-xs text-muted-foreground">Active properties are visible to users on the website</p>
									</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Latitude</label>
									<Input 
										type="text"
										value={watch("lat")?.toFixed(6) || ""}
										readOnly
										placeholder="37.1010"
										className="bg-gray-50 cursor-not-allowed"
									/>
									{errors.lat && <p className="text-sm text-destructive">{errors.lat.message}</p>}
									<p className="text-xs text-gray-500">Auto-filled from map selection</p>
								</div>
								<div className="space-y-2">
									<label className="text-sm font-medium">Longitude</label>
									<Input 
										type="text"
										value={watch("lng")?.toFixed(6) || ""}
										readOnly
										placeholder="-8.6730"
										className="bg-gray-50 cursor-not-allowed"
									/>
									{errors.lng && <p className="text-sm text-destructive">{errors.lng.message}</p>}
							<p className="text-xs text-gray-500">Auto-filled from map selection</p>
						</div>

									<div className="space-y-2 col-span-2">
										<label className="text-sm font-medium">Description (Optional)</label>
										<textarea 
											{...register("description")} 
											placeholder="Beautiful property in the heart of Lagos..."
											className="w-full min-h-[80px] px-3 py-2 border rounded-md"
										/>
										{errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
									</div>
									
									{/* Property Features */}
									<div className="space-y-3 col-span-2">
										<label className="text-sm font-medium">Property Features</label>
										<div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border rounded-md bg-gray-50">
											{AVAILABLE_FEATURES.map((feature) => (
												<div key={feature} className="flex items-center space-x-2">
													<Checkbox
														id={`feature-${feature}`}
														checked={watch("features")?.includes(feature) || false}
														onCheckedChange={(checked) => {
															const currentFeatures = watch("features") || [];
															if (checked) {
																setValue("features", [...currentFeatures, feature]);
															} else {
																setValue("features", currentFeatures.filter(f => f !== feature));
															}
														}}
													/>
													<Label
														htmlFor={`feature-${feature}`}
														className="text-sm font-normal cursor-pointer"
													>
														{FEATURE_LABELS[feature]}
													</Label>
												</div>
											))}
										</div>
										<p className="text-xs text-gray-500">
											Selected {watch("features")?.length || 0} of {AVAILABLE_FEATURES.length} features
										</p>
									</div>
								</div>

								{/* Image Management Section */}
								<div className="border-t pt-6">
									<PropertyImageManager
										images={propertyImages}
										onChange={setPropertyImages}
										maxImages={8}
									/>
								</div>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* Filters */}
			<Card className="shadow-md border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
				<CardContent className="pt-6">
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
							<Input
								placeholder="Search properties..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 border-slate-300 dark:border-slate-700 focus:ring-emerald-500 focus:border-emerald-500"
							/>
						</div>
						<Select value={cityFilter} onValueChange={setCityFilter}>
							<SelectTrigger className="w-[180px] border-slate-300 dark:border-slate-700">
								<SelectValue placeholder="All Cities" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Cities</SelectItem>
								{cities.map((city) => (
									<SelectItem key={city} value={city}>{city}</SelectItem>
								))}
							</SelectContent>
						</Select>
					<Select value={typeFilter} onValueChange={setTypeFilter}>
						<SelectTrigger className="w-[180px] border-slate-300 dark:border-slate-700">
							<SelectValue placeholder="All Types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Types</SelectItem>
							{types.map((type) => (
								<SelectItem key={type} value={type}>{type}</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select value={statusFilter} onValueChange={setStatusFilter}>
						<SelectTrigger className="w-[180px] border-slate-300 dark:border-slate-700">
							<SelectValue placeholder="All Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Status</SelectItem>
							<SelectItem value="active">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-green-500"></div>
									Active
								</div>
							</SelectItem>
							<SelectItem value="inactive">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-gray-400"></div>
									Inactive
								</div>
							</SelectItem>
							<SelectItem value="draft">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 rounded-full bg-yellow-500"></div>
									Draft
								</div>
							</SelectItem>
						</SelectContent>
					</Select>
					</div>
				</CardContent>
			</Card>

			{/* Properties Table */}
			<Card className="shadow-lg border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
				<CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800">
					<CardTitle className="text-emerald-900 dark:text-emerald-100">
						All Properties ({filteredProperties.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<div className="text-center py-8 text-muted-foreground">Loading properties...</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px]">Image</TableHead>
									<TableHead>
										<button
											onClick={() => handleSort('address')}
											className="flex items-center gap-2 hover:text-foreground transition-colors"
										>
											Address
											{getSortIcon('address')}
										</button>
									</TableHead>
									<TableHead>
										<button
											onClick={() => handleSort('city')}
											className="flex items-center gap-2 hover:text-foreground transition-colors"
										>
											City
											{getSortIcon('city')}
										</button>
									</TableHead>
									<TableHead>
										<button
											onClick={() => handleSort('price')}
											className="flex items-center gap-2 hover:text-foreground transition-colors"
										>
											Price
											{getSortIcon('price')}
										</button>
									</TableHead>
									<TableHead>
										<button
											onClick={() => handleSort('type')}
											className="flex items-center gap-2 hover:text-foreground transition-colors"
										>
											Type
											{getSortIcon('type')}
										</button>
									</TableHead>
									<TableHead>
										<button
											onClick={() => handleSort('company')}
											className="flex items-center gap-2 hover:text-foreground transition-colors"
										>
											Company
											{getSortIcon('company')}
										</button>
									</TableHead>
									<TableHead>
										<button
											onClick={() => handleSort('beds')}
											className="flex items-center gap-2 hover:text-foreground transition-colors"
										>
											Beds
											{getSortIcon('beds')}
										</button>
									</TableHead>
									<TableHead>
										<button
											onClick={() => handleSort('baths')}
											className="flex items-center gap-2 hover:text-foreground transition-colors"
										>
											Baths
											{getSortIcon('baths')}
										</button>
									</TableHead>
									<TableHead>
										<button
											onClick={() => handleSort('status')}
											className="flex items-center gap-2 hover:text-foreground transition-colors"
										>
											Status
											{getSortIcon('status')}
										</button>
									</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredProperties.length === 0 ? (
									<TableRow>
										<TableCell colSpan={10} className="text-center text-muted-foreground">
											No properties found
										</TableCell>
									</TableRow>
								) : (
									filteredProperties.map((property) => (
										<TableRow key={property.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
											<TableCell>
												<div className="relative w-20 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700">
													{property.imageUrl ? (
														<Image
															src={property.imageUrl}
															alt={property.address}
															fill
															className="object-cover"
															sizes="80px"
														/>
													) : (
														<div className="flex items-center justify-center h-full text-xs text-slate-400">
															No image
														</div>
													)}
												</div>
											</TableCell>
											<TableCell className="font-semibold text-slate-900 dark:text-slate-100">
												{formatAddressDisplay(property.address, property.city)}
											</TableCell>
											<TableCell className="text-slate-700 dark:text-slate-300">{property.city}</TableCell>
											<TableCell className="font-semibold text-emerald-600 dark:text-emerald-400">€{property.price.toLocaleString()}</TableCell>
											<TableCell>
												<span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
													{property.property_type}
												</span>
											</TableCell>
											<TableCell className="text-slate-700 dark:text-slate-300">
												{property.company || <span className="text-slate-400 italic">Not assigned</span>}
											</TableCell>
											<TableCell className="text-slate-700 dark:text-slate-300">{property.beds}</TableCell>
											<TableCell className="text-slate-700 dark:text-slate-300">{property.baths}</TableCell>
											<TableCell>
												{property.status === 'active' ? (
													<Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-sm">
														Active
													</Badge>
												) : (
													<Badge variant="secondary" className="bg-slate-400 hover:bg-slate-500 text-white shadow-sm">
														Inactive
													</Badge>
												)}
											</TableCell>
											<TableCell className="text-right">
												<div className="flex justify-end gap-1">
													<Button variant="ghost" size="icon" asChild className="hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400">
														<a href={generateFallbackPropertyUrl(property, 'en')} target="_blank">
															<Eye className="h-4 w-4" />
														</a>
													</Button>
													<Button 
														variant="ghost" 
														size="icon"
														onClick={() => handleEdit(property)}
														className="hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400"
													>
														<Edit className="h-4 w-4" />
													</Button>
													<Button 
														variant="ghost" 
														size="icon"
														onClick={() => handleDeleteClick(property)}
														className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
													>
														<Trash2 className="h-4 w-4" />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Property</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this property? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					{propertyToDelete && (
						<div className="bg-muted p-4 rounded-lg space-y-2">
							<div className="font-medium">{propertyToDelete.address}</div>
							<div className="text-sm text-muted-foreground">
								{propertyToDelete.city} • €{propertyToDelete.price.toLocaleString()} • {propertyToDelete.property_type}
							</div>
						</div>
					)}
					<div className="flex justify-end gap-2">
						<Button 
							variant="outline" 
							onClick={() => {
								setDeleteDialogOpen(false);
								setPropertyToDelete(null);
							}}
							disabled={isDeleting}
						>
							Cancel
						</Button>
						<Button 
							variant="destructive" 
							onClick={handleDeleteConfirm}
							disabled={isDeleting}
						>
							{isDeleting ? "Deleting..." : "Delete Property"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}


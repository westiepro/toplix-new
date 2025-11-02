"use client";

import { useState, useMemo } from "react";
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
	DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Eye, Download, FileDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const propertySchema = z.object({
	address: z.string().min(1, "Address is required"),
	city: z.string().min(1, "City is required"),
	price: z.number().min(0, "Price must be positive"),
	beds: z.number().min(0),
	baths: z.number().min(0),
	area: z.number().min(0),
	type: z.string().min(1),
	status: z.enum(["active", "draft"]),
});

type PropertyForm = z.infer<typeof propertySchema>;

// Mock properties data
const mockProperties = [
	{ id: "1", address: "Rua da Praia 45", city: "Lagos", price: 350000, beds: 2, baths: 2, area: 1100, type: "Apartment", agent: "John Doe", views: 1240, status: "active" },
	{ id: "2", address: "Avenida da República 120", city: "Faro", price: 485000, beds: 3, baths: 2, area: 1500, type: "Villa", agent: "Jane Smith", views: 980, status: "active" },
	{ id: "3", address: "Praia da Falésia", city: "Albufeira", price: 620000, beds: 4, baths: 3, area: 2200, type: "Villa", agent: "Mike Johnson", views: 876, status: "active" },
	{ id: "4", address: "Rua 5 de Outubro 78", city: "Tavira", price: 275000, beds: 2, baths: 1, area: 950, type: "Apartment", agent: "Sarah Williams", views: 754, status: "draft" },
	{ id: "5", address: "Marina de Vilamoura", city: "Vilamoura", price: 890000, beds: 5, baths: 4, area: 2800, type: "Villa", agent: "John Doe", views: 689, status: "active" },
];

export default function PropertiesPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [cityFilter, setCityFilter] = useState<string>("all");
	const [typeFilter, setTypeFilter] = useState<string>("all");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingProperty, setEditingProperty] = useState<string | null>(null);

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
			status: "active",
			type: "Apartment",
		},
	});

	const filteredProperties = useMemo(() => {
		return mockProperties.filter((prop) => {
			const matchesSearch = 
				prop.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
				prop.city.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCity = cityFilter === "all" || prop.city === cityFilter;
			const matchesType = typeFilter === "all" || prop.type === typeFilter;
			const matchesStatus = statusFilter === "all" || prop.status === statusFilter;
			return matchesSearch && matchesCity && matchesType && matchesStatus;
		});
	}, [searchQuery, cityFilter, typeFilter, statusFilter]);

	const cities = Array.from(new Set(mockProperties.map(p => p.city)));
	const types = Array.from(new Set(mockProperties.map(p => p.type)));

	const onSubmit = (data: PropertyForm) => {
		console.log("Save property:", data);
		// TODO: Implement save to backend
		setIsDialogOpen(false);
		reset();
		setEditingProperty(null);
	};

	const handleEdit = (property: typeof mockProperties[0]) => {
		setEditingProperty(property.id);
		reset({
			address: property.address,
			city: property.city,
			price: property.price,
			beds: property.beds,
			baths: property.baths,
			area: property.area,
			type: property.type,
			status: property.status as "active" | "draft",
		});
		setIsDialogOpen(true);
	};

	const handleExport = (format: "csv" | "pdf") => {
		// TODO: Implement CSV/PDF export
		console.log(`Exporting as ${format}`);
		alert(`Exporting ${filteredProperties.length} properties as ${format.toUpperCase()}`);
	};

	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Properties" }]} />

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Properties</h1>
					<p className="text-muted-foreground">Manage your property listings</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" onClick={() => handleExport("csv")}>
						<Download className="h-4 w-4 mr-2" />
						Export CSV
					</Button>
					<Button variant="outline" onClick={() => handleExport("pdf")}>
						<FileDown className="h-4 w-4 mr-2" />
						Export PDF
					</Button>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button onClick={() => { setEditingProperty(null); reset(); }}>
								<Plus className="h-4 w-4 mr-2" />
								Add Property
							</Button>
						</DialogTrigger>
						<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
							<DialogHeader>
								<DialogTitle>{editingProperty ? "Edit Property" : "Add New Property"}</DialogTitle>
								<DialogDescription>
									{editingProperty ? "Update property information" : "Create a new property listing"}
								</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<label className="text-sm font-medium">Address</label>
										<Input {...register("address")} placeholder="123 Main Street" />
										{errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
									</div>
									<div className="space-y-2">
										<label className="text-sm font-medium">City</label>
										<Input {...register("city")} placeholder="Lagos" />
										{errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
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
										<Select value={watch("status")} onValueChange={(value) => setValue("status", value as "active" | "draft")}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="active">Active</SelectItem>
												<SelectItem value="draft">Draft</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="flex justify-end gap-2">
									<Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
										Cancel
									</Button>
									<Button type="submit">Save Property</Button>
								</div>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search properties..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={cityFilter} onValueChange={setCityFilter}>
							<SelectTrigger className="w-[180px]">
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
							<SelectTrigger className="w-[180px]">
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
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="All Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="draft">Draft</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Properties Table */}
			<Card>
				<CardHeader>
					<CardTitle>All Properties ({filteredProperties.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Address</TableHead>
								<TableHead>City</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Agent</TableHead>
								<TableHead>Views</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredProperties.length === 0 ? (
								<TableRow>
									<TableCell colSpan={8} className="text-center text-muted-foreground">
										No properties found
									</TableCell>
								</TableRow>
							) : (
								filteredProperties.map((property) => (
									<TableRow key={property.id}>
										<TableCell className="font-medium">{property.address}</TableCell>
										<TableCell>{property.city}</TableCell>
										<TableCell>${property.price.toLocaleString()}</TableCell>
										<TableCell>{property.type}</TableCell>
										<TableCell>{property.agent}</TableCell>
										<TableCell>{property.views}</TableCell>
										<TableCell>
											<Badge variant={property.status === "active" ? "default" : "secondary"}>
												{property.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button variant="ghost" size="icon" asChild>
													<a href={`/property/${property.id}`} target="_blank">
														<Eye className="h-4 w-4" />
													</a>
												</Button>
												<Button 
													variant="ghost" 
													size="icon"
													onClick={() => handleEdit(property)}
												>
													<Edit className="h-4 w-4" />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}


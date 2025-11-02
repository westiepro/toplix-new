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
import { Search, Mail, Phone, UserPlus, UserMinus } from "lucide-react";

// Mock agents data
const mockAgents = [
	{ id: "1", name: "John Doe", email: "john@example.com", phone: "+351 912 345 678", listings: 12, inquiries: 45, deals: 8, conversion: 17.8, rating: 4.8, status: "active" },
	{ id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+351 912 345 679", listings: 15, inquiries: 52, deals: 12, conversion: 23.1, rating: 4.9, status: "active" },
	{ id: "3", name: "Mike Johnson", email: "mike@example.com", phone: "+351 912 345 680", listings: 8, inquiries: 28, deals: 6, conversion: 21.4, rating: 4.6, status: "active" },
	{ id: "4", name: "Sarah Williams", email: "sarah@example.com", phone: "+351 912 345 681", listings: 10, inquiries: 38, deals: 9, conversion: 23.7, rating: 4.9, status: "active" },
];

export default function AgentsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [sortBy, setSortBy] = useState<string>("name");
	const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

	const filteredAndSortedAgents = useMemo(() => {
		let filtered = mockAgents.filter((agent) => {
			const matchesSearch = 
				agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				agent.email.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
			return matchesSearch && matchesStatus;
		});

		// Sort
		filtered.sort((a, b) => {
			let aVal: any = a[sortBy as keyof typeof a];
			let bVal: any = b[sortBy as keyof typeof b];
			
			if (typeof aVal === "string") {
				aVal = aVal.toLowerCase();
				bVal = bVal.toLowerCase();
			}

			if (sortOrder === "asc") {
				return aVal > bVal ? 1 : -1;
			} else {
				return aVal < bVal ? 1 : -1;
			}
		});

		return filtered;
	}, [searchQuery, statusFilter, sortBy, sortOrder]);

	const handleSort = (column: string) => {
		if (sortBy === column) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortBy(column);
			setSortOrder("asc");
		}
	};

	const handleToggleStatus = (agentId: string) => {
		// TODO: Implement status toggle
		console.log("Toggle status for agent:", agentId);
	};

	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Agents" }]} />

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Agents</h1>
					<p className="text-muted-foreground">Manage your real estate agents</p>
				</div>
				<Button>
					<UserPlus className="h-4 w-4 mr-2" />
					Invite Agent
				</Button>
			</div>

			{/* Filters */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search agents..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10"
							/>
						</div>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="flex h-9 w-[180px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
						>
							<option value="all">All Status</option>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
					</div>
				</CardContent>
			</Card>

			{/* Agents Table */}
			<Card>
				<CardHeader>
					<CardTitle>All Agents ({filteredAndSortedAgents.length})</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead 
									className="cursor-pointer hover:bg-accent"
									onClick={() => handleSort("name")}
								>
									Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
								</TableHead>
								<TableHead>Contact</TableHead>
								<TableHead 
									className="cursor-pointer hover:bg-accent"
									onClick={() => handleSort("listings")}
								>
									Listings {sortBy === "listings" && (sortOrder === "asc" ? "↑" : "↓")}
								</TableHead>
								<TableHead 
									className="cursor-pointer hover:bg-accent"
									onClick={() => handleSort("inquiries")}
								>
									Inquiries {sortBy === "inquiries" && (sortOrder === "asc" ? "↑" : "↓")}
								</TableHead>
								<TableHead 
									className="cursor-pointer hover:bg-accent"
									onClick={() => handleSort("deals")}
								>
									Deals {sortBy === "deals" && (sortOrder === "asc" ? "↑" : "↓")}
								</TableHead>
								<TableHead 
									className="cursor-pointer hover:bg-accent"
									onClick={() => handleSort("conversion")}
								>
									Conversion {sortBy === "conversion" && (sortOrder === "asc" ? "↑" : "↓")}
								</TableHead>
								<TableHead>Rating</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredAndSortedAgents.length === 0 ? (
								<TableRow>
									<TableCell colSpan={9} className="text-center text-muted-foreground">
										No agents found
									</TableCell>
								</TableRow>
							) : (
								filteredAndSortedAgents.map((agent) => (
									<TableRow key={agent.id}>
										<TableCell className="font-medium">{agent.name}</TableCell>
										<TableCell>
											<div className="space-y-1">
												<div className="flex items-center gap-2 text-sm">
													<Mail className="h-3 w-3 text-muted-foreground" />
													{agent.email}
												</div>
												<div className="flex items-center gap-2 text-sm">
													<Phone className="h-3 w-3 text-muted-foreground" />
													{agent.phone}
												</div>
											</div>
										</TableCell>
										<TableCell>{agent.listings}</TableCell>
										<TableCell>{agent.inquiries}</TableCell>
										<TableCell>{agent.deals}</TableCell>
										<TableCell>
											<Badge variant={agent.conversion > 20 ? "default" : "secondary"}>
												{agent.conversion}%
											</Badge>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-1">
												<span className="font-medium">{agent.rating}</span>
												<span className="text-muted-foreground">/5.0</span>
											</div>
										</TableCell>
										<TableCell>
											<Badge variant={agent.status === "active" ? "default" : "secondary"}>
												{agent.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right">
											<Button
												variant="ghost"
												size="sm"
												onClick={() => handleToggleStatus(agent.id)}
											>
												{agent.status === "active" ? (
													<>
														<UserMinus className="h-4 w-4 mr-2" />
														Deactivate
													</>
												) : (
													<>
														<UserPlus className="h-4 w-4 mr-2" />
														Activate
													</>
												)}
											</Button>
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




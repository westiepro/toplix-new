"use client";

import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Search, Edit, Trash2, ShieldCheck, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const adminSchema = z.object({
	full_name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters").or(z.literal("")),
	role: z.enum(["Admin", "Content Manager", "Accountant", "Viewer"]),
});

type AdminForm = z.infer<typeof adminSchema>;

interface SiteAdmin {
	id: string;
	full_name: string;
	email: string;
	role: 'Admin' | 'Content Manager' | 'Accountant' | 'Viewer';
	status: 'active' | 'suspended';
	created_at: string;
	last_login?: string;
}

const ROLE_COLORS = {
	'Admin': 'bg-red-500',
	'Content Manager': 'bg-purple-500',
	'Accountant': 'bg-blue-500',
	'Viewer': 'bg-gray-500',
};

const ROLE_DESCRIPTIONS = {
	'Admin': 'Full permissions to edit all content',
	'Content Manager': 'Can edit property listings and text content',
	'Accountant': 'Can view and export payments or invoices',
	'Viewer': 'Read-only access',
};

export default function SiteAdminsPage() {
	const [admins, setAdmins] = useState<SiteAdmin[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingAdmin, setEditingAdmin] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [adminToDelete, setAdminToDelete] = useState<SiteAdmin | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [editingRole, setEditingRole] = useState<{ id: string; role: string } | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<AdminForm>({
		resolver: zodResolver(adminSchema),
		defaultValues: {
			full_name: "",
			email: "",
			password: "",
			role: "Viewer",
		},
	});

	// Fetch admins from API
	const fetchAdmins = async () => {
		try {
			const response = await fetch('/api/site-admins');
			if (!response.ok) {
				throw new Error('Failed to fetch admins');
			}
			const data = await response.json();
			setAdmins(data.admins || []);
		} catch (error) {
			console.error('Failed to fetch admins:', error);
			toast.error('Failed to load admin users');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAdmins();
	}, []);

	// Filter admins based on search
	const filteredAdmins = admins.filter((admin) => {
		const matchesSearch = 
			admin.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			admin.role.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesSearch;
	});

	const handleEdit = (admin: SiteAdmin) => {
		setEditingAdmin(admin.id);
		reset({
			full_name: admin.full_name,
			email: admin.email,
			password: "", // Don't pre-fill password for security
			role: admin.role,
		});
		setIsDialogOpen(true);
	};

	const onSubmit = async (data: AdminForm) => {
		try {
			const isEditing = !!editingAdmin;
			const url = isEditing ? `/api/site-admins/${editingAdmin}` : '/api/site-admins';
			const method = isEditing ? 'PUT' : 'POST';
			
			// For editing, only include password if it was changed
			const payload = isEditing && !data.password 
				? { full_name: data.full_name, email: data.email, role: data.role }
				: data;

			const response = await fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || `Failed to ${isEditing ? 'update' : 'create'} admin`);
			}

			const result = await response.json();
			
			// Close dialog and reset form
			setIsDialogOpen(false);
			reset();
			setEditingAdmin(null);
			
			// Refetch admins
			await fetchAdmins();
			
			// Show success toast
			const action = isEditing ? 'updated' : 'created';
			toast.success(`Admin user ${action} successfully`, {
				description: `${data.full_name} has been ${action}`,
			});
		} catch (error) {
			console.error('Error saving admin:', error);
			const errorMessage = error instanceof Error ? error.message : 'Failed to save admin';
			const action = editingAdmin ? 'update' : 'create';
			toast.error(`Failed to ${action} admin user`, {
				description: errorMessage,
			});
		}
	};

	const handleDeleteClick = (admin: SiteAdmin) => {
		setAdminToDelete(admin);
		setDeleteDialogOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!adminToDelete) return;
		
		setIsDeleting(true);
		try {
			const response = await fetch(`/api/site-admins/${adminToDelete.id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete admin');
			}

			// Close dialog
			setDeleteDialogOpen(false);
			setAdminToDelete(null);
			
			// Refetch admins
			await fetchAdmins();
			
			// Show success toast
			toast.success('Admin user deleted', {
				description: `${adminToDelete.full_name} has been removed`,
			});
		} catch (error) {
			console.error('Error deleting admin:', error);
			toast.error('Failed to delete admin user');
		} finally {
			setIsDeleting(false);
		}
	};

	const handleRoleUpdate = async (adminId: string, newRole: string) => {
		try {
			const response = await fetch(`/api/site-admins/${adminId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ role: newRole }),
			});

			if (!response.ok) {
				throw new Error('Failed to update role');
			}

			// Refetch admins
			await fetchAdmins();
			setEditingRole(null);
			
			toast.success('Role updated successfully');
		} catch (error) {
			console.error('Error updating role:', error);
			toast.error('Failed to update role');
		}
	};

	return (
		<div className="space-y-6">
			<Breadcrumbs items={[{ label: "Site Admins" }]} />

			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold">Site Admins</h1>
					<p className="text-muted-foreground">Manage admin users and their permissions</p>
				</div>
				<Button 
					onClick={() => { 
						setEditingAdmin(null);
						reset({
							full_name: "",
							email: "",
							password: "",
							role: "Viewer",
						});
						setIsDialogOpen(true);
					}}
					className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30"
				>
					<Plus className="h-4 w-4 mr-2" />
					Add New User
				</Button>
			</div>

			{/* Search */}
			<Card className="shadow-md border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
				<CardContent className="pt-6">
					<div className="relative">
						<Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
						<Input
							placeholder="Search by name, email, or role..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 border-slate-300 dark:border-slate-700 focus:ring-emerald-500 focus:border-emerald-500"
						/>
					</div>
				</CardContent>
			</Card>

			{/* Admins Table */}
			<Card className="shadow-lg border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
				<CardHeader className="border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800">
					<CardTitle className="text-emerald-900 dark:text-emerald-100">
						Admin Users ({filteredAdmins.length})
					</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{isLoading ? (
						<div className="text-center py-12 text-muted-foreground">Loading admin users...</div>
					) : (
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Admin</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Date Created</TableHead>
										<TableHead>Last Login</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredAdmins.length === 0 ? (
										<TableRow>
											<TableCell colSpan={7} className="text-center text-muted-foreground py-12">
												No admin users found
											</TableCell>
										</TableRow>
									) : (
										filteredAdmins.map((admin) => (
											<TableRow key={admin.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
												<TableCell>
													<div className="flex items-center gap-3">
														<Avatar className="h-10 w-10">
															<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold">
																{admin.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
															</AvatarFallback>
														</Avatar>
														<div>
															<div className="font-semibold text-slate-900 dark:text-slate-100">
																{admin.full_name}
															</div>
														</div>
													</div>
												</TableCell>
												<TableCell>
													<div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
														<Mail className="h-4 w-4 text-muted-foreground" />
														{admin.email}
													</div>
												</TableCell>
												<TableCell>
													{editingRole?.id === admin.id ? (
														<div className="flex items-center gap-2">
															<Select 
																value={editingRole.role} 
																onValueChange={(value) => setEditingRole({ id: admin.id, role: value })}
															>
																<SelectTrigger className="w-[180px] h-8">
																	<SelectValue />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="Admin">Admin</SelectItem>
																	<SelectItem value="Content Manager">Content Manager</SelectItem>
																	<SelectItem value="Accountant">Accountant</SelectItem>
																	<SelectItem value="Viewer">Viewer</SelectItem>
																</SelectContent>
															</Select>
															<Button 
																size="sm" 
																onClick={() => handleRoleUpdate(admin.id, editingRole.role)}
																className="h-8"
															>
																Save
															</Button>
															<Button 
																size="sm" 
																variant="ghost"
																onClick={() => setEditingRole(null)}
																className="h-8"
															>
																Cancel
															</Button>
														</div>
													) : (
														<div 
															className="flex items-center gap-2 cursor-pointer group"
															onClick={() => setEditingRole({ id: admin.id, role: admin.role })}
														>
															<Badge className={`${ROLE_COLORS[admin.role]} text-white hover:opacity-80`}>
																<ShieldCheck className="h-3 w-3 mr-1" />
																{admin.role}
															</Badge>
															<Edit className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
														</div>
													)}
													<p className="text-xs text-muted-foreground mt-1">
														{ROLE_DESCRIPTIONS[admin.role]}
													</p>
												</TableCell>
												<TableCell>
													{admin.status === 'active' ? (
														<Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
															Active
														</Badge>
													) : (
														<Badge variant="destructive">
															Suspended
														</Badge>
													)}
												</TableCell>
												<TableCell className="text-slate-700 dark:text-slate-300">
													<div className="flex items-center gap-2">
														<Calendar className="h-4 w-4 text-muted-foreground" />
														{new Date(admin.created_at).toLocaleDateString()}
													</div>
												</TableCell>
												<TableCell className="text-slate-700 dark:text-slate-300">
													{admin.last_login 
														? new Date(admin.last_login).toLocaleString()
														: <span className="text-muted-foreground italic">Never</span>
													}
												</TableCell>
												<TableCell className="text-right">
													<div className="flex justify-end gap-1">
														<Button 
															variant="ghost" 
															size="icon"
															onClick={() => handleEdit(admin)}
															className="hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400"
														>
															<Edit className="h-4 w-4" />
														</Button>
														<Button 
															variant="ghost" 
															size="icon"
															onClick={() => handleDeleteClick(admin)}
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
						</div>
					)}
				</CardContent>
			</Card>

			{/* Add/Edit Admin Dialog */}
			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<div className="flex items-start justify-between">
							<div>
								<DialogTitle>{editingAdmin ? "Edit Admin User" : "Add New Admin User"}</DialogTitle>
								<DialogDescription>
									{editingAdmin ? "Update admin user information" : "Create a new admin user account"}
								</DialogDescription>
							</div>
							<div className="flex gap-2">
								<Button type="button" variant="outline" size="sm" onClick={() => {
									setIsDialogOpen(false);
									reset();
								}}>
									Cancel
								</Button>
								<Button 
									type="submit" 
									form="admin-form" 
									size="sm"
									className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
								>
									{editingAdmin ? "Update" : "Create"} User
								</Button>
							</div>
						</div>
					</DialogHeader>
					<form id="admin-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Full Name</label>
							<Input 
								{...register("full_name")} 
								placeholder="John Doe" 
							/>
							{errors.full_name && <p className="text-sm text-destructive">{errors.full_name.message}</p>}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Email</label>
							<Input 
								type="email"
								{...register("email")} 
								placeholder="admin@example.com" 
							/>
							{errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">
								Password {editingAdmin && <span className="text-muted-foreground">(optional - leave blank to keep current)</span>}
							</label>
							<Input 
								type="password"
								{...register("password")} 
								placeholder={editingAdmin ? "Leave blank to keep current password" : "Min. 8 characters"} 
							/>
							{errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
							{!editingAdmin && (
								<p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
							)}
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Role</label>
							<Select value={watch("role")} onValueChange={(value) => setValue("role", value as any)}>
								<SelectTrigger>
									<SelectValue placeholder="Select role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Admin">
										<div className="flex items-center gap-2">
											<div className={`w-3 h-3 rounded-full ${ROLE_COLORS['Admin']}`}></div>
											<div>
												<div className="font-medium">Admin</div>
												<div className="text-xs text-muted-foreground">Full permissions</div>
											</div>
										</div>
									</SelectItem>
									<SelectItem value="Content Manager">
										<div className="flex items-center gap-2">
											<div className={`w-3 h-3 rounded-full ${ROLE_COLORS['Content Manager']}`}></div>
											<div>
												<div className="font-medium">Content Manager</div>
												<div className="text-xs text-muted-foreground">Edit properties & content</div>
											</div>
										</div>
									</SelectItem>
									<SelectItem value="Accountant">
										<div className="flex items-center gap-2">
											<div className={`w-3 h-3 rounded-full ${ROLE_COLORS['Accountant']}`}></div>
											<div>
												<div className="font-medium">Accountant</div>
												<div className="text-xs text-muted-foreground">View & export payments</div>
											</div>
										</div>
									</SelectItem>
									<SelectItem value="Viewer">
										<div className="flex items-center gap-2">
											<div className={`w-3 h-3 rounded-full ${ROLE_COLORS['Viewer']}`}></div>
											<div>
												<div className="font-medium">Viewer</div>
												<div className="text-xs text-muted-foreground">Read-only access</div>
											</div>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
							{errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
							<p className="text-xs text-muted-foreground">
								{ROLE_DESCRIPTIONS[watch("role")]}
							</p>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Admin User</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete this admin user? This action cannot be undone.
						</DialogDescription>
					</DialogHeader>
					{adminToDelete && (
						<div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg space-y-2 border border-red-200 dark:border-red-900">
							<div className="flex items-center gap-3">
								<Avatar className="h-10 w-10">
									<AvatarFallback className="bg-red-500 text-white font-bold">
										{adminToDelete.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">{adminToDelete.full_name}</div>
									<div className="text-sm text-muted-foreground">{adminToDelete.email}</div>
								</div>
							</div>
							<div className="flex items-center gap-2 mt-2">
								<Badge className={`${ROLE_COLORS[adminToDelete.role]} text-white`}>
									{adminToDelete.role}
								</Badge>
							</div>
						</div>
					)}
					<div className="flex justify-end gap-2">
						<Button 
							variant="outline" 
							onClick={() => {
								setDeleteDialogOpen(false);
								setAdminToDelete(null);
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
							{isDeleting ? "Deleting..." : "Delete User"}
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}


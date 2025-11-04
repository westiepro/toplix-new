"use client";

import { useState, useEffect, useMemo } from "react";
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
import {
  Plus,
  Search,
  Edit,
  Eye,
  Trash2,
  Building2,
  Users,
  TrendingUp,
  Euro,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import type { Company, CompanySummary } from "@/types/company";
import Link from "next/link";

type SortColumn = 'name' | 'city' | 'plan' | 'agents_count' | 'listings_count' | 'status';
type SortDirection = 'asc' | 'desc' | null;

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<CompanySummary>({
    total: 0,
    active: 0,
    suspended: 0,
    pending: 0,
    monthlyRevenue: 0,
    activeAgents: 0,
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch companies and summary
  useEffect(() => {
    fetchCompanies();
    fetchSummary();
  }, []);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/companies');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data.companies || []);
      }
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch('/api/companies/summary');
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      }
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    }
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
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

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || company.status === statusFilter;
      const matchesPlan = planFilter === "all" || company.subscription_plan === planFilter;
      const matchesCountry = countryFilter === "all" || company.country === countryFilter;
      return matchesSearch && matchesStatus && matchesPlan && matchesCountry;
    });

    // Apply sorting
    if (sortColumn && sortDirection) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any;
        let bValue: any;

        switch (sortColumn) {
          case 'name':
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case 'city':
            aValue = a.city.toLowerCase();
            bValue = b.city.toLowerCase();
            break;
          case 'plan':
            aValue = a.subscription_plan;
            bValue = b.subscription_plan;
            break;
          case 'agents_count':
            aValue = a.agents_count || 0;
            bValue = b.agents_count || 0;
            break;
          case 'listings_count':
            aValue = a.listings_count || 0;
            bValue = b.listings_count || 0;
            break;
          case 'status':
            aValue = a.status;
            bValue = b.status;
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
  }, [companies, searchQuery, statusFilter, planFilter, countryFilter, sortColumn, sortDirection]);

  const countries = Array.from(new Set(companies.map((c) => c.country)));

  const handleDeleteClick = (company: Company) => {
    setCompanyToDelete(company);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!companyToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/companies/${companyToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete company');
      }

      toast.success('Company deleted successfully');
      await fetchCompanies();
      await fetchSummary();
      setDeleteDialogOpen(false);
      setCompanyToDelete(null);
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Failed to delete company');
    } finally {
      setIsDeleting(false);
    }
  };

  const getPlanBadgeClass = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-500 hover:bg-gray-600 text-white';
      case 'standard':
        return 'bg-blue-500 hover:bg-blue-600 text-white';
      case 'premium':
        return 'bg-purple-500 hover:bg-purple-600 text-white';
      case 'enterprise':
        return 'bg-amber-500 hover:bg-amber-600 text-white';
      default:
        return '';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      case 'suspended':
        return 'bg-red-500 hover:bg-red-600 text-white';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Companies" }]} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Real Estate Companies</h1>
          <p className="text-muted-foreground">Manage companies and subscriptions</p>
        </div>
        <Link href="/en/admin/companies/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Company
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Companies</p>
                <p className="text-3xl font-bold">{summary.total}</p>
              </div>
              <Building2 className="h-10 w-10 text-blue-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Companies</p>
                <p className="text-3xl font-bold text-green-600">{summary.active}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                <p className="text-3xl font-bold">{summary.activeAgents}</p>
              </div>
              <Users className="h-10 w-10 text-purple-500 opacity-75" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                <p className="text-3xl font-bold">€{(summary.monthlyRevenue / 100).toLocaleString()}</p>
              </div>
              <Euro className="h-10 w-10 text-amber-500 opacity-75" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Plans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Companies ({filteredAndSortedCompanies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">Loading companies...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Logo</TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      Company Name
                      {getSortIcon('name')}
                    </button>
                  </TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort('city')}
                      className="flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      City / Country
                      {getSortIcon('city')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort('plan')}
                      className="flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      Plan
                      {getSortIcon('plan')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort('agents_count')}
                      className="flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      Agents
                      {getSortIcon('agents_count')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort('listings_count')}
                      className="flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      Listings
                      {getSortIcon('listings_count')}
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
                {filteredAndSortedCompanies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center text-muted-foreground">
                      No companies found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                          {company.logo_url ? (
                            <Image
                              src={company.logo_url}
                              alt={company.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Building2 className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.contact_person}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{company.email}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{company.city}</div>
                          <div className="text-muted-foreground">{company.country}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPlanBadgeClass(company.subscription_plan)}>
                          {company.subscription_plan}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{company.agents_count || 0}</TableCell>
                      <TableCell className="text-center">{company.listings_count || 0}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeClass(company.status)}>
                          {company.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/en/admin/companies/${company.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(company)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this company? This will also remove all associated agents and unlink properties.
            </DialogDescription>
          </DialogHeader>
          {companyToDelete && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="font-medium">{companyToDelete.name}</div>
              <div className="text-sm text-muted-foreground">
                {companyToDelete.city}, {companyToDelete.country} • {companyToDelete.agents_count} agents • {companyToDelete.listings_count} listings
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setCompanyToDelete(null);
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
              {isDeleting ? "Deleting..." : "Delete Company"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


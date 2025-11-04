"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Home,
  CreditCard,
  BarChart3,
  Settings,
  Mail,
  Phone,
  Globe,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Plus,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import type { Company, CompanyAgent, CompanyInvoice } from "@/types/company";
import { CompanyAgentsTab } from "./components/CompanyAgentsTab";
import { CompanyListingsTab } from "./components/CompanyListingsTab";
import { CompanyBillingTab } from "./components/CompanyBillingTab";
import { CompanyAnalyticsTab } from "./components/CompanyAnalyticsTab";
import { CompanySettingsTab } from "./components/CompanySettingsTab";

export default function CompanyDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCompany();
  }, [params.id]);

  const fetchCompany = async () => {
    try {
      const response = await fetch(`/api/companies/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCompany(data.company);
      } else {
        toast.error('Company not found');
        router.push('/en/admin/companies');
      }
    } catch (error) {
      console.error('Failed to fetch company:', error);
      toast.error('Failed to load company');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: "Companies", href: "/en/admin/companies" }, { label: "Loading..." }]} />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  const getPlanBadgeClass = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'bg-gray-500';
      case 'standard':
        return 'bg-blue-500';
      case 'premium':
        return 'bg-purple-500';
      case 'enterprise':
        return 'bg-amber-500';
      default:
        return '';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'suspended':
        return 'bg-red-500';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Companies", href: "/en/admin/companies" },
          { label: company.name },
        ]}
      />

      {/* Company Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 border">
            {company.logo_url ? (
              <Image
                src={company.logo_url}
                alt={company.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-muted-foreground">{company.city}, {company.country}</p>
            <div className="flex gap-2 mt-2">
              <Badge className={getPlanBadgeClass(company.subscription_plan)}>
                {company.subscription_plan}
              </Badge>
              <Badge className={getStatusBadgeClass(company.status)}>
                {company.status}
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="outline" asChild>
          <Link href={`/en/admin/companies/${company.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Company
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">
            <Building2 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="agents">
            <Users className="h-4 w-4 mr-2" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="listings">
            <Home className="h-4 w-4 mr-2" />
            Listings
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="h-4 w-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="mt-1">{company.description || 'No description provided'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Contact Person</p>
                    <p className="mt-1 font-medium">{company.contact_person}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tax ID</p>
                    <p className="mt-1 font-medium">{company.tax_id || 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${company.email}`} className="text-sm hover:underline">
                    {company.email}
                  </a>
                </div>
                {company.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${company.phone}`} className="text-sm hover:underline">
                      {company.phone}
                    </a>
                  </div>
                )}
                {company.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      {company.website}
                    </a>
                  </div>
                )}
                {company.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm">{company.address}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Plan</span>
                  <Badge className={getPlanBadgeClass(company.subscription_plan)}>
                    {company.subscription_plan}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Listings Limit</span>
                  <span className="font-medium">{company.listings_count || 0} / {company.listings_limit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Agents Limit</span>
                  <span className="font-medium">{company.agents_count || 0} / {company.agents_limit}</span>
                </div>
                {company.plan_end && (
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Renews On</span>
                    <span className="font-medium">{new Date(company.plan_end).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Agents</span>
                  <span className="font-bold">{company.agents_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Listings</span>
                  <span className="font-bold">{company.listings_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Member Since</span>
                  <span className="font-medium">{new Date(company.created_at).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Agents Tab */}
        <TabsContent value="agents">
          <CompanyAgentsTab companyId={params.id} />
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings">
          <CompanyListingsTab companyId={params.id} />
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <CompanyBillingTab company={company} onUpdate={fetchCompany} />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <CompanyAnalyticsTab companyId={params.id} companyName={company.name} />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <CompanySettingsTab company={company} onUpdate={fetchCompany} onDelete={() => router.push('/en/admin/companies')} />
        </TabsContent>
      </Tabs>
    </div>
  );
}


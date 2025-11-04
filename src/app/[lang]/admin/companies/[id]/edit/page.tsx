"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Building2, CreditCard, Upload, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";
import { PLAN_PRICING } from "@/lib/stripe";
import type { Company } from "@/types/company";

export default function EditCompanyPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  
  const [formData, setFormData] = useState({
    logo_url: '',
    name: '',
    description: '',
    contact_person: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    country: 'Portugal',
    tax_id: '',
    subscription_plan: 'free' as 'free' | 'standard' | 'premium' | 'enterprise',
    auto_renew: true,
  });

  useEffect(() => {
    fetchCompany();
  }, [params.id]);

  const fetchCompany = async () => {
    try {
      const response = await fetch(`/api/companies/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        const comp = data.company;
        setCompany(comp);
        
        // Populate form with existing data
        setFormData({
          logo_url: comp.logo_url || '',
          name: comp.name || '',
          description: comp.description || '',
          contact_person: comp.contact_person || '',
          email: comp.email || '',
          phone: comp.phone || '',
          website: comp.website || '',
          address: comp.address || '',
          city: comp.city || '',
          country: comp.country || 'Portugal',
          tax_id: comp.tax_id || '',
          subscription_plan: comp.subscription_plan || 'free',
          auto_renew: comp.auto_renew !== undefined ? comp.auto_renew : true,
        });
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

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    setIsUploadingLogo(true);
    try {
      const { url } = await uploadToCloudinary(file, 'companies');
      setFormData({ ...formData, logo_url: url });
      toast.success("Logo uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload logo");
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.contact_person || !formData.email || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Update company
      const response = await fetch(`/api/companies/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          listings_limit: PLAN_PRICING[formData.subscription_plan].listings,
          agents_limit: PLAN_PRICING[formData.subscription_plan].agents,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('API Error Response:', error);
        toast.error(error.details || error.error || 'Failed to update company');
        throw new Error(error.error || 'Failed to update company');
      }

      const data = await response.json();
      toast.success('Company updated successfully!');
      
      // Redirect back to company detail page
      router.push(`/en/admin/companies/${params.id}`);
    } catch (error) {
      console.error('Error updating company:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[
          { label: "Companies", href: "/en/admin/companies" },
          { label: "Loading..." }
        ]} />
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  const selectedPlan = PLAN_PRICING[formData.subscription_plan];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: "Companies", href: "/en/admin/companies" },
          { label: company?.name || "Company", href: `/en/admin/companies/${params.id}` },
          { label: "Edit" },
        ]}
      />

      <div>
        <h1 className="text-3xl font-bold">Edit Company</h1>
        <p className="text-muted-foreground">Update company information and settings</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="info">
              <Building2 className="h-4 w-4 mr-2" />
              Company Info
            </TabsTrigger>
            <TabsTrigger value="subscription">
              <CreditCard className="h-4 w-4 mr-2" />
              Subscription Plan
            </TabsTrigger>
          </TabsList>

          {/* Company Info Tab */}
          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                      {formData.logo_url ? (
                        <Image
                          src={formData.logo_url}
                          alt="Company logo"
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
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={isUploadingLogo}
                        className="cursor-pointer"
                      />
                      {isUploadingLogo && (
                        <p className="text-xs text-muted-foreground mt-1">
                          <Loader2 className="h-3 w-3 inline animate-spin mr-1" />
                          Uploading...
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Algarve Properties Ltd"
                      required
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Leading real estate company in the Algarve..."
                      className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact_person">Contact Person *</Label>
                    <Input
                      id="contact_person"
                      value={formData.contact_person}
                      onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                      placeholder="Maria Silva"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@company.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+351 912 345 678"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://company.com"
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Rua da Praia 45"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Lagos"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => setFormData({ ...formData, country: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Portugal">Portugal</SelectItem>
                        <SelectItem value="Spain">Spain</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Italy">Italy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tax_id">Tax ID / Registration Number</Label>
                    <Input
                      id="tax_id"
                      value={formData.tax_id}
                      onChange={(e) => setFormData({ ...formData, tax_id: e.target.value })}
                      placeholder="PT123456789"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription Plan Tab */}
          <TabsContent value="subscription">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Label>Select Subscription Plan</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(Object.keys(PLAN_PRICING) as Array<keyof typeof PLAN_PRICING>).map((planKey) => {
                      const plan = PLAN_PRICING[planKey];
                      const isSelected = formData.subscription_plan === planKey;
                      const isCurrent = company?.subscription_plan === planKey;

                      return (
                        <Card
                          key={planKey}
                          className={`cursor-pointer transition-all ${
                            isSelected
                              ? 'ring-2 ring-blue-600 bg-blue-50'
                              : 'hover:shadow-md'
                          } ${isCurrent ? 'border-green-500' : ''}`}
                          onClick={() => setFormData({ ...formData, subscription_plan: planKey })}
                        >
                          <CardContent className="pt-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-bold capitalize">{planKey}</h3>
                                  {isCurrent && (
                                    <span className="text-xs text-green-600 font-medium">Current Plan</span>
                                  )}
                                </div>
                                <p className="text-2xl font-bold">
                                  €{(plan.price / 100).toFixed(2)}
                                  <span className="text-sm text-muted-foreground">/month</span>
                                </p>
                              </div>
                              <div className="space-y-2">
                                {plan.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                                      <div className="w-2 h-2 rounded-full bg-green-600" />
                                    </div>
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="auto_renew"
                    checked={formData.auto_renew}
                    onChange={(e) => setFormData({ ...formData, auto_renew: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="auto_renew" className="cursor-pointer">
                    Auto-renew subscription
                  </Label>
                </div>

                {formData.subscription_plan !== company?.subscription_plan && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 Changing the plan will update the listings and agents limits.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Actions */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/en/admin/companies/${params.id}`)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </Tabs>
      </form>
    </div>
  );
}


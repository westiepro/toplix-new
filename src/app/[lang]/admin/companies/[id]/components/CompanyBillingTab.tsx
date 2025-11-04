"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, TrendingUp, Calendar, FileText, Plus, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Company, CompanyInvoice } from "@/types/company";
import { PLAN_PRICING } from "@/lib/stripe";

interface CompanyBillingTabProps {
  company: Company;
  onUpdate: () => void;
}

export function CompanyBillingTab({ company, onUpdate }: CompanyBillingTabProps) {
  const [invoices, setInvoices] = useState<CompanyInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>(company.subscription_plan);

  useEffect(() => {
    fetchInvoices();
  }, [company.id]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`/api/companies/${company.id}/invoices`);
      if (response.ok) {
        const data = await response.json();
        setInvoices(data.invoices || []);
      }
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentPlan = PLAN_PRICING[company.subscription_plan as keyof typeof PLAN_PRICING];
  const listingsUsage = ((company.listings_count || 0) / company.listings_limit) * 100;
  const agentsUsage = ((company.agents_count || 0) / company.agents_limit) * 100;

  const handleUpgradePlan = async () => {
    try {
      // Update company subscription plan
      const response = await fetch(`/api/companies/${company.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription_plan: selectedPlan,
          listings_limit: PLAN_PRICING[selectedPlan as keyof typeof PLAN_PRICING].listings,
          agents_limit: PLAN_PRICING[selectedPlan as keyof typeof PLAN_PRICING].agents,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade plan');
      }

      toast.success('Plan updated successfully!');
      setIsUpgradeDialogOpen(false);
      onUpdate();
    } catch (error) {
      console.error('Error upgrading plan:', error);
      toast.error('Failed to update plan');
    }
  };

  const handleSendInvoice = async () => {
    try {
      // Create new invoice
      const response = await fetch(`/api/companies/${company.id}/invoices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: currentPlan.price,
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
          status: 'unpaid',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }

      toast.success('Invoice created successfully!');
      fetchInvoices();
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice');
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'unpaid':
        return <Badge className="bg-yellow-500">Unpaid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-500">Overdue</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold capitalize">{company.subscription_plan} Plan</h3>
              <p className="text-3xl font-bold mt-2">
                €{(currentPlan.price / 100).toFixed(2)}
                <span className="text-sm text-muted-foreground font-normal">/month</span>
              </p>
            </div>
            <Button onClick={() => setIsUpgradeDialogOpen(true)}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Upgrade Plan
            </Button>
          </div>

          {/* Usage Meters */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Property Listings</span>
                <span>{company.listings_count || 0} / {company.listings_limit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    listingsUsage > 90 ? 'bg-red-500' : listingsUsage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(listingsUsage, 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Agent Accounts</span>
                <span>{company.agents_count || 0} / {company.agents_limit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    agentsUsage > 90 ? 'bg-red-500' : agentsUsage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(agentsUsage, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {company.plan_end && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next billing date: {new Date(company.plan_end).toLocaleDateString()}</span>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleSendInvoice}>
              <FileText className="h-4 w-4 mr-2" />
              Send Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
            </div>
          ) : invoices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No invoices yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Paid Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                    <TableCell>€{(invoice.amount / 100).toFixed(2)}</TableCell>
                    <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {invoice.paid_date ? new Date(invoice.paid_date).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>{getInvoiceStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Upgrade Plan Dialog */}
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Upgrade Subscription Plan</DialogTitle>
            <DialogDescription>
              Choose a plan that fits your company's needs
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {(Object.keys(PLAN_PRICING) as Array<keyof typeof PLAN_PRICING>).map((planKey) => {
              const plan = PLAN_PRICING[planKey];
              const isSelected = selectedPlan === planKey;
              const isCurrent = company.subscription_plan === planKey;

              return (
                <Card
                  key={planKey}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-blue-600 bg-blue-50' : 'hover:shadow-md'
                  } ${isCurrent ? 'border-green-500' : ''}`}
                  onClick={() => setSelectedPlan(planKey)}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold capitalize">{planKey}</h3>
                          {isCurrent && (
                            <Badge className="bg-green-500 mt-1">Current Plan</Badge>
                          )}
                        </div>
                        <p className="text-2xl font-bold">
                          €{(plan.price / 100).toFixed(2)}
                          <span className="text-sm text-muted-foreground">/mo</span>
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
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsUpgradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpgradePlan}
              disabled={selectedPlan === company.subscription_plan}
            >
              Update Plan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


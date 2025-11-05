"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Key, Trash2, Loader2, Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import type { Company } from "@/types/company";

interface CompanySettingsTabProps {
  company: Company;
  onUpdate: () => void;
  onDelete: () => void;
}

export function CompanySettingsTab({ company, onUpdate, onDelete }: CompanySettingsTabProps) {
  const [notes, setNotes] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleStatus = async () => {
    const newStatus = company.status === 'active' ? 'suspended' : 'active';
    
    try {
      const response = await fetch(`/api/companies/${company.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Status update error:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to update status');
      }

      const result = await response.json();
      console.log('Status updated successfully:', result);
      
      toast.success(`Company ${newStatus === 'active' ? 'activated' : 'suspended'}!`);
      onUpdate();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status', {
        description: error instanceof Error ? error.message : 'Please try again'
      });
    }
  };

  const handleGenerateApiKey = () => {
    const key = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setApiKey(key);
    setShowApiKey(true);
    toast.success('API Key generated!');
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success('API Key copied to clipboard');
  };

  const handleDeleteCompany = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/companies/${company.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Delete error:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to delete company');
      }

      toast.success('Company deleted successfully');
      setIsDeleteDialogOpen(false);
      onDelete();
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Failed to delete company', {
        description: error instanceof Error ? error.message : 'Please try again'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Company Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Active Status</Label>
              <p className="text-sm text-muted-foreground">
                {company.status === 'active' 
                  ? 'Company is currently active and can access all features'
                  : 'Company is suspended and cannot access the platform'
                }
              </p>
            </div>
            <Switch
              checked={company.status === 'active'}
              onCheckedChange={handleToggleStatus}
            />
          </div>
        </CardContent>
      </Card>

      {/* API Key Management */}
      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showApiKey && apiKey ? (
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="flex gap-2">
                <Input value={apiKey} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="icon" onClick={handleCopyApiKey}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Save this key securely. It won't be shown again.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Generate an API key for this company to access the platform programmatically.
              </p>
              <Button onClick={handleGenerateApiKey} variant="outline">
                <Key className="h-4 w-4 mr-2" />
                Generate New API Key
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Internal Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Internal Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add internal notes about this company (visible to admins only)..."
            className="w-full min-h-[120px] px-3 py-2 border rounded-md"
          />
          <Button variant="outline">
            Save Notes
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Deleting this company will permanently remove all associated agents and unlink all properties.
              This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Company
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete {company.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="text-sm font-medium text-red-900">This will:</p>
            <ul className="list-disc list-inside text-sm text-red-800 mt-2 space-y-1">
              <li>Delete all {company.agents_count || 0} associated agents</li>
              <li>Unlink {company.listings_count || 0} properties</li>
              <li>Remove all invoices and payment history</li>
              <li>Cancel active subscriptions</li>
            </ul>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCompany}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Permanently
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


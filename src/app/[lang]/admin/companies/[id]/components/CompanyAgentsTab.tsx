"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { CompanyAgent } from "@/types/company";

interface CompanyAgentsTabProps {
  companyId: string;
}

export function CompanyAgentsTab({ companyId }: CompanyAgentsTabProps) {
  const [agents, setAgents] = useState<CompanyAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'agent' as 'manager' | 'agent' | 'marketing',
  });

  useEffect(() => {
    fetchAgents();
  }, [companyId]);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`/api/companies/${companyId}/agents`);
      if (response.ok) {
        const data = await response.json();
        setAgents(data.agents || []);
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAgent = async () => {
    if (!newAgent.name || !newAgent.email) {
      toast.error('Name and email are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/companies/${companyId}/agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAgent),
      });

      if (!response.ok) {
        throw new Error('Failed to add agent');
      }

      toast.success('Agent added successfully!');
      setIsAddDialogOpen(false);
      setNewAgent({ name: '', email: '', phone: '', role: 'agent' });
      fetchAgents();
    } catch (error) {
      console.error('Error adding agent:', error);
      toast.error('Failed to add agent');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAgent = async (agentId: string) => {
    if (!confirm('Are you sure you want to remove this agent?')) return;

    try {
      const response = await fetch(`/api/companies/${companyId}/agents?agentId=${agentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete agent');
      }

      toast.success('Agent removed successfully');
      fetchAgents();
    } catch (error) {
      console.error('Error deleting agent:', error);
      toast.error('Failed to remove agent');
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-blue-500';
      case 'agent':
        return 'bg-green-500';
      case 'marketing':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Company Agents ({agents.length})</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Agent
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
          </div>
        ) : agents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No agents added yet</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Agent
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Listings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{agent.email}</TableCell>
                  <TableCell className="text-sm">{agent.phone || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeClass(agent.role)}>
                      {agent.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{agent.listings_count}</TableCell>
                  <TableCell>
                    <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteAgent(agent.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Add Agent Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Agent</DialogTitle>
            <DialogDescription>
              Add a new agent to this company
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Name *</Label>
              <Input
                id="agent-name"
                value={newAgent.name}
                onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-email">Email *</Label>
              <Input
                id="agent-email"
                type="email"
                value={newAgent.email}
                onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                placeholder="john@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-phone">Phone</Label>
              <Input
                id="agent-phone"
                value={newAgent.phone}
                onChange={(e) => setNewAgent({ ...newAgent, phone: e.target.value })}
                placeholder="+351 912 345 678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent-role">Role</Label>
              <Select
                value={newAgent.role}
                onValueChange={(value: any) => setNewAgent({ ...newAgent, role: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="agent">Agent</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleAddAgent} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add Agent'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}


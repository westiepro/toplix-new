export interface Company {
  id: string;
  logo_url?: string;
  name: string;
  description?: string;
  contact_person: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  city: string;
  country: string;
  tax_id?: string;
  status: 'active' | 'pending' | 'suspended';
  subscription_plan: 'free' | 'standard' | 'premium' | 'enterprise';
  plan_start?: string;
  plan_end?: string;
  listings_limit: number;
  agents_limit: number;
  payment_status: 'paid' | 'unpaid' | 'overdue';
  stripe_customer_id?: string;
  auto_renew: boolean;
  created_at: string;
  updated_at: string;
  // Computed fields
  agents_count?: number;
  listings_count?: number;
}

export interface CompanyAgent {
  id: string;
  company_id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'manager' | 'agent' | 'marketing';
  listings_count: number;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface CompanyInvoice {
  id: string;
  company_id: string;
  invoice_number: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue' | 'cancelled';
  stripe_invoice_id?: string;
  due_date: string;
  paid_date?: string;
  created_at: string;
}

export interface CompanySummary {
  total: number;
  active: number;
  suspended: number;
  pending: number;
  monthlyRevenue: number;
  activeAgents: number;
}


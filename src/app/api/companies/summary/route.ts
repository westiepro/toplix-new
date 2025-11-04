import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get total companies count
    const { count: total } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true });

    // Get active companies count
    const { count: active } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Get suspended companies count
    const { count: suspended } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'suspended');

    // Get pending companies count
    const { count: pending } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get active agents count
    const { count: activeAgents } = await supabase
      .from('company_agents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // Calculate monthly revenue (sum of paid invoices from this month)
    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const { data: paidInvoices } = await supabase
      .from('company_invoices')
      .select('amount')
      .eq('status', 'paid')
      .gte('paid_date', firstDayOfMonth.toISOString());

    const monthlyRevenue = (paidInvoices || []).reduce(
      (sum, invoice) => sum + (invoice.amount || 0),
      0
    );

    return NextResponse.json({
      summary: {
        total: total || 0,
        active: active || 0,
        suspended: suspended || 0,
        pending: pending || 0,
        monthlyRevenue,
        activeAgents: activeAgents || 0,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


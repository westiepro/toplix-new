import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: invoices, error } = await supabase
      .from('company_invoices')
      .select('*')
      .eq('company_id', id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch invoices', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      invoices: invoices || [],
      count: invoices?.length || 0,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    const invoice = await request.json();

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate invoice number if not provided
    const invoiceNumber = invoice.invoice_number || `INV-${Date.now()}`;

    const { data: newInvoice, error } = await supabase
      .from('company_invoices')
      .insert({
        company_id: id,
        invoice_number: invoiceNumber,
        ...invoice,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create invoice', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      invoice: newInvoice,
      message: 'Invoice created successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


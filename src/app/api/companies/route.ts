import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const plan = searchParams.get('plan');
    const country = searchParams.get('country');
    const search = searchParams.get('search');

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Build query
    let query = supabase
      .from('companies')
      .select('*');

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (plan && plan !== 'all') {
      query = query.eq('subscription_plan', plan);
    }

    if (country && country !== 'all') {
      query = query.eq('country', country);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,city.ilike.%${search}%`);
    }

    const { data: companies, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch companies', details: error.message },
        { status: 500 }
      );
    }

    // Get counts for each company
    const companiesWithCounts = await Promise.all(
      (companies || []).map(async (company) => {
        // Count agents
        const { count: agentsCount } = await supabase
          .from('company_agents')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', company.id);

        // Count listings
        const { count: listingsCount } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', company.id);

        return {
          ...company,
          agents_count: agentsCount || 0,
          listings_count: listingsCount || 0,
        };
      })
    );

    return NextResponse.json({
      companies: companiesWithCounts,
      count: companiesWithCounts.length,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, createStripeCustomer } = body;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // If createStripeCustomer is true, create Stripe customer first
    let stripeCustomerId = null;
    if (createStripeCustomer && process.env.STRIPE_SECRET_KEY) {
      try {
        const response = await fetch(
          `${request.nextUrl.origin}/api/stripe/create-customer`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: company.email,
              name: company.name,
              phone: company.phone,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          stripeCustomerId = data.customerId;
        }
      } catch (error) {
        console.error('Failed to create Stripe customer:', error);
      }
    }

    // Insert company into database
    const { data: newCompany, error } = await supabase
      .from('companies')
      .insert({
        ...company,
        stripe_customer_id: stripeCustomerId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating company:', error);
      return NextResponse.json(
        { error: 'Failed to create company', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      company: newCompany,
      message: 'Company created successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


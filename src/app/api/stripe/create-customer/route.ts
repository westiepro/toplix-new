import { NextRequest, NextResponse } from 'next/server';
import { createStripeCustomer } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { email, name, phone } = await request.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    const customer = await createStripeCustomer(email, name, phone);

    if (!customer) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      customerId: customer.id,
      customer,
    });
  } catch (error) {
    console.error('Create customer error:', error);
    return NextResponse.json(
      { error: 'Failed to create Stripe customer' },
      { status: 500 }
    );
  }
}


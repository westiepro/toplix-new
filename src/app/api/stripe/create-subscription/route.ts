import { NextRequest, NextResponse } from 'next/server';
import { createStripeSubscription } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { customerId, priceId } = await request.json();

    if (!customerId || !priceId) {
      return NextResponse.json(
        { error: 'Customer ID and Price ID are required' },
        { status: 400 }
      );
    }

    const subscription = await createStripeSubscription(customerId, priceId);

    if (!subscription) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
      subscription,
    });
  } catch (error) {
    console.error('Create subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}


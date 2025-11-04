import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update company with subscription info
        await supabase
          .from('companies')
          .update({
            payment_status: subscription.status === 'active' ? 'paid' : 'unpaid',
            plan_start: new Date(subscription.current_period_start * 1000).toISOString(),
            plan_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_customer_id', subscription.customer as string);
        break;

      case 'customer.subscription.deleted':
        const deletedSub = event.data.object as Stripe.Subscription;
        
        // Downgrade to free plan
        await supabase
          .from('companies')
          .update({
            subscription_plan: 'free',
            payment_status: 'unpaid',
            listings_limit: 5,
            agents_limit: 1,
          })
          .eq('stripe_customer_id', deletedSub.customer as string);
        break;

      case 'invoice.paid':
        const paidInvoice = event.data.object as Stripe.Invoice;
        
        // Update invoice status in database
        await supabase
          .from('company_invoices')
          .update({
            status: 'paid',
            paid_date: new Date().toISOString(),
          })
          .eq('stripe_invoice_id', paidInvoice.id);

        // Update company payment status
        await supabase
          .from('companies')
          .update({ payment_status: 'paid' })
          .eq('stripe_customer_id', paidInvoice.customer as string);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        
        // Update company payment status
        await supabase
          .from('companies')
          .update({ payment_status: 'overdue' })
          .eq('stripe_customer_id', failedInvoice.customer as string);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}


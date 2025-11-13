import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NODE_ENV === 'development') {
  console.warn('STRIPE_SECRET_KEY is not set. Stripe features will be disabled.');
}

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-10-29.clover',
      typescript: true,
    })
  : null;

/**
 * Plan pricing configuration
 */
export const PLAN_PRICING = {
  free: {
    price: 0,
    priceId: null,
    listings: 5,
    agents: 1,
    features: ['5 Property Listings', '1 Agent Account', 'Basic Support'],
  },
  standard: {
    price: 4900, // €49.00 in cents
    priceId: process.env.STRIPE_PRICE_STANDARD,
    listings: 25,
    agents: 5,
    features: ['25 Property Listings', '5 Agent Accounts', 'Priority Support', 'Analytics Dashboard'],
  },
  premium: {
    price: 9900, // €99.00 in cents
    priceId: process.env.STRIPE_PRICE_PREMIUM,
    listings: 50,
    agents: 10,
    features: ['50 Property Listings', '10 Agent Accounts', 'Premium Support', 'Advanced Analytics', 'Custom Branding'],
  },
  enterprise: {
    price: 19900, // €199.00 in cents
    priceId: process.env.STRIPE_PRICE_ENTERPRISE,
    listings: 100,
    agents: 20,
    features: ['100 Property Listings', '20 Agent Accounts', '24/7 Support', 'Full Analytics Suite', 'API Access', 'White Label'],
  },
};

/**
 * Create Stripe customer
 */
export async function createStripeCustomer(
  email: string,
  name: string,
  phone?: string
): Promise<Stripe.Customer | null> {
  if (!stripe) return null;

  try {
    const customer = await stripe.customers.create({
      email,
      name,
      phone,
      metadata: {
        source: 'toplix_real_estate',
      },
    });

    return customer;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
}

/**
 * Create Stripe subscription
 */
export async function createStripeSubscription(
  customerId: string,
  priceId: string
): Promise<Stripe.Subscription | null> {
  if (!stripe) return null;

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
  } catch (error) {
    console.error('Error creating Stripe subscription:', error);
    throw error;
  }
}

/**
 * Create Stripe invoice
 */
export async function createStripeInvoice(
  customerId: string,
  amount: number,
  description: string
): Promise<Stripe.Invoice | null> {
  if (!stripe) return null;

  try {
    // Create invoice item
    await stripe.invoiceItems.create({
      customer: customerId,
      amount,
      currency: 'eur',
      description,
    });

    // Create and finalize invoice
    const invoice = await stripe.invoices.create({
      customer: customerId,
      auto_advance: true,
    });

    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    return finalizedInvoice;
  } catch (error) {
    console.error('Error creating Stripe invoice:', error);
    throw error;
  }
}

/**
 * Cancel Stripe subscription
 */
export async function cancelStripeSubscription(
  subscriptionId: string
): Promise<Stripe.Subscription | null> {
  if (!stripe) return null;

  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error cancelling Stripe subscription:', error);
    throw error;
  }
}

/**
 * Update Stripe subscription
 */
export async function updateStripeSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription | null> {
  if (!stripe) return null;

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
    });

    return updatedSubscription;
  } catch (error) {
    console.error('Error updating Stripe subscription:', error);
    throw error;
  }
}


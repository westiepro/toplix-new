/**
 * Google Analytics 4 (GA4) Integration
 * Replaces Plausible Analytics with comprehensive event tracking
 */

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Check if GA is loaded
const isGALoaded = () => typeof window !== 'undefined' && typeof window.gtag !== 'undefined';

/**
 * Track page views
 */
export const pageview = (url: string) => {
  if (!isGALoaded()) return;
  
  window.gtag('config', GA_TRACKING_ID!, {
    page_path: url,
  });
};

/**
 * Generic event tracking
 */
export const event = (action: string, params?: Record<string, any>) => {
  if (!isGALoaded()) return;
  
  window.gtag('event', action, params);
};

/**
 * Property View Event
 */
export const trackPropertyView = (
  propertyId: string,
  address: string,
  price: number,
  city: string
) => {
  event('view_item', {
    currency: 'EUR',
    value: price,
    items: [{
      item_id: propertyId,
      item_name: address,
      item_category: city,
      price: price,
    }]
  });
  
  // Also track as custom event for easier reporting
  event('property_view', {
    property_id: propertyId,
    address: address,
    price: price,
    city: city,
  });
};

/**
 * Property Card Click Event
 */
export const trackPropertyCardClick = (
  propertyId: string,
  address: string,
  price: number,
  position: number
) => {
  event('select_item', {
    currency: 'EUR',
    items: [{
      item_id: propertyId,
      item_name: address,
      price: price,
      index: position,
    }]
  });
};

/**
 * Add to Favorites Event
 */
export const trackPropertyFavorite = (
  propertyId: string,
  address: string,
  price: number
) => {
  event('add_to_wishlist', {
    currency: 'EUR',
    value: price,
    items: [{
      item_id: propertyId,
      item_name: address,
      price: price,
    }]
  });
};

/**
 * Remove from Favorites Event
 */
export const trackPropertyUnfavorite = (
  propertyId: string,
  address: string
) => {
  event('remove_from_wishlist', {
    items: [{
      item_id: propertyId,
      item_name: address,
    }]
  });
};

/**
 * Search Event
 */
export const trackSearch = (searchTerm: string, resultCount?: number) => {
  event('search', {
    search_term: searchTerm,
    ...(resultCount !== undefined && { result_count: resultCount }),
  });
};

/**
 * Filter Change Event
 */
export const trackFilterChange = (filterType: string, filterValue: string | number) => {
  event('filter_applied', {
    filter_type: filterType,
    filter_value: filterValue,
  });
};

/**
 * Property Share Event
 */
export const trackPropertyShare = (
  propertyId: string,
  method: string
) => {
  event('share', {
    method: method,
    content_type: 'property',
    item_id: propertyId,
  });
};

/**
 * Contact Agent Event (Lead Generation)
 */
export const trackContactAgent = (
  propertyId: string,
  address: string,
  contactMethod: 'form' | 'phone' | 'whatsapp'
) => {
  event('generate_lead', {
    property_id: propertyId,
    address: address,
    contact_method: contactMethod,
  });
};

/**
 * Map Interaction Event
 */
export const trackMapInteraction = (
  action: 'zoom_in' | 'zoom_out' | 'pan' | 'style_change',
  details?: Record<string, any>
) => {
  event('map_interaction', {
    interaction_type: action,
    ...details,
  });
};

/**
 * AI Style View Event (for AI Decoration feature)
 */
export const trackAIStyleView = (
  propertyId: string,
  styleName: string
) => {
  event('ai_style_view', {
    property_id: propertyId,
    style_name: styleName,
  });
};

/**
 * Saved Search Event
 */
export const trackSavedSearch = (searchName: string, city: string | null) => {
  event('save_search', {
    search_name: searchName,
    city: city,
  });
};

/**
 * User Registration Event
 */
export const trackUserRegistration = (method: string) => {
  event('sign_up', {
    method: method,
  });
};

/**
 * User Login Event
 */
export const trackUserLogin = (method: string) => {
  event('login', {
    method: method,
  });
};

/**
 * Property Inquiry Event
 */
export const trackPropertyInquiry = (
  propertyId: string,
  inquiryType: 'viewing' | 'general' | 'offer'
) => {
  event('property_inquiry', {
    property_id: propertyId,
    inquiry_type: inquiryType,
  });
};

/**
 * Enhanced Ecommerce - Begin Checkout (for paid features)
 */
export const trackBeginCheckout = (value: number, items: any[]) => {
  event('begin_checkout', {
    currency: 'EUR',
    value: value,
    items: items,
  });
};

/**
 * Enhanced Ecommerce - Purchase
 */
export const trackPurchase = (
  transactionId: string,
  value: number,
  items: any[]
) => {
  event('purchase', {
    transaction_id: transactionId,
    currency: 'EUR',
    value: value,
    items: items,
  });
};


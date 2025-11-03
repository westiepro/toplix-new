// Analytics event tracking utilities for Plausible
// Custom events that can be tracked throughout the application

declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Record<string, any> }) => void;
  }
}

/**
 * Track property view events
 */
export const trackPropertyView = (
  propertyId: string,
  propertyTitle: string,
  price: number,
  city?: string
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Property View', {
      props: {
        property_id: propertyId,
        property_title: propertyTitle,
        price: price,
        city: city || 'Unknown',
      },
    });
  }
};

/**
 * Track property inquiry/contact events
 */
export const trackPropertyInquiry = (
  propertyId: string,
  contactMethod: 'email' | 'phone' | 'whatsapp' | 'form'
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Property Inquiry', {
      props: {
        property_id: propertyId,
        contact_method: contactMethod,
      },
    });
  }
};

/**
 * Track property favorite/save events
 */
export const trackPropertyFavorite = (
  propertyId: string,
  action: 'add' | 'remove'
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Property Favorite', {
      props: {
        property_id: propertyId,
        action,
      },
    });
  }
};

/**
 * Track property share events
 */
export const trackPropertyShare = (
  propertyId: string,
  method: 'link' | 'social' | 'email'
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Property Share', {
      props: {
        property_id: propertyId,
        share_method: method,
      },
    });
  }
};

/**
 * Track search queries
 */
export const trackSearch = (
  location: string,
  filters?: {
    priceMin?: number;
    priceMax?: number;
    beds?: number;
    baths?: number;
    propertyType?: string;
  }
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Search', {
      props: {
        location,
        price_min: filters?.priceMin || 0,
        price_max: filters?.priceMax || 0,
        beds: filters?.beds || 0,
        baths: filters?.baths || 0,
        property_type: filters?.propertyType || 'any',
      },
    });
  }
};

/**
 * Track map interactions
 */
export const trackMapInteraction = (
  action: 'zoom_in' | 'zoom_out' | 'pan' | 'marker_click' | 'cluster_click',
  details?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Map Interaction', {
      props: {
        action,
        ...details,
      },
    });
  }
};

/**
 * Track filter usage
 */
export const trackFilterChange = (
  filterType: 'price' | 'beds' | 'baths' | 'property_type' | 'location',
  value: any
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Filter Change', {
      props: {
        filter_type: filterType,
        value: String(value),
      },
    });
  }
};

/**
 * Track language switch
 */
export const trackLanguageSwitch = (
  fromLang: string,
  toLang: string
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Language Switch', {
      props: {
        from_language: fromLang,
        to_language: toLang,
      },
    });
  }
};

/**
 * Track property card clicks
 */
export const trackPropertyCardClick = (
  propertyId: string,
  position: number,
  source: 'search_results' | 'map_popup' | 'favorites' | 'homepage'
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Property Card Click', {
      props: {
        property_id: propertyId,
        position,
        source,
      },
    });
  }
};

/**
 * Track saved search creation
 */
export const trackSavedSearch = (
  searchCriteria: string
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('Saved Search', {
      props: {
        criteria: searchCriteria,
      },
    });
  }
};

/**
 * Track AI style interaction
 */
export const trackAIStyleView = (
  propertyId: string,
  styleName: string
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('AI Style View', {
      props: {
        property_id: propertyId,
        style_name: styleName,
      },
    });
  }
};

/**
 * Generic custom event tracker
 */
export const trackCustomEvent = (
  eventName: string,
  props?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, props ? { props } : undefined);
  }
};


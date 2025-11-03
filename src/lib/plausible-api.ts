// Plausible Analytics API Helper Functions
// Documentation: https://plausible.io/docs/stats-api

const PLAUSIBLE_API_URL = process.env.NEXT_PUBLIC_PLAUSIBLE_URL || 'https://plausible.io';
const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY || '';
const PLAUSIBLE_SITE_ID = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '';

export type PlausiblePeriod = '7d' | '30d' | '90d' | '12mo' | 'day' | 'month';

interface PlausibleRequestOptions {
  period?: PlausiblePeriod;
  date?: string;
  metrics?: string[];
  property?: string;
  filters?: string;
  limit?: number;
}

/**
 * Make a request to the Plausible Stats API
 */
async function plausibleRequest(endpoint: string, options: PlausibleRequestOptions = {}) {
  const params = new URLSearchParams({
    site_id: PLAUSIBLE_SITE_ID,
    period: options.period || '30d',
  });

  if (options.date) params.append('date', options.date);
  if (options.metrics) params.append('metrics', options.metrics.join(','));
  if (options.property) params.append('property', options.property);
  if (options.filters) params.append('filters', options.filters);
  if (options.limit) params.append('limit', String(options.limit));

  const url = `${PLAUSIBLE_API_URL}/api/v1/stats/${endpoint}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${PLAUSIBLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Plausible API Error:', error);
    throw new Error(`Plausible API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get aggregate statistics
 */
export async function getAggregateStats(period: PlausiblePeriod = '30d') {
  try {
    const data = await plausibleRequest('aggregate', {
      period,
      metrics: ['visitors', 'pageviews', 'bounce_rate', 'visit_duration', 'visits'],
    });

    return {
      visitors: data.results?.visitors?.value || 0,
      pageviews: data.results?.pageviews?.value || 0,
      bounceRate: data.results?.bounce_rate?.value || 0,
      visitDuration: data.results?.visit_duration?.value || 0,
      visits: data.results?.visits?.value || 0,
    };
  } catch (error) {
    console.error('Failed to fetch aggregate stats:', error);
    return {
      visitors: 0,
      pageviews: 0,
      bounceRate: 0,
      visitDuration: 0,
      visits: 0,
    };
  }
}

/**
 * Get timeseries data for visitors and pageviews
 */
export async function getTimeseries(period: PlausiblePeriod = '30d') {
  try {
    const data = await plausibleRequest('timeseries', {
      period,
      metrics: ['visitors', 'pageviews', 'visits'],
    });

    return data.results || [];
  } catch (error) {
    console.error('Failed to fetch timeseries:', error);
    return [];
  }
}

/**
 * Get breakdown by property (sources, pages, countries, etc.)
 */
export async function getBreakdown(
  property: string,
  period: PlausiblePeriod = '30d',
  limit: number = 10
) {
  try {
    const data = await plausibleRequest('breakdown', {
      period,
      property,
      limit,
      metrics: ['visitors', 'pageviews', 'bounce_rate', 'visit_duration'],
    });

    return data.results || [];
  } catch (error) {
    console.error(`Failed to fetch breakdown for ${property}:`, error);
    return [];
  }
}

/**
 * Get top traffic sources
 */
export async function getTrafficSources(period: PlausiblePeriod = '30d', limit: number = 10) {
  return getBreakdown('visit:source', period, limit);
}

/**
 * Get top pages
 */
export async function getTopPages(period: PlausiblePeriod = '30d', limit: number = 10) {
  return getBreakdown('event:page', period, limit);
}

/**
 * Get geographic distribution
 */
export async function getCountries(period: PlausiblePeriod = '30d', limit: number = 10) {
  return getBreakdown('visit:country', period, limit);
}

/**
 * Get device breakdown
 */
export async function getDevices(period: PlausiblePeriod = '30d') {
  return getBreakdown('visit:device', period, 10);
}

/**
 * Get browser breakdown
 */
export async function getBrowsers(period: PlausiblePeriod = '30d') {
  return getBreakdown('visit:browser', period, 10);
}

/**
 * Get operating system breakdown
 */
export async function getOperatingSystems(period: PlausiblePeriod = '30d') {
  return getBreakdown('visit:os', period, 10);
}

/**
 * Get current active visitors (realtime)
 */
export async function getRealtime() {
  try {
    const url = `${PLAUSIBLE_API_URL}/api/v1/stats/realtime/visitors?site_id=${PLAUSIBLE_SITE_ID}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${PLAUSIBLE_API_KEY}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch realtime data');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch realtime visitors:', error);
    return 0;
  }
}

/**
 * Get custom event breakdown
 */
export async function getCustomEvents(
  eventName: string,
  period: PlausiblePeriod = '30d',
  limit: number = 100
) {
  try {
    const data = await plausibleRequest('breakdown', {
      period,
      property: `event:name`,
      filters: `event:name==${eventName}`,
      limit,
    });

    return data.results || [];
  } catch (error) {
    console.error(`Failed to fetch custom event ${eventName}:`, error);
    return [];
  }
}

/**
 * Get property-specific events with props
 */
export async function getEventProperties(
  eventName: string,
  propertyName: string,
  period: PlausiblePeriod = '30d',
  limit: number = 100
) {
  try {
    const data = await plausibleRequest('breakdown', {
      period,
      property: `event:props:${propertyName}`,
      filters: `event:name==${eventName}`,
      limit,
      metrics: ['visitors', 'events'],
    });

    return data.results || [];
  } catch (error) {
    console.error(`Failed to fetch event properties for ${eventName}:`, error);
    return [];
  }
}

/**
 * Helper function to format period for display
 */
export function formatPeriod(period: PlausiblePeriod): string {
  const periodMap: Record<PlausiblePeriod, string> = {
    '7d': 'Last 7 days',
    '30d': 'Last 30 days',
    '90d': 'Last 90 days',
    '12mo': 'Last 12 months',
    'day': 'Today',
    'month': 'This month',
  };
  return periodMap[period] || period;
}

/**
 * Calculate percentage change between two values
 */
export function calculateChange(current: number, previous: number): {
  value: number;
  percentage: number;
  isPositive: boolean;
} {
  if (previous === 0) {
    return { value: current, percentage: 100, isPositive: current > 0 };
  }

  const change = current - previous;
  const percentage = (change / previous) * 100;

  return {
    value: change,
    percentage: Math.abs(percentage),
    isPositive: change >= 0,
  };
}



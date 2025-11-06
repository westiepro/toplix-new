/**
 * Plausible Analytics API Integration
 * Fetches analytics data from Plausible Analytics
 */

export type PlausiblePeriod = '7d' | '30d' | '6mo' | '12mo' | 'day' | 'month';

const PLAUSIBLE_API_URL = process.env.NEXT_PUBLIC_PLAUSIBLE_URL || 'https://plausible.io';
const PLAUSIBLE_API_KEY = process.env.PLAUSIBLE_API_KEY;
const PLAUSIBLE_SITE_ID = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Get event properties from Plausible Analytics
 */
export async function getEventProperties(
  eventName: string,
  propertyName: string,
  period: PlausiblePeriod = '30d',
  limit: number = 100
): Promise<any[]> {
  // Return empty array if Plausible not configured
  if (!PLAUSIBLE_API_KEY || !PLAUSIBLE_SITE_ID) {
    console.warn('Plausible Analytics not configured');
    return [];
  }

  try {
    const response = await fetch(
      `${PLAUSIBLE_API_URL}/api/v1/stats/breakdown?site_id=${PLAUSIBLE_SITE_ID}&period=${period}&property=${propertyName}&filters=event:name==${encodeURIComponent(eventName)}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Plausible API error:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching event properties from Plausible:', error);
    return [];
  }
}

/**
 * Get realtime visitor count from Plausible Analytics
 */
export async function getRealtime(): Promise<number> {
  // Return 0 if Plausible not configured
  if (!PLAUSIBLE_API_KEY || !PLAUSIBLE_SITE_ID) {
    return 0;
  }

  try {
    const response = await fetch(
      `${PLAUSIBLE_API_URL}/api/v1/stats/realtime/visitors?site_id=${PLAUSIBLE_SITE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Plausible realtime API error:', response.status);
      return 0;
    }

    const data = await response.json();
    return data || 0;
  } catch (error) {
    console.error('Error fetching realtime data from Plausible:', error);
    return 0;
  }
}

/**
 * Get aggregate stats from Plausible Analytics
 */
export async function getAggregateStats(
  period: PlausiblePeriod = '30d',
  metrics: string[] = ['visitors', 'pageviews', 'bounce_rate', 'visit_duration']
): Promise<Record<string, any>> {
  if (!PLAUSIBLE_API_KEY || !PLAUSIBLE_SITE_ID) {
    return {};
  }

  try {
    const metricsParam = metrics.join(',');
    const response = await fetch(
      `${PLAUSIBLE_API_URL}/api/v1/stats/aggregate?site_id=${PLAUSIBLE_SITE_ID}&period=${period}&metrics=${metricsParam}`,
      {
        headers: {
          Authorization: `Bearer ${PLAUSIBLE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    return data.results || {};
  } catch (error) {
    console.error('Error fetching aggregate stats:', error);
    return {};
  }
}


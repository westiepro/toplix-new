import { NextRequest, NextResponse } from 'next/server';
import { getEventProperties, type PlausiblePeriod } from '@/lib/plausible-api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = (searchParams.get('period') || '30d') as PlausiblePeriod;
    const eventType = searchParams.get('event') || 'all';

    let result: any = {};

    switch (eventType) {
      case 'property_views':
        // Get property view events grouped by property ID
        const propertyViews = await getEventProperties('Property View', 'property_id', period, 100);
        result = {
          event: 'Property View',
          data: propertyViews,
        };
        break;

      case 'searches':
        // Get search events grouped by location
        const searches = await getEventProperties('Search', 'location', period, 50);
        result = {
          event: 'Search',
          data: searches,
        };
        break;

      case 'inquiries':
        // Get inquiry events grouped by contact method
        const inquiries = await getEventProperties('Property Inquiry', 'contact_method', period, 50);
        result = {
          event: 'Property Inquiry',
          data: inquiries,
        };
        break;

      case 'favorites':
        // Get favorite events
        const favorites = await getEventProperties('Property Favorite', 'property_id', period, 100);
        result = {
          event: 'Property Favorite',
          data: favorites,
        };
        break;

      case 'map_interactions':
        // Get map interaction events
        const mapInteractions = await getEventProperties('Map Interaction', 'action', period, 50);
        result = {
          event: 'Map Interaction',
          data: mapInteractions,
        };
        break;

      case 'filter_changes':
        // Get filter change events
        const filterChanges = await getEventProperties('Filter Change', 'filter_type', period, 50);
        result = {
          event: 'Filter Change',
          data: filterChanges,
        };
        break;

      default:
        // Get all custom events
        const [
          propertyViewsData,
          searchesData,
          inquiriesData,
          favoritesData,
          mapInteractionsData,
          filterChangesData,
        ] = await Promise.all([
          getEventProperties('Property View', 'property_id', period, 20),
          getEventProperties('Search', 'location', period, 10),
          getEventProperties('Property Inquiry', 'contact_method', period, 10),
          getEventProperties('Property Favorite', 'property_id', period, 20),
          getEventProperties('Map Interaction', 'action', period, 10),
          getEventProperties('Filter Change', 'filter_type', period, 10),
        ]);

        result = {
          propertyViews: propertyViewsData,
          searches: searchesData,
          inquiries: inquiriesData,
          favorites: favoritesData,
          mapInteractions: mapInteractionsData,
          filterChanges: filterChangesData,
          period,
        };
        break;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching event analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch event analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}



import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract query parameters
    const city = searchParams.get('city');
    const sw_lat = searchParams.get('sw_lat');
    const sw_lng = searchParams.get('sw_lng');
    const ne_lat = searchParams.get('ne_lat');
    const ne_lng = searchParams.get('ne_lng');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const beds = searchParams.get('beds');
    const baths = searchParams.get('baths');
    const propertyType = searchParams.get('propertyType');
    const minArea = searchParams.get('minArea');
    const lang = searchParams.get('lang') || 'en';

    // Validate Supabase configuration
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Start building the query
    let query = supabase
      .from('properties')
      .select(`
        id,
        price,
        address,
        city,
        country,
        beds,
        baths,
        area,
        property_type,
        lat,
        lng,
        description,
        property_images!inner(
          id,
          image_url,
          display_order,
          is_featured
        )
      `)
      .eq('property_images.is_featured', true); // Only get featured image initially

    // Apply city filter
    if (city) {
      query = query.ilike('city', `%${city}%`);
    }

    // Apply viewport bounds filter (spatial query)
    if (sw_lat && sw_lng && ne_lat && ne_lng) {
      const swLat = parseFloat(sw_lat);
      const swLng = parseFloat(sw_lng);
      const neLat = parseFloat(ne_lat);
      const neLng = parseFloat(ne_lng);

      query = query
        .gte('lat', swLat)
        .lte('lat', neLat)
        .gte('lng', swLng)
        .lte('lng', neLng);
    }

    // Apply price filters
    if (minPrice) {
      query = query.gte('price', parseInt(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price', parseInt(maxPrice));
    }

    // Apply beds filter
    if (beds) {
      query = query.gte('beds', parseInt(beds));
    }

    // Apply baths filter
    if (baths) {
      query = query.gte('baths', parseInt(baths));
    }

    // Apply property type filter
    if (propertyType && propertyType !== 'any') {
      query = query.eq('property_type', propertyType);
    }

    // Apply area filter
    if (minArea) {
      query = query.gte('area', parseInt(minArea));
    }

    // Limit results to prevent overwhelming the client
    query = query.limit(200);

    // Execute query
    const { data, error } = await query;

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch properties', details: error.message },
        { status: 500 }
      );
    }

    // Fetch translations if language is not English
    let translationsMap: Map<string, any> = new Map();
    if (lang !== 'en' && data && data.length > 0) {
      const propertyIds = data.map((p: any) => p.id);
      const { data: translations } = await supabase
        .from('property_translations')
        .select('property_id, title, description, address')
        .in('property_id', propertyIds)
        .eq('language_code', lang);
      
      if (translations) {
        translations.forEach((t: any) => {
          translationsMap.set(t.property_id, t);
        });
      }
    }

    // Transform data to match Property type format
    const properties = (data || []).map((property: any) => {
      // Get the featured image
      const featuredImage = property.property_images?.[0];
      
      // Get translation if available
      const translation = translationsMap.get(property.id);
      
      return {
        id: property.id,
        price: property.price,
        address: translation?.address || property.address,
        city: property.city,
        country: property.country,
        beds: property.beds,
        baths: property.baths,
        area: property.area,
        property_type: property.property_type,
        lat: property.lat,
        lng: property.lng,
        description: translation?.description || property.description,
        imageUrl: featuredImage?.image_url || 'https://via.placeholder.com/800x600?text=No+Image',
      };
    });

    return NextResponse.json({
      properties,
      count: properties.length,
      filters: {
        city,
        bounds: sw_lat && sw_lng && ne_lat && ne_lng ? {
          sw_lat: parseFloat(sw_lat),
          sw_lng: parseFloat(sw_lng),
          ne_lat: parseFloat(ne_lat),
          ne_lng: parseFloat(ne_lng),
        } : null,
        minPrice: minPrice ? parseInt(minPrice) : null,
        maxPrice: maxPrice ? parseInt(maxPrice) : null,
        beds: beds ? parseInt(beds) : null,
        baths: baths ? parseInt(baths) : null,
        propertyType,
        minArea: minArea ? parseInt(minArea) : null,
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

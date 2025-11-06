import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property, images } = body;

    console.log('Received property data:', property);
    console.log('Received images:', images?.length || 0);

    // Validate Supabase configuration
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    // Use service role key if available (bypasses RLS), otherwise use anon key
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(
      supabaseUrl, 
      serviceRoleKey || supabaseKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Insert property
    const propertyData = {
      address: property.address,
      city: property.city,
      country: property.country || 'Portugal',
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      area: property.area,
      property_type: property.type,
      transaction_type: property.transaction_type || 'buy',
      lat: property.lat,
      lng: property.lng,
      description: property.description || '',
      status: property.status || 'active',
      show_exact_location: property.show_exact_location !== false,
    };

    console.log('Inserting property:', propertyData);

    const { data: newProperty, error: propertyError } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();

    if (propertyError || !newProperty) {
      console.error('Error creating property:', propertyError);
      return NextResponse.json(
        { error: 'Failed to create property', details: propertyError?.message },
        { status: 500 }
      );
    }

    // Insert images if provided
    if (images && images.length > 0) {
      // Try with new columns first (style_name, is_original, image_category)
      const imageRecords = images.map((img: any, index: number) => ({
        property_id: newProperty.id,
        image_url: img.url,
        display_order: img.display_order ?? index,
        is_featured: img.is_featured ?? index === 0,
        style_name: img.style_name || null,
        is_original: img.is_original || false,
        image_category: img.image_category || 'gallery',
      }));

      const { error: imagesError } = await supabase
        .from('property_images')
        .insert(imageRecords);

      if (imagesError) {
        console.error('Error creating images with style columns:', imagesError);
        
        // Fallback: Try without style columns if they don't exist
        const basicImageRecords = images.map((img: any, index: number) => ({
          property_id: newProperty.id,
          image_url: img.url,
          display_order: img.display_order ?? index,
          is_featured: img.is_featured ?? index === 0,
        }));

        const { error: fallbackError } = await supabase
          .from('property_images')
          .insert(basicImageRecords);
          
        if (fallbackError) {
          console.error('Error creating images (fallback):', fallbackError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      property: newProperty,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, property, images } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      );
    }

    console.log('Updating property:', id, property);
    console.log('Updating images:', images?.length || 0);

    // Validate Supabase configuration
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    // Use service role key if available (bypasses RLS), otherwise use anon key
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabase = createClient(
      supabaseUrl, 
      serviceRoleKey || supabaseKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Update property
    const propertyData = {
      address: property.address,
      city: property.city,
      country: property.country || 'Portugal',
      price: property.price,
      beds: property.beds,
      baths: property.baths,
      area: property.area,
      property_type: property.type,
      transaction_type: property.transaction_type || 'buy',
      lat: property.lat,
      lng: property.lng,
      description: property.description || '',
      status: property.status || 'active',
      show_exact_location: property.show_exact_location !== false,
    };

    console.log('Updating property data:', propertyData);

    const { data: updatedProperty, error: propertyError } = await supabase
      .from('properties')
      .update(propertyData)
      .eq('id', id)
      .select()
      .single();

    if (propertyError || !updatedProperty) {
      console.error('Error updating property:', propertyError);
      return NextResponse.json(
        { error: 'Failed to update property', details: propertyError?.message },
        { status: 500 }
      );
    }

    // Update images if provided
    if (images && images.length > 0) {
      // Delete existing images
      await supabase
        .from('property_images')
        .delete()
        .eq('property_id', id);

      // Insert new images
      const imageRecords = images.map((img: any, index: number) => ({
        property_id: id,
        image_url: img.url,
        display_order: img.display_order ?? index,
        is_featured: img.is_featured ?? index === 0,
        style_name: img.style_name || null,
        is_original: img.is_original || false,
        image_category: img.image_category || 'gallery',
      }));

      const { error: imagesError } = await supabase
        .from('property_images')
        .insert(imageRecords);

      if (imagesError) {
        console.error('Error updating images with style columns:', imagesError);
        
        // Fallback: Try without style columns if they don't exist
        const basicImageRecords = images.map((img: any, index: number) => ({
          property_id: id,
          image_url: img.url,
          display_order: img.display_order ?? index,
          is_featured: img.is_featured ?? index === 0,
        }));

        const { error: fallbackError } = await supabase
          .from('property_images')
          .insert(basicImageRecords);
          
        if (fallbackError) {
          console.error('Error updating images (fallback):', fallbackError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      property: updatedProperty,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
        district,
        beds,
        baths,
        area,
        property_type,
        transaction_type,
        url_slug_id,
        lat,
        lng,
        description,
        status,
        show_exact_location,
        property_images(
          id,
          image_url,
          display_order,
          is_featured,
          style_name,
          is_original,
          image_category
        )
      `)
      .order('created_at', { ascending: false }); // Order by newest first

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
    query = query.limit(1000);

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
      // Get the featured image (first image with is_featured=true, or just first image)
      const featuredImage = property.property_images?.find((img: any) => img.is_featured) 
        || property.property_images?.[0];
      
      // Get translation if available
      const translation = translationsMap.get(property.id);
      
      return {
        id: property.id,
        price: property.price,
        address: translation?.address || property.address,
        city: property.city,
        country: property.country,
        district: property.district,
        beds: property.beds,
        baths: property.baths,
        area: property.area,
        property_type: property.property_type,
        transaction_type: property.transaction_type || 'buy',
        url_slug_id: property.url_slug_id,
        lat: property.lat,
        lng: property.lng,
        description: translation?.description || property.description,
        status: property.status || 'active',
        show_exact_location: property.show_exact_location !== false,
        imageUrl: featuredImage?.image_url || 'https://via.placeholder.com/800x600?text=No+Image',
        images: property.property_images || [], // Include all images for editing
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

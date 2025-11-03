import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    // Validate Supabase configuration
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch property with all images
    const { data: property, error } = await supabase
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
        status,
        property_images(
          id,
          image_url,
          display_order,
          is_featured
        )
      `)
      .eq('id', id)
      .single();

    if (error || !property) {
      console.error('Error fetching property:', error);
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Sort images by display_order
    const images = (property.property_images || [])
      .sort((a: any, b: any) => a.display_order - b.display_order)
      .map((img: any) => img.image_url);

    // Transform to match Property type
    const transformedProperty = {
      id: property.id,
      price: property.price,
      address: property.address,
      city: property.city,
      country: property.country,
      beds: property.beds,
      baths: property.baths,
      area: property.area,
      property_type: property.property_type,
      lat: property.lat,
      lng: property.lng,
      description: property.description,
      status: property.status || 'active',
      imageUrl: images[0] || 'https://via.placeholder.com/800x600?text=No+Image',
      images: images.length > 0 ? images : ['https://via.placeholder.com/800x600?text=No+Image'],
    };

    return NextResponse.json({
      property: transformedProperty,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    // Validate Supabase configuration
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // First, delete all associated images (due to foreign key constraints)
    const { error: imagesError } = await supabase
      .from('property_images')
      .delete()
      .eq('property_id', id);

    if (imagesError) {
      console.error('Error deleting property images:', imagesError);
      return NextResponse.json(
        { error: 'Failed to delete property images', details: imagesError.message },
        { status: 500 }
      );
    }

    // Then delete the property itself
    const { error: propertyError } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (propertyError) {
      console.error('Error deleting property:', propertyError);
      return NextResponse.json(
        { error: 'Failed to delete property', details: propertyError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully',
      id: id,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


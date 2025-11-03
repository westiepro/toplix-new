import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '30';

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Calculate date for filtering (if needed for created_at)
    const periodDays = parseInt(period);
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - periodDays);

    // Fetch all properties
    const { data: properties, error: propertiesError } = await supabase
      .from('properties')
      .select('id, price, city, country, property_type, beds, baths, area, created_at, address');

    if (propertiesError) {
      console.error('Error fetching properties:', propertiesError);
      return NextResponse.json(
        { error: 'Failed to fetch property data' },
        { status: 500 }
      );
    }

    // Calculate properties by city
    const cityCounts = properties?.reduce((acc: Record<string, number>, prop: any) => {
      const city = prop.city || 'Unknown';
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {}) || {};

    const propertiesByCity = Object.entries(cityCounts)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate properties by country
    const countryCounts = properties?.reduce((acc: Record<string, number>, prop: any) => {
      const country = prop.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {}) || {};

    const propertiesByCountry = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count);

    // Calculate properties by type
    const typeCounts = properties?.reduce((acc: Record<string, number>, prop: any) => {
      const type = prop.property_type || 'Unknown';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {}) || {};

    const propertiesByType = Object.entries(typeCounts)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);

    // Calculate price ranges
    const priceRanges = [
      { range: '$0-300K', min: 0, max: 300000, count: 0 },
      { range: '$300K-500K', min: 300000, max: 500000, count: 0 },
      { range: '$500K-750K', min: 500000, max: 750000, count: 0 },
      { range: '$750K-1M', min: 750000, max: 1000000, count: 0 },
      { range: '$1M+', min: 1000000, max: Infinity, count: 0 },
    ];

    properties?.forEach((prop: any) => {
      const price = prop.price || 0;
      const range = priceRanges.find((r) => price >= r.min && price < r.max);
      if (range) range.count++;
    });

    const priceDistribution = priceRanges.map(({ range, count }) => ({ range, count }));

    // Calculate bedroom distribution
    const bedCounts = properties?.reduce((acc: Record<number, number>, prop: any) => {
      const beds = prop.beds || 0;
      acc[beds] = (acc[beds] || 0) + 1;
      return acc;
    }, {}) || {};

    const bedroomDistribution = Object.entries(bedCounts)
      .map(([beds, count]) => ({ beds: parseInt(beds), count }))
      .sort((a, b) => a.beds - b.beds);

    // Calculate statistics
    const totalProperties = properties?.length || 0;
    const prices = properties?.map((p: any) => p.price || 0) || [];
    const avgPrice = prices.length > 0 ? prices.reduce((a: number, b: number) => a + b, 0) / prices.length : 0;
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    // Calculate median price
    const sortedPrices = [...prices].sort((a, b) => a - b);
    const medianPrice = sortedPrices.length > 0
      ? sortedPrices.length % 2 === 0
        ? (sortedPrices[sortedPrices.length / 2 - 1] + sortedPrices[sortedPrices.length / 2]) / 2
        : sortedPrices[Math.floor(sortedPrices.length / 2)]
      : 0;

    // Count new listings (if created_at is available)
    const newListings = properties?.filter((p: any) => {
      if (!p.created_at) return false;
      const createdDate = new Date(p.created_at);
      return createdDate >= dateThreshold;
    }).length || 0;

    // Get top properties by price
    const topPropertiesByPrice = properties
      ?.sort((a: any, b: any) => (b.price || 0) - (a.price || 0))
      .slice(0, 10)
      .map((p: any) => ({
        id: p.id,
        address: p.address,
        city: p.city,
        price: p.price,
        beds: p.beds,
        baths: p.baths,
        area: p.area,
      })) || [];

    return NextResponse.json({
      summary: {
        totalProperties,
        avgPrice: Math.round(avgPrice),
        minPrice,
        maxPrice,
        medianPrice: Math.round(medianPrice),
        newListings,
      },
      propertiesByCity,
      propertiesByCountry,
      propertiesByType,
      priceDistribution,
      bedroomDistribution,
      topPropertiesByPrice,
      period: periodDays,
    });
  } catch (error) {
    console.error('Error fetching property analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch property analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


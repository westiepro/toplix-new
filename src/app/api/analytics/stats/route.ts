import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET - Fetch visitor and page view statistics
export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'all'; // 'all', '7d', '30d', '90d'

    // Calculate date range based on period
    let startDate: Date | null = null;
    if (period === '7d') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === '30d') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
    } else if (period === '90d') {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 90);
    }

    // Get total page views from user_property_views
    let pageViewsQuery = supabase
      .from('user_property_views')
      .select('id', { count: 'exact', head: true });

    if (startDate) {
      pageViewsQuery = pageViewsQuery.gte('viewed_at', startDate.toISOString());
    }

    const { count: totalPageViews, error: pageViewsError } = await pageViewsQuery;

    if (pageViewsError) {
      console.error('Error fetching page views:', pageViewsError);
    }

    // Get unique visitors (distinct user_ids)
    let visitorsQuery = supabase
      .from('user_property_views')
      .select('user_id', { count: 'exact' });

    if (startDate) {
      visitorsQuery = visitorsQuery.gte('viewed_at', startDate.toISOString());
    }

    const { data: visitorsData, error: visitorsError } = await visitorsQuery;

    if (visitorsError) {
      console.error('Error fetching visitors:', visitorsError);
    }

    // Count unique visitors
    const uniqueVisitors = visitorsData 
      ? new Set(visitorsData.map(v => v.user_id).filter(Boolean)).size
      : 0;

    // Get previous period for comparison
    let previousPeriodStart: Date | null = null;
    let previousPeriodEnd: Date | null = null;
    
    if (startDate) {
      const periodDays = period === '7d' ? 7 : period === '30d' ? 30 : 90;
      previousPeriodEnd = new Date(startDate);
      previousPeriodStart = new Date(startDate);
      previousPeriodStart.setDate(previousPeriodStart.getDate() - periodDays);
    }

    let previousPageViews = 0;
    let previousVisitors = 0;

    if (previousPeriodStart && previousPeriodEnd) {
      // Get previous period page views
      const { count: prevPageViews } = await supabase
        .from('user_property_views')
        .select('id', { count: 'exact', head: true })
        .gte('viewed_at', previousPeriodStart.toISOString())
        .lt('viewed_at', previousPeriodEnd.toISOString());

      previousPageViews = prevPageViews || 0;

      // Get previous period visitors
      const { data: prevVisitorsData } = await supabase
        .from('user_property_views')
        .select('user_id')
        .gte('viewed_at', previousPeriodStart.toISOString())
        .lt('viewed_at', previousPeriodEnd.toISOString());

      previousVisitors = prevVisitorsData 
        ? new Set(prevVisitorsData.map(v => v.user_id).filter(Boolean)).size
        : 0;
    }

    // Ensure totalPageViews is a number (handle null case)
    const totalPageViewsCount = totalPageViews ?? 0;

    // Calculate percentage changes
    const visitorsChange = previousVisitors > 0
      ? ((uniqueVisitors - previousVisitors) / previousVisitors) * 100
      : 0;
    
    const pageViewsChange = previousPageViews > 0
      ? ((totalPageViewsCount - previousPageViews) / previousPageViews) * 100
      : 0;

    return NextResponse.json({
      visitors: uniqueVisitors,
      pageViews: totalPageViewsCount,
      visitorsChange: Math.round(visitorsChange * 10) / 10, // Round to 1 decimal
      pageViewsChange: Math.round(pageViewsChange * 10) / 10,
      period,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


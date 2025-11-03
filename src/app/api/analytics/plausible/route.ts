import { NextRequest, NextResponse } from 'next/server';
import {
  getAggregateStats,
  getTimeseries,
  getTrafficSources,
  getTopPages,
  getCountries,
  getDevices,
  getBrowsers,
  getOperatingSystems,
  type PlausiblePeriod,
} from '@/lib/plausible-api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const period = (searchParams.get('period') || '30d') as PlausiblePeriod;
    const type = searchParams.get('type') || 'all';

    // Return specific data type if requested
    switch (type) {
      case 'aggregate':
        const stats = await getAggregateStats(period);
        return NextResponse.json(stats);

      case 'timeseries':
        const timeseries = await getTimeseries(period);
        return NextResponse.json(timeseries);

      case 'sources':
        const sources = await getTrafficSources(period, 10);
        return NextResponse.json(sources);

      case 'pages':
        const pages = await getTopPages(period, 10);
        return NextResponse.json(pages);

      case 'countries':
        const countries = await getCountries(period, 10);
        return NextResponse.json(countries);

      case 'devices':
        const devices = await getDevices(period);
        return NextResponse.json(devices);

      case 'browsers':
        const browsers = await getBrowsers(period);
        return NextResponse.json(browsers);

      case 'os':
        const os = await getOperatingSystems(period);
        return NextResponse.json(os);

      default:
        // Return all data
        const [
          aggregateStats,
          timeseriesData,
          trafficSources,
          topPages,
          countriesData,
          devicesData,
          browsersData,
          osData,
        ] = await Promise.all([
          getAggregateStats(period),
          getTimeseries(period),
          getTrafficSources(period, 10),
          getTopPages(period, 10),
          getCountries(period, 10),
          getDevices(period),
          getBrowsers(period),
          getOperatingSystems(period),
        ]);

        return NextResponse.json({
          aggregate: aggregateStats,
          timeseries: timeseriesData,
          sources: trafficSources,
          pages: topPages,
          countries: countriesData,
          devices: devicesData,
          browsers: browsersData,
          os: osData,
          period,
        });
    }
  } catch (error) {
    console.error('Error fetching Plausible analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch analytics data',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


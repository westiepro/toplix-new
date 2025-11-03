import { NextResponse } from 'next/server';
import { getRealtime } from '@/lib/plausible-api';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const activeVisitors = await getRealtime();

    return NextResponse.json({
      activeVisitors: activeVisitors || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching realtime analytics:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch realtime analytics',
        message: error instanceof Error ? error.message : 'Unknown error',
        activeVisitors: 0,
      },
      { status: 500 }
    );
  }
}


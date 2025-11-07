import { NextRequest, NextResponse } from 'next/server';

// Test endpoint to verify Vercel geo is working
export async function GET(request: NextRequest) {
  const geo = request.geo;
  const headers = {
    'x-vercel-ip-country': request.headers.get('x-vercel-ip-country'),
    'cf-ipcountry': request.headers.get('cf-ipcountry'),
    'x-forwarded-for': request.headers.get('x-forwarded-for'),
    'x-real-ip': request.headers.get('x-real-ip'),
  };

  return NextResponse.json({
    geo: geo || null,
    headers: headers,
    detectedCountry: geo?.country || request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || 'NOT_DETECTED',
    environment: {
      VERCEL: !!process.env.VERCEL,
      NODE_ENV: process.env.NODE_ENV,
    },
  });
}


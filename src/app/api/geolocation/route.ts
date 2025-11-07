import { NextRequest, NextResponse } from 'next/server';

// Helper function to get IP address from request
function getClientIP(request: NextRequest): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  return undefined;
}

// Helper function to get country from request headers (Vercel/Cloudflare)
function getCountryFromHeaders(request: NextRequest): string | undefined {
  // Vercel provides geo information in multiple ways:
  // 1. request.geo.country (most reliable on Vercel)
  // 2. x-vercel-ip-country header
  // 3. cf-ipcountry (Cloudflare)
  
  // Try request.geo first (Vercel's recommended way)
  if (request.geo?.country) {
    console.log('✅ Country from request.geo:', request.geo.country);
    return request.geo.country;
  }
  
  // Check headers
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const cfCountry = request.headers.get('cf-ipcountry');
  
  // Log for debugging
  console.log('🌍 Geo detection:', {
    'request.geo.country': request.geo?.country,
    'x-vercel-ip-country': vercelCountry,
    'cf-ipcountry': cfCountry,
    'VERCEL env': !!process.env.VERCEL,
  });
  
  const country = vercelCountry || cfCountry;
  return country || undefined;
}

// GET - Get country from IP address
export async function GET(request: NextRequest) {
  try {
    // First, try to get country from headers (fastest, no external API call)
    const countryFromHeaders = getCountryFromHeaders(request);
    if (countryFromHeaders) {
      console.log('✅ Country detected from headers:', countryFromHeaders);
      return NextResponse.json({
        country: countryFromHeaders,
        source: 'headers',
      });
    } else {
      console.log('⚠️ No country found in headers, trying IP geolocation');
    }

    // Fallback: Use IP geolocation service
    const ip = getClientIP(request);
    
    // Handle localhost/development - return a default or test country
    if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
      // In development, you might want to return a test country or null
      // For now, we'll try the geolocation service anyway, but with a fallback
      console.log('Localhost detected, using geolocation service with fallback');
    }
    
    if (!ip) {
      // Return null instead of error - let the client handle it
      return NextResponse.json({
        country: null,
        source: 'none',
        note: 'Could not determine IP address (likely localhost)',
      });
    }

    // Use a free IP geolocation service (ipapi.co)
    // You can also use other services like ip-api.com, ipgeolocation.io, etc.
    try {
      const response = await fetch(`https://ipapi.co/${ip}/country_code/`, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });

      if (response.ok) {
        const country = (await response.text()).trim();
        if (country && country.length === 2) {
          return NextResponse.json({
            country: country.toUpperCase(),
            source: 'ipapi',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching from ipapi.co:', error);
    }

    // Fallback to another service (ip-api.com)
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.countryCode) {
          return NextResponse.json({
            country: data.countryCode,
            source: 'ip-api',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching from ip-api.com:', error);
    }

    return NextResponse.json(
      { error: 'Could not determine country' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Geolocation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


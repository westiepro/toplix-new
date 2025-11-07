import { NextRequest, NextResponse } from 'next/server';

// In-memory store for active viewers
// In production, you might want to use Redis or a database
interface ActiveViewer {
  sessionId: string;
  lastSeen: number;
  userAgent?: string;
  path?: string;
  country?: string;
  ip?: string;
}

const activeViewers = new Map<string, ActiveViewer>();

// Clean up inactive viewers (no activity for 30 seconds)
const CLEANUP_INTERVAL = 30000; // 30 seconds
const INACTIVE_THRESHOLD = 30000; // 30 seconds

// Cleanup function
function cleanupInactiveViewers() {
  const now = Date.now();
  for (const [sessionId, viewer] of activeViewers.entries()) {
    if (now - viewer.lastSeen > INACTIVE_THRESHOLD) {
      activeViewers.delete(sessionId);
    }
  }
}

// Run cleanup every 10 seconds
setInterval(cleanupInactiveViewers, 10000);

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

// Helper function to get country from request (Vercel provides this)
function getCountryFromRequest(request: NextRequest): string | undefined {
  // Vercel provides geo information in headers
  const country = request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('cf-ipcountry') || // Cloudflare
                  request.geo?.country;
  return country || undefined;
}

// POST - Register/update active viewer
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userAgent, path, country } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Try to get country from various sources
    const detectedCountry = country || 
                           getCountryFromRequest(request) || 
                           'Unknown';

    // Update or create viewer entry
    activeViewers.set(sessionId, {
      sessionId,
      lastSeen: Date.now(),
      userAgent: userAgent || request.headers.get('user-agent') || undefined,
      path: path || undefined,
      country: detectedCountry,
      ip: getClientIP(request),
    });

    return NextResponse.json({
      success: true,
      activeViewers: activeViewers.size,
    });
  } catch (error) {
    console.error('Error updating live viewer:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get current live viewer count
export async function GET(request: NextRequest) {
  try {
    // Clean up inactive viewers before returning count
    cleanupInactiveViewers();

    // Get viewer details (optional, for debugging)
    const includeDetails = request.nextUrl.searchParams.get('details') === 'true';
    
    if (includeDetails) {
      const viewers = Array.from(activeViewers.values())
        .sort((a, b) => b.lastSeen - a.lastSeen) // Sort by most recent first
        .map(v => ({
          sessionId: v.sessionId,
          lastSeen: v.lastSeen,
          userAgent: v.userAgent,
          path: v.path,
          country: v.country || 'Unknown',
        }));

      return NextResponse.json({
        count: activeViewers.size,
        viewers,
      });
    }

    return NextResponse.json({
      count: activeViewers.size,
    });
  } catch (error) {
    console.error('Error getting live viewers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


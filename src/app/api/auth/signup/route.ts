import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Helper to get country from Vercel geo
function getCountryFromRequest(request: NextRequest): string | undefined {
  // Type assertion for Vercel's geo property (available at runtime)
  const geo = (request as any).geo;
  
  // Vercel provides geo information
  if (geo?.country) {
    console.log('✅ Country from request.geo:', geo.country);
    return geo.country;
  }
  
  // Check headers as fallback
  const vercelCountry = request.headers.get('x-vercel-ip-country');
  const cfCountry = request.headers.get('cf-ipcountry');
  
  console.log('🌍 Geo detection:', {
    'request.geo.country': geo?.country,
    'x-vercel-ip-country': vercelCountry,
    'cf-ipcountry': cfCountry,
  });
  
  return vercelCountry || cfCountry || undefined;
}

// POST - Server-side signup with country detection
export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, locale = 'en', clientCountry } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Detect country from server-side request (has access to Vercel geo)
    let country = getCountryFromRequest(request);
    
    // If server-side detection failed, use client-detected country as fallback
    if (!country && clientCountry) {
      console.log('⚠️ Server-side country detection failed, using client-detected country:', clientCountry);
      country = clientCountry;
    }
    
    console.log('🌍 Country detection result:', {
      serverDetected: getCountryFromRequest(request),
      clientDetected: clientCountry,
      finalCountry: country,
      email: email
    });

    // Use service role key for server-side operations (can set user metadata)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Check if user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === email);

    if (existingUser) {
      // User exists, try to send magic link
      console.log('User already exists, sending magic link');
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });
      if (otpError) {
        return NextResponse.json({ error: otpError.message }, { status: 400 });
      }
      return NextResponse.json({ 
        success: true, 
        message: "Magic link sent to existing user.",
        country: country 
      });
    }

    // Generate temporary password
    const tempPassword = Math.random().toString(36).slice(-12) + "Aa1!";

    // Create user using admin API with country in metadata
    const { data: createdUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password: tempPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        instant_signup: true,
        country: country || undefined, // Store country in user metadata
      },
    });

    if (createError) {
      console.error('❌ Create user error:', createError);
      return NextResponse.json(
        { error: createError.message },
        { status: 400 }
      );
    }

    console.log('✅ User created successfully:', {
      userId: createdUser.user?.id,
      email: createdUser.user?.email,
      storedCountry: createdUser.user?.user_metadata?.country,
      detectedCountry: country,
    });

    return NextResponse.json({
      success: true,
      user: createdUser.user,
      country: country,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


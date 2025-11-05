import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find admin user by email
    const { data: admin, error } = await supabase
      .from('site_admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      console.log('Admin not found:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if account is suspended
    if (admin.status === 'suspended') {
      return NextResponse.json(
        { error: 'Your account has been suspended. Please contact support.' },
        { status: 403 }
      );
    }

    // Verify password
    // For demo: simple base64 comparison (in production, use bcrypt.compare)
    const storedPassword = admin.password_hash 
      ? Buffer.from(admin.password_hash, 'base64').toString()
      : null;

    if (!storedPassword || storedPassword !== password) {
      console.log('Invalid password for:', email);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login timestamp
    await supabase
      .from('site_admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id);

    // Return admin info (excluding password)
    const { password_hash, ...adminInfo } = admin;

    return NextResponse.json({
      success: true,
      admin: adminInfo,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


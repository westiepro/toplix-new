import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log('🔐 LOGIN ATTEMPT:', { email, passwordLength: password?.length });

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing Supabase config');
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    // Validate input
    if (!email || !password) {
      console.log('❌ Missing email or password');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find admin user by email
    console.log('🔍 Looking up admin:', email);
    const { data: admin, error } = await supabase
      .from('site_admins')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !admin) {
      console.log('❌ Admin not found:', email, error?.message);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('✅ Admin found:', { 
      email: admin.email, 
      role: admin.role, 
      status: admin.status,
      hasPasswordHash: !!admin.password_hash 
    });

    // Check if account is suspended
    if (admin.status === 'suspended') {
      console.log('❌ Account suspended');
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

    console.log('🔑 Password check:', {
      hasStoredPassword: !!storedPassword,
      storedPasswordLength: storedPassword?.length,
      providedPasswordLength: password.length,
      passwordsMatch: storedPassword === password
    });

    if (!storedPassword || storedPassword !== password) {
      console.log('❌ Invalid password for:', email);
      console.log('Expected:', storedPassword);
      console.log('Received:', password);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    console.log('✅ Password verified!');

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


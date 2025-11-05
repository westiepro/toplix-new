import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// GET - Fetch all site admins
export async function GET(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { data: admins, error } = await supabase
      .from('site_admins')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admins:', error);
      return NextResponse.json(
        { error: 'Failed to fetch admins', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      admins: admins || [],
      count: admins?.length || 0,
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new site admin
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { full_name, email, password, role } = body;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    // Validate required fields
    if (!full_name || !email || !role) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name, email, role' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['Admin', 'Content Manager', 'Accountant', 'Viewer'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be one of: ' + validRoles.join(', ') },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if email already exists
    const { data: existing } = await supabase
      .from('site_admins')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'An admin with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password if provided (basic implementation - use bcrypt in production)
    let password_hash = null;
    if (password) {
      // In production, use bcrypt: const bcrypt = require('bcrypt'); password_hash = await bcrypt.hash(password, 10);
      password_hash = Buffer.from(password).toString('base64'); // Simple encoding for demo
    }

    // Insert new admin
    const { data: newAdmin, error } = await supabase
      .from('site_admins')
      .insert({
        full_name,
        email,
        password_hash,
        role,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating admin:', error);
      return NextResponse.json(
        { error: 'Failed to create admin', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      admin: newAdmin,
      message: 'Admin user created successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


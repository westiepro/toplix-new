import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// PUT - Update site admin
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    const body = await request.json();

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    // Validate role if being updated
    if (body.role) {
      const validRoles = ['Admin', 'Content Manager', 'Accountant', 'Viewer'];
      if (!validRoles.includes(body.role)) {
        return NextResponse.json(
          { error: 'Invalid role. Must be one of: ' + validRoles.join(', ') },
          { status: 400 }
        );
      }
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Prepare updates object
    const updates: any = {};
    
    if (body.full_name) updates.full_name = body.full_name;
    if (body.email) updates.email = body.email;
    if (body.role) updates.role = body.role;
    if (body.status) updates.status = body.status;
    
    // Only update password if provided
    if (body.password && body.password.trim() !== '') {
      // Hash password (simple base64 for demo - use bcrypt in production)
      updates.password_hash = Buffer.from(body.password).toString('base64');
    }

    const { data: admin, error } = await supabase
      .from('site_admins')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating admin:', error);
      return NextResponse.json(
        { 
          error: 'Failed to update admin', 
          details: error.message,
          hint: error.hint,
          code: error.code
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      admin,
      message: 'Admin updated successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete site admin
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error } = await supabase
      .from('site_admins')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting admin:', error);
      return NextResponse.json(
        { error: 'Failed to delete admin', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin deleted successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


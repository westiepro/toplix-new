import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";

// PUT: Update a translation (manual edit)
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { value } = await request.json();

		if (!value) {
			return NextResponse.json(
				{ error: "Missing value" },
				{ status: 400 }
			);
		}

		const supabase = getSupabaseServer();
		if (!supabase) {
			return NextResponse.json(
				{ error: "Database not configured" },
				{ status: 500 }
			);
		}

		const { data, error } = await supabase
			.from("translations")
			.update({
				value,
				is_auto_translated: false, // Mark as manually edited
			})
			.eq("id", id)
			.select()
			.single();

		if (error) {
			console.error("Error updating translation:", error);
			return NextResponse.json(
				{ error: "Failed to update translation" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true, translation: data });
	} catch (error) {
		console.error("Error in PUT /api/translations/[id]:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// DELETE: Remove a translation
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;

		const supabase = getSupabaseServer();
		if (!supabase) {
			return NextResponse.json(
				{ error: "Database not configured" },
				{ status: 500 }
			);
		}

		const { error } = await supabase
			.from("translations")
			.delete()
			.eq("id", id);

		if (error) {
			console.error("Error deleting translation:", error);
			return NextResponse.json(
				{ error: "Failed to delete translation" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error in DELETE /api/translations/[id]:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}


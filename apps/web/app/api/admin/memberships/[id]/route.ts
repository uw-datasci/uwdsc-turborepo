import { NextRequest, NextResponse } from "next/server";
import { ProfileService } from "@uwdsc/server/web/services/profileService";
import { createAuthService } from "@/lib/services";
import {
  markAsPaidSchema,
  editMemberSchema,
} from "@/lib/schemas/membership";

const profileService = new ProfileService();

/**
 * PATCH /api/admin/memberships/[id]
 * Update member information or mark as paid
 * Admin only endpoint
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Verify admin access
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // TODO: Add proper admin role check

    const body = await request.json();
    const { id } = params;

    // Determine operation type based on payload
    const isMarkAsPaid = "payment_method" in body;

    if (isMarkAsPaid) {
      // Validate mark as paid data
      const validationResult = markAsPaidSchema.safeParse(body);

      if (!validationResult.success) {
        return NextResponse.json(
          {
            error: "Validation error",
            message: validationResult.error.errors[0]?.message || "Invalid data",
          },
          { status: 400 },
        );
      }

      const result = await profileService.markMemberAsPaid(
        id,
        validationResult.data,
      );

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Failed to mark as paid" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { success: true, message: "Member marked as paid" },
        { status: 200 },
      );
    } else {
      // Validate edit member data
      const validationResult = editMemberSchema.safeParse(body);

      if (!validationResult.success) {
        return NextResponse.json(
          {
            error: "Validation error",
            message: validationResult.error.errors[0]?.message || "Invalid data",
          },
          { status: 400 },
        );
      }

      const result = await profileService.updateMember(
        id,
        validationResult.data,
      );

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || "Failed to update member" },
          { status: 400 },
        );
      }

      return NextResponse.json(
        { success: true, message: "Member updated successfully" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error updating member:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to update member",
      },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/admin/memberships/[id]
 * Delete a member
 * Admin only endpoint
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    // Verify admin access
    const authService = await createAuthService();
    const { user, error: userError } = await authService.getCurrentUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication required" },
        { status: 401 },
      );
    }

    // TODO: Add proper admin role check

    const { id } = params;

    const result = await profileService.deleteMember(id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to delete member" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Member deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Failed to delete member",
      },
      { status: 500 },
    );
  }
}

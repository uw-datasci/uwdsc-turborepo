import { NextResponse, NextRequest } from "next/server";
import { createApplicationService } from "@/lib/services";

// ============================================================================
// GET - Fetch application by profile ID
// ============================================================================

export async function GET(request: NextRequest): Promise<NextResponse> {
  const url = new URL(request.url);
  const profileId = url.searchParams.get("profile_id");

  if (!profileId) {
    return NextResponse.json(
      { error: "Missing profile_id parameter" },
      { status: 400 },
    );
  }

  try {
    const applicationService = await createApplicationService();
    const application = await applicationService.getApplication(profileId);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 },
    );
  }
}

// ============================================================================
// POST - Create new application
// ============================================================================

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const applicationService = await createApplicationService();

    await applicationService.createApplication(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 },
    );
  }
}

// ============================================================================
// PATCH - Update existing application
// ============================================================================

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { profile_id, ...updateData } = body;

    if (!profile_id) {
      return NextResponse.json(
        { error: "Missing profile_id" },
        { status: 400 },
      );
    }

    const applicationService = await createApplicationService();
    await applicationService.updateApplication(profile_id, updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}

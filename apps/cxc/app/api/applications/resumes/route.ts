import { NextRequest, NextResponse } from "next/server";
import { createAuthService, createResumeService } from "@/lib/services";

/**
 * POST /api/applications/resumes
 * Upload a resume file for the current user (replaces existing resume)
 */
export async function POST(req: NextRequest) {
  try {
    // Parse form data
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file) {
      return Response.json(
        { error: "Missing 'file' upload field" },
        { status: 400 },
      );
    }

    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Upload resume using service (automatically replaces existing resume)
    const resumeService = await createResumeService();
    const result = await resumeService.uploadResume({ file, userId: user.id });

    if (!result.success) {
      // Determine appropriate status code based on error type
      let statusCode = 500;
      if (result.error?.includes("too large")) statusCode = 413;
      else if (result.error?.includes("Invalid file type")) statusCode = 415;
      else if (result.error?.includes("Unsupported content type"))
        statusCode = 415;

      return Response.json({ error: result.error }, { status: statusCode });
    }

    return Response.json({
      message: result.message,
      key: result.key,
    });
  } catch (err: unknown) {
    console.error("Resume upload error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/applications/resumes
 * Get the current user's resume (returns signed URL for private bucket)
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Authenticate user
    const authService = await createAuthService();
    const { user, error: userErr } = await authService.getCurrentUser();

    if (userErr || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's resume with signed URL (ownership verified in service)
    const resumeService = await createResumeService();
    // Use signed URL (1 hour expiration) for private bucket
    const result = await resumeService.getSignedResumeUrl(user.id, 3600);

    if (!result.success) {
      // If resume doesn't exist, return null values (not an error)
      if (
        result.error?.includes("not found") ||
        result.error?.includes("No resume")
      ) {
        return NextResponse.json({
          resume: null,
          url: null,
          key: null,
        });
      }
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      resume: result.resume,
      url: result.url,
      key: result.key,
    });
  } catch (err: unknown) {
    console.error("Resume fetch error:", err);
    // Return null values instead of error if resume doesn't exist
    return NextResponse.json({
      resume: null,
      url: null,
      key: null,
    });
  }
}

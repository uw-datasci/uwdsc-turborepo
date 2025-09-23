import { AuthService } from "@uwdsc/server/cxc/services/authService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { email, password, metadata } = body;

    const authService = new AuthService();
    const result = await authService.register({ email, password });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      message: "Registration successful",
      user: result.user,
      session: result.session,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

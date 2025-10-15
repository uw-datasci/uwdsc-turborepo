import { NextRequest } from "next/server";
import { AuthService } from "@uwdsc/server/core/services/authService";

export async function POST(request: NextRequest) {
  try {
    const authService = new AuthService();
    const { success, error } = await authService.signOut();

    if (error) {
      return Response.json({ error: error }, { status: 500 });
    }

    return Response.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout endpoint error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

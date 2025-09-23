import { AuthService } from "@uwdsc/server/cxc/services/authService";

export async function POST() {
  try {
    const authService = new AuthService();
    const result = await authService.signOut();

    if (!result.success) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json({
      message: "Successfully signed out",
    });
  } catch (error) {
    console.error("Signout error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

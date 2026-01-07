/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ProfileService } from "@uwdsc/server/cxc/services/profileService";

/**
 * Middleware to protect admin routes (/admin/**)
 * Checks for authentication and admin role
 * Redirects unauthenticated users to /login
 * Redirects non-admin users to home
 */
export async function withProtected(request: NextRequest, user: any) {
  // If user is not authenticated, redirect to login
  if (!user) return NextResponse.redirect(new URL("/login", request.url));

  // All routes handled by this middleware require admin role
  try {
    const profileService = new ProfileService();
    const profile = await profileService.getProfileByUserId(user.id);

    if (profile?.role !== "admin") {
      // Redirect non-admin users to home
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Error checking admin role:", error);
    // On error, redirect to home for safety
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User is authenticated and has admin permissions
  return NextResponse.next();
}

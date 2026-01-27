/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect the /apply route
 * Redirects unauthenticated users to /
 * Allows authenticated users to access the apply page
 */
export function withApply(request: NextRequest, user: any) {
  // If user is not authenticated, redirect to /start
  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User is authenticated, allow access
  return NextResponse.next();
}

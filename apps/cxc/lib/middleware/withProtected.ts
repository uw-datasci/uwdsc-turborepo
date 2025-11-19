/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect routes that require authentication
 * Redirects unauthenticated users to /login
 */
export function withProtected(request: NextRequest, user: any) {
    // If route is protected and user is not authenticated, redirect to login
    if (!user) return NextResponse.redirect(new URL("/login", request.url));

    // Either not a protected route or user is authenticated
    return NextResponse.next();
}

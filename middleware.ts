import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Update the publicPaths array to include all public routes
const publicPaths = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/about",
  "/contact",
  "/features",
  "/faq",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (
    publicPaths.includes(pathname) ||
    pathname.startsWith("/api/") ||
    pathname.includes("/_next") ||
    pathname.includes("/images") ||
    pathname.includes("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // For dashboard routes, check for token but be permissive during development
  if (pathname.startsWith("/dashboard")) {
    // Get the token from the cookies
    const token = request.cookies.get("auth-token")?.value;

    // During development, allow access even without a token
    // In production, you would want to redirect to login if there's no token
    return NextResponse.next();
  }

  // For all other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected and authentication routes
const protectedRoutes = ["/dashboard", "/articles"];
const authRoutes = ["/api/auth/signin"];


export  function middleware(req: NextRequest) {
  console.log("Middleware is running for:", req.nextUrl.pathname);

  // ✅ Check if the authentication token exists
  const token = req.cookies.get("next-auth.session-token");
      console.log("token",token);
 
if (!token && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
  console.log("🔴 Unauthorized! Redirecting to Sign In...");
  return NextResponse.redirect(new URL("/api/auth/signin", req.url));
}

  // 🔄 Redirect authenticated users away from the sign-in page
  if (token && authRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next(); // Allow request to continue
}

// Apply middleware to these routes
export const config = {
  matcher: ["/dashboard/:path*", "/articles/:path*", "/api/auth/signin"], // Only these routes are affected
};

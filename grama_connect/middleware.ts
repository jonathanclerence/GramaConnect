import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const otpVerified = req.cookies.get("otpVerified")?.value;
  const userLoggedIn = req.cookies.get("userLoggedIn")?.value; // set this when user logs in

  const path = req.nextUrl.pathname;

  // ✅ OTP Verification for register flow
  if (!otpVerified && path.startsWith("/register/profile-details")) {
    return NextResponse.redirect(
      new URL("/register/register-details", req.url)
    );
  }

  // ✅ Auth protection for main pages
  const protectedPaths = ["/home", "/booking", "/documents", "/contact"];
  if (protectedPaths.some((p) => path.startsWith(p)) && !userLoggedIn) {
    return NextResponse.redirect(new URL("/register/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/register/:path*", "/home", "/booking", "/documents", "/contact"],
};

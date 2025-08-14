import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/firebaseConfig"; // client-side Firebase
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { serialize } from "cookie";

// Initialize Firebase Admin (for token verification)
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    // Verify token with Firebase Admin
    const decodedToken = await getAuth().verifyIdToken(idToken);

    // Set cookie for middleware
    const response = NextResponse.json({ message: "Logged in" });
    response.cookies.set("userLoggedIn", "true", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}

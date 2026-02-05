import { NextResponse } from "next/server";
import { twilioClient } from "@/lib/twilio";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { phone, otp } = await request.json();
  const formattedPhone = `+94${phone}`;
  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!serviceSid) {
    return NextResponse.json(
      { error: "Twilio Verify Service SID is not configured" },
      { status: 500 }
    );
  }

  try {
    const verificationCheck = await twilioClient.verify
      .services(serviceSid)
      .verificationChecks.create({ to: formattedPhone, code: otp });

    if (verificationCheck.status === "approved") {
      (await cookies()).set("otpVerified", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "test",
        path: "/",
      });
      return NextResponse.json({ message: "OTP verified successfully" });
    } else {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to verify OTP" },
      { status: 500 }
    );
  }
}

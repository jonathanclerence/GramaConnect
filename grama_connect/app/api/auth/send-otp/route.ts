import { NextResponse } from "next/server";
import { twilioClient } from "@/lib/twilio";

export async function POST(request: Request) {
  const { phone } = await request.json();
  const formattedPhone = `+94${phone}`;

  const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
  if (!serviceSid) {
    return NextResponse.json(
      { error: "Twilio Verify Service SID is not configured" },
      { status: 500 }
    );
  }

  try {
    const verification = await twilioClient.verify
      .services(serviceSid)
      .verifications.create({ to: formattedPhone, channel: "sms" });

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}

"use client";

import { useRouter } from "next/navigation"; // ✅ Import useRouter
import { ArrowLeft, Shield, User } from "lucide-react";
import Link from "next/link";

export default function RegisterDetailsPage() {
  const router = useRouter(); // ✅ Create router instance

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")} // ✅ Navigate to nested OTP page
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow"
        >
          <Link href="/">
            <ArrowLeft size={20} />
          </Link>
        </button>

        {/* Title */}
        <h2 className="mt-12 text-2xl font-semibold leading-tight mb-6">
          Complete your registration
          <br />
          <span className="font-normal">In just 3 steps</span>
        </h2>

        {/* Steps */}
        <ol className="space-y-2 text-gray-800 mb-6">
          <li>1 &nbsp; Verify your phone number</li>
          <li>2 &nbsp; Confirm your information</li>
        </ol>

        {/* Info Box */}
        <div className="border rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3 mb-2">
            <Shield size={20} className="text-gray-600 mt-1" />
            <p className="text-gray-700">
              G-Connect is committed to protecting your personal information.
            </p>
          </div>
          <hr className="my-2" />
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agree"
              className="mt-1 w-4 h-4 border-gray-400 rounded focus:ring-pink-300"
            />
            <label
              htmlFor="agree"
              className="text-gray-700 text-sm leading-snug"
            >
              By checking this box, I confirm that I have read and agree to
              Grama Connect’s Personal Data Processing Regulations and the Terms
              and Conditions for account services.
            </label>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => router.push("/register/otp")} // ✅ Navigate to login page
          className="mt-6 w-full bg-gradient-to-b from-white to-gray-100 text-gray-800 font-medium py-3 rounded-full shadow hover:shadow-md transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

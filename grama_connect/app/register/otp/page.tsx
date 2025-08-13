"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react"; // make sure you have lucide-react installed

export default function OtpPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (phone.length !== 9) {
      setError("Incorrect number. Please enter 9 digits.");
      return;
    }
    setError("");
    console.log("Sending OTP to: +94" + phone);
    setShowOtpSection(true);
  };

  const handleVerifyOtp = () => {
    console.log("Verifying OTP:", otp);
    router.push("/register/verify");
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={() => router.push("/register/register-details")}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold mb-2 mt-10">Begin now!</h1>
        <p className="text-gray-600 mb-4">
          Please provide your mobile number to verify your account.
        </p>

        {/* Phone Input with +94 prefix */}
        <div className="flex items-center border border-gray-300 rounded-full mb-2 overflow-hidden">
          <span className="bg-gray-100 px-4 py-3 text-gray-700">+94</span>
          <input
            type="tel"
            placeholder="77 123 4567"
            value={phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setPhone(value);
            }}
            className="flex-1 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Send OTP Button */}
        <button
          onClick={handleSendOtp}
          disabled={phone.length !== 9}
          className={`${
            phone.length === 9
              ? "bg-black hover:bg-gray-800 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          } text-white shadow-md rounded-full w-full py-3 font-medium hover:shadow-lg transition`}
        >
          Send OTP
        </button>

        {/* OTP Section */}
        {showOtpSection && (
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">OTP</h2>
            <input
              type="text"
              placeholder="000-000-0000"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded-full mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-white shadow-md rounded-full w-full py-3 font-medium hover:shadow-lg transition"
            >
              Verify
            </button>
          </div>
        )}

        {/* Policy Text */}
        <p className="text-xs text-gray-500 mt-4">
          By clicking "Next," you accept the{" "}
          <span className="font-semibold">Privacy policy</span> and{" "}
          <span className="font-semibold">Terms of service</span>.
        </p>

        {/* Next Button */}
        <button
          onClick={() => router.push("/register/profile-details")} // ✅ Goes to OTP page
          className="mt-6 w-full bg-gradient-to-b from-white to-gray-100 text-gray-800 font-medium py-3 rounded-full shadow hover:shadow-md transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

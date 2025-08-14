"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, User } from "lucide-react";

function ProfileDetails() {
  const router = useRouter();

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md relative">
        {/* Back Button */}
        <button
          onClick={() => router.push("/register/otp")}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">
          Personal Details
        </h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={48} className="text-gray-500" />
            )}

            {/* Pencil icon above the image */}
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-2 right-2 bg-gray-100 p-2 rounded-full shadow hover:bg-gray-100 cursor-pointer"
            >
              <Pencil size={16} />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <p className="mt-2 text-gray-500">Upload Profile Picture</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black placeholder-gray-400"
            />
          </div>
        </form>

        {/* Next Button */}
        <button
          onClick={() => router.push("/home")}
          className="mt-6 w-full bg-gradient-to-b from-white to-gray-100 text-gray-800 font-medium py-3 rounded-full shadow hover:shadow-md transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProfileDetails;

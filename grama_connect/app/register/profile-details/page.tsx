import React from "react";
import { ArrowLeft, Pencil, User } from "lucide-react";

function ProfileDetails() {
  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-md relative">
        {/* Back Button */}
        <button className="absolute top-4 left-4 bg-white rounded-full p-2 shadow">
          <ArrowLeft size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-6">Personal Details</h2>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            <User size={48} className="text-gray-500" />
            <button className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow hover:bg-gray-100">
              <Pencil size={16} />
            </button>
          </div>
          <p className="mt-2 text-gray-500">Upload Profile Picture</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 text-black placeholder-gray-400"
            />
          </div>
        </form>

        {/* Next Button */}
        <button className="mt-6 w-full bg-gradient-to-b from-white to-gray-100 text-gray-800 font-medium py-3 rounded-full shadow hover:shadow-md transition">
          Next
        </button>
      </div>
    </div>
  );
}

export default ProfileDetails;

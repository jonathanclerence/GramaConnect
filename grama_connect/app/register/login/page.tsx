"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.push("/home"); // Redirect to home after login
    console.log("Logging in with:", { username, password });
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-gray-50 rounded-3xl p-6 shadow-lg w-full max-w-md relative">
        {/* Back Button inside card */}
        <button className="absolute top-4 left-4 bg-white rounded-full p-2 shadow">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </button>

        {/* Username Field */}
        <label className="block mt-10 mb-1 font-medium">Username</label>
        <input
          type="email"
          placeholder="rimaz@gmail.com"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Password Field */}
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          placeholder="**********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Login Button inside card */}
        <button
          onClick={handleLogin}
          className="bg-white shadow-md rounded-full w-full py-3 font-medium hover:shadow-lg transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

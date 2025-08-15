"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const idToken = await userCredential.user.getIdToken();

      // Call API to set cookie
      await fetch("/api/auth/set-cookie", {
        method: "POST",
        body: JSON.stringify({ idToken }),
        headers: { "Content-Type": "application/json" },
      });
      router.push("/home");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-gray-50 rounded-3xl p-6 shadow-lg w-full max-w-md relative">
        {/* Back Button */}
        <button className="absolute top-4 left-4 bg-white rounded-full p-2 shadow">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </button>

        {/* Username Field */}
        <label className="block mt-10 mb-1 font-medium">Email</label>
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

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-white shadow-md rounded-full w-full py-3 font-medium hover:shadow-lg transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, User } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebaseClient";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function ProfileDetails() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [nic, setNic] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: fullName });
      const idToken = await userCredential.user.getIdToken();

      let photoURL = null;
      if (profileImageFile) {
        const reader = new FileReader();
        reader.readAsDataURL(profileImageFile);
        reader.onloadend = async () => {
          const base64 = reader.result?.toString();
          const res = await fetch("/api/avatar-upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uid: userCredential.user.uid,
              image: base64,
            }),
          });
          const data = await res.json();
          photoURL = data.url;
          console.log("Uploaded URL:", photoURL);
        };
      }

      // Update Firebase Auth profile
      await updateProfile(userCredential.user, {
        displayName: fullName,
        photoURL,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullName,
        email,
        address,
        nic: nic || null,
        gender: gender || null,
        dob: dob || null,
        photoURL: photoURL || null,
        createdAt: new Date(),
      });

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
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-gradient-to-b from-white to-gray-100 text-gray-800 font-medium py-3 rounded-full shadow hover:shadow-md transition"
          >
            {loading ? "Registering..." : "Next"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileDetails;

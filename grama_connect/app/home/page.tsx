"use client";

import Image from "next/image";
import { Bell } from "lucide-react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

type Appointment = {
  id: string;
  name: string;
  description: string;
  date: string;
  imageUrl: string;
};

const containerStyle = {
  width: "100%",
  height: "150px",
  borderRadius: "1rem",
};

const center = {
  lat: 6.9271, // Example: Colombo, Sri Lanka
  lng: 79.8612,
};

export default function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Fetch user info from Firestore
  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.fullName || "User");
          setUserPhoto(data.photoURL || null);
        }
      }
    };

    fetchUser();
  }, []);

  const appointments: Appointment[] = [
    {
      id: "1",
      name: "Grama Niladhari",
      description: "Character Certificate",
      date: "5/08/2025",
      imageUrl: "/images/user1.jpg",
    },
    {
      id: "2",
      name: "Pradeshiya Sabawa",
      description: "House approval",
      date: "9/08/2025",
      imageUrl: "/images/user2.jpg",
    },
    {
      id: "3",
      name: "Divisional Secretariat",
      description: "National ID",
      date: "11/08/2025",
      imageUrl: "/images/user3.jpg",
    },
  ];

  return (
    <div className="p-6 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Link href="/Profile">
              {userPhoto ? (
                <Image
                  src={userPhoto}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
              )}
            </Link>
          </div>
          <h1 className="text-lg font-bold">Hello {userName}</h1>
        </div>
        <Bell className="w-6 h-6 text-gray-700" />
      </div>

      {/* Locate GS Office */}
      <div>
        <h2 className="text-lg font-bold mb-3">Locate your GS office</h2>
        <div className="rounded-2xl overflow-hidden shadow-lg border border-white/20">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={14}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      {/* Appointments */}
      <div>
        <h2 className="text-lg font-bold mb-3">Your Appointments</h2>
        <div className="rounded-3xl p-4 bg-white/40 backdrop-blur-md shadow-lg space-y-3 border border-white/20">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="flex items-center justify-between rounded-2xl p-3 bg-[#b29292]/60 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={appt.imageUrl}
                    alt={appt.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium leading-tight">
                    {appt.name}
                  </p>
                  <p className="text-white text-xs">{appt.description}</p>
                </div>
              </div>
              <p className="text-white text-sm">{appt.date}</p>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full mt-4 rounded-full bg-white/70 backdrop-blur-md hover:bg-white"
          >
            <Link href="/booking">Schedule Appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

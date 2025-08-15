import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="sm:w-1/3 w-full bg-[#f3e6e6] sm:rounded-xl flex flex-col items-center p-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md my-4">
        <GlassButton>
          <Link href="/home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </GlassButton>
        <h1 className="font-medium text-lg">Home</h1>
        <GlassButton>
          <Share2 className="h-5 w-5" />
        </GlassButton>
      </div>

      {/* Profile Card */}
      <Card className="w-full max-w-md border-none shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center gap-4 p-0">
          <div className="flex items-center gap-2">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">Rimaz Rizawan</h2>
          </div>

          <div className="w-full space-y-3 mt-2">
            <ProfileField label="Email" value="Pawanpoojary36@gmail.com" />
            <ProfileField label="Phone Number" value="917996767715" />
            <ProfileField label="Gender" value="Male" />
            <ProfileField label="Date of Birth" value="24/02/1997" />
            <ProfileField label="Address" value="HiLL street" />
            <ProfileField label="National Identity No" value="11222233331" />
          </div>

          <GlassButton className="w-full rounded-full text-black">
            <Link href="/profile/edit">Edit Profile</Link>
          </GlassButton>
        </CardContent>
      </Card>
    </div>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div>
      <p className="text-sm text-[#8E89A9]">{label}</p>
      <p className="border-b border-gray-300 pb-1">{value}</p>
    </div>
  );
}

function GlassButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`px-4 py-2 rounded-full bg-white/30 backdrop-blur-md shadow-md border border-white/20 hover:bg-white/40 transition ${className}`}
    >
      {children}
    </button>
  );
}

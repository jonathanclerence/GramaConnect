"use client";

import { useState, ChangeEvent, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Share2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function EditProfilePage() {
  // States for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [nid, setNid] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("https://via.placeholder.com/150");

  // Ref for hidden file input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="sm:w-1/3 w-full h-screen sm:h-auto bg-[#f8ebeb] sm:rounded-xl flex flex-col items-center px-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md my-4">
        <GlassButton className="p-2 rounded-full">
          <Link href="/home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </GlassButton>
        <h1 className="font-bold text-lg">Home</h1>
        <GlassButton className="p-2 rounded-full">
          <Share2 className="h-5 w-5" />
        </GlassButton>
      </div>

      {/* Profile Card */}
      <Card className="w-full max-w-md border-none shadow-none bg-transparent">
        <CardContent className="flex flex-col items-center gap-4 p-0">
          {/* Avatar with edit button */}
          <div className="relative">
            <Avatar className="w-28 h-28">
              <AvatarImage src={avatarUrl} alt="Profile" />
              <AvatarFallback>{fullName ? fullName[0] : "RR"}</AvatarFallback>
            </Avatar>
            <GlassButton
              className="absolute bottom-0 right-0 p-2 rounded-full cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Pencil className="h-4 w-4" />
            </GlassButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Form Fields */}
          <form className="w-full space-y-3 mt-2">
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="rounded-2xl h-12 bg-[#F5F5F5]"
              placeholder="Full Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="Email"
              type="email"
            />
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="Phone Number"
              type="tel"
            />

            <div className="flex gap-2">
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="rounded-2xl w-1/2 bg-[#F5F5F5]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="rounded-2xl w-1/2 bg-[#F5F5F5]"
                placeholder="Date Of Birth"
                type="date"
              />
            </div>

            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="Address"
            />
            <Input
              value={nid}
              onChange={(e) => setNid(e.target.value)}
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="National Identity No"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="*************"
              type="password"
            />

            <GlassButton
              type="submit"
              className="w-full h-12 rounded-full font-medium"
            >
              Save
            </GlassButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function GlassButton({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "bg-white/75 backdrop-blur-md shadow-md border border-white/20 hover:bg-white/40 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

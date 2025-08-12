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

export default function EditProfilePage() {
  return (
    <div className="sm:w-1/3 w-full h-screen sm:h-auto bg-[#f8ebeb] sm:rounded-xl flex flex-col items-center px-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md my-4">
        <GlassButton className="p-2 rounded-full">
          <ArrowLeft className="h-5 w-5" />
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
              <AvatarImage
                src="https://via.placeholder.com/150"
                alt="Profile"
              />
              <AvatarFallback>RR</AvatarFallback>
            </Avatar>
            <GlassButton className="absolute bottom-0 right-0 p-2 rounded-full">
              <Pencil className="h-4 w-4" />
            </GlassButton>
          </div>

          {/* Form Fields */}
          <form className="w-full space-y-3 mt-2">
            <Input
              className="rounded-2xl h-12 bg-[#F5F5F5]"
              placeholder="Rimaz Rizwan"
            />
            <Input
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="rimazrizwan@gmail.com"
              type="email"
            />
            <Input
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="+91799766221"
              type="tel"
            />

            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="rounded-2xl w-1/2 bg-[#F5F5F5]">
                  <SelectValue placeholder="Male" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input
                className="rounded-2xl w-1/2 bg-[#F5F5F5]"
                placeholder="23-02-1997"
                type="text"
              />
            </div>

            <Input
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="Hill Street"
            />
            <Input
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="112293910221"
            />
            <Input
              className="rounded-2xl bg-[#F5F5F5]"
              placeholder="*************"
              type="password"
            />

            <GlassButton className="w-full h-12 rounded-full font-medium">
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
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "bg-white/75 backdrop-blur-md shadow-md border border-white/20 hover:bg-white/40 transition",
        className
      )}
    >
      {children}
    </button>
  );
}

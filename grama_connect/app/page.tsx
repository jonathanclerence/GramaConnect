// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GoogleIcon } from "./components/icons/google-icon";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#EFE6E6] p-4">
      {/* Top Bar - Language Toggle */}
      <div className="flex justify-end items-center mt-2">
        <Switch id="language-mode" />
        <Label htmlFor="language-mode" className="ml-2 text-sm font-semibold">
          EN
        </Label>
      </div>

      {/* Center Logo Card */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="backdrop-blur-sm bg-[#F5F5F5E6] border border-white/50 rounded-3xl shadow-lg p-6">
          <Image
            src="/gramaConnectLogo.jpeg"
            alt="Grama Connect Logo"
            width={220}
            height={220}
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Buttons + Footer */}
      <div className="flex flex-col items-center gap-4 mb-6">
        {/* Login & Register */}
        <Button
          size="lg"
          className="w-full rounded-full backdrop-blur-md bg-white/30 border border-white/40 text-black shadow-sm"
        >
          <Link href="/register/login">Log In</Link>
        </Button>
        <Button
          size="lg"
          className="w-full rounded-full backdrop-blur-md bg-white/30 border border-white/40 text-black shadow-sm"
        >
          <Link href="/register/register-details">Register</Link>
        </Button>

        {/* Separator */}
        <div className="relative w-full my-1">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <Button
          variant="outline"
          className="w-full rounded-lg backdrop-blur-md bg-black/70 text-white hover:bg-black border border-white/20"
        >
          <GoogleIcon className="mr-2" />
          Google
        </Button>

        {/* Terms */}
        <p className="px-6 text-center text-xs text-gray-500">
          By registering you agree with our{" "}
          <Link
            href="/terms"
            className="text-purple-600 underline underline-offset-2"
          >
            Terms and Conditions
          </Link>
        </p>
      </div>
    </main>
  );
}

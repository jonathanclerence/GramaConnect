// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GoogleIcon } from "./components/icons/google-icon";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f7f4f4] p-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <div className="flex items-center justify-end space-x-2">
            <Switch id="language-mode" />
            <Label htmlFor="language-mode" className="font-semibold">EN</Label>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6 pb-6 text-center">
          <div className="flex flex-col items-center gap-2">
            {/* Logo */}
            <Image
              src="/gramaConnectLogo.jpeg"
              alt="Grama Connect Logo"
              width={160}
              height={160}
              priority
            />
            {/* Title and Tagline */}
            {/* <h1 className="text-3xl font-bold tracking-wider text-gray-800">
              GRAMA CONNECT
            </h1>
            <p className="text-xs font-medium tracking-wide text-gray-500">
              CONNECTION, SERVICE, AND TRUST.
            </p> */}
          </div>

          <div className="flex w-full flex-col gap-3 pt-4">
            <Button size="lg" className="w-full">
              Log In
            </Button>
            <Button size="lg" variant="outline" className="w-full">
              Register
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            {/* Separator */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          {/* Google Button */}
          <Button variant="outline" className="w-full">
            <GoogleIcon className="mr-2" />
            Google
          </Button>

          {/* Terms and Conditions */}
          <p className="px-8 text-center text-xs text-muted-foreground">
            By registering you agree with our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms and Conditions
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
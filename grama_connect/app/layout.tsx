import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "./components/layout/bottom-nav";
import { cn } from "@/lib/utils";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grama Connect",
  description: "Connection, Service, and Trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-[#EFE6E6]")}>
        {/* Main content with padding-bottom to avoid overlap with nav bar */}
        <div className="relative min-h-screen">{children}</div>

        {/* Floating Navigation Bar */}
        <BottomNav />
      </body>
    </html>
  );
}

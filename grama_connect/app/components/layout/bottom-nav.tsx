// components/layout/bottom-nav.tsx
"use client"; // This is a client component because it uses a hook

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/docs", icon: FileText, label: "Docs" },
  { href: "/contacts", icon: Users, label: "Contact" },
  { href: "/booking", icon: Calendar, label: "Booking" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-50 h-16 w-[90%] max-w-md -translate-x-1/2 rounded-full border border-white/50 bg-white/30 p-2 shadow-lg backdrop-blur-xl">
      <div className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex h-12 w-12 flex-col items-center justify-center gap-1 rounded-full text-gray-600 transition-all",
                isActive && "bg-blue-500 text-white shadow-md"
              )}
            >
              <item.icon className="h-6 w-6" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
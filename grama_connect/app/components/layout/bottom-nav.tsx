// components/layout/bottom-nav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Users, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/Home", icon: Home, label: "Home" },
  { href: "/documents", icon: FileText, label: "Docs" },
  { href: "/Contacts", icon: Users, label: "Contact" },
  { href: "/Booking", icon: Calendar, label: "Booking" },
];

export function BottomNav() {
  const pathname = usePathname();

  // DEFINE which paths should show the nav bar
  const visiblePaths = ["/Home", "/documents", "/Contacts", "/Booking"];

  // CHECK if the current path starts with one of the visible paths
  const isVisible = visiblePaths.some((path) => pathname.startsWith(path));

  // If the path is not in our list, render nothing!
  if (!isVisible) {
    return null;
  }

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

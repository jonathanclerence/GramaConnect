"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string; // could be an ISO string in future
  avatar: string;
  accent?: string; // optional accent color per notification
};

export default function NotificationsPage() {
  // Static seed data for now; in future fetch from Firestore/API
  const notifications: Notification[] = useMemo(
    () => [
      {
        id: "1",
        title: "Pension Form Reminder",
        message: "Due Date 20/08/2025",
        time: "9:41 AM",
        avatar: "/chatAvatars/messi.jpg",
        accent: "from-white/80 to-white/40",
      },
      {
        id: "2",
        title: "Character Certificate",
        message: "Upcoming Appointment with Gs",
        time: "9:41 AM",
        avatar: "/chatAvatars/dembele.jpg",
        accent: "from-white/80 to-white/40",
      },
      {
        id: "3",
        title: "Voters List",
        message: "Registration for 2026 Elections Open",
        time: "9:41 AM",
        avatar: "/chatAvatars/cristiano.jpg",
        accent: "from-white/80 to-white/40",
      },
      {
        id: "4",
        title: "Every Vote Counts",
        message: "Vote for your preferred party today!",
        time: "9:41 AM",
        avatar: "/chatAvatars/negreira.jpg",
        accent: "from-white/80 to-white/40",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen px-6 pb-10 pt-4 space-y-6">
      {/* Top Bar */}
      <div className="flex items-center gap-4 pt-2">
        <Link
          href="/home"
          aria-label="Back to home"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/40 backdrop-blur-md shadow-sm"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
      </div>

      <div className="flex flex-col gap-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={cn(
              "flex items-center justify-between gap-4 rounded-3xl border border-white/30 bg-gradient-to-br p-4 shadow-sm backdrop-blur-xl",
              n.accent
            )}
          >
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/40">
                <Image
                  src={n.avatar}
                  alt={n.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="leading-tight">
                <p className="font-semibold text-sm md:text-base">{n.title}</p>
                <p className="text-xs text-muted-foreground max-w-[16rem] md:max-w-none">
                  {n.message}
                </p>
              </div>
            </div>
            <time className="shrink-0 pl-2 text-[10px] font-medium text-muted-foreground md:text-xs">
              {n.time}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}

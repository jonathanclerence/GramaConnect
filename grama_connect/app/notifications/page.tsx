"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notifications } from "@/lib/data";

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-[#EFE6E6] p-4">
      {/* Header */}
      <header className="flex items-center gap-4 py-4 mb-6">
        <Link
          href="/home"
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
      </header>

      {/* Notifications List */}
      <section className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center gap-4 rounded-2xl border border-white/50 bg-white/40 p-4 shadow-sm backdrop-blur-lg transition-all duration-200 hover:bg-white/50"
          >
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={notification.avatarUrl}
                  alt={notification.title}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    // Fallback to a default avatar if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = "/chatAvatars/cristiano.jpg";
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-tight">
                {notification.description}
              </p>
            </div>

            {/* Timestamp */}
            <div className="flex-shrink-0">
              <span className="text-xs text-gray-500 font-medium">
                {notification.timestamp}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Empty state if no notifications */}
      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-white/40 p-8 backdrop-blur-lg mb-4">
            <ArrowLeft className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            No notifications yet
          </h3>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            When you receive updates about your appointments, documents, or other activities, they'll appear here.
          </p>
        </div>
      )}
    </main>
  );
}
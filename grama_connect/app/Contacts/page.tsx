// app/contacts/page.tsx
import Image from "next/image";
import Link from "next/link";
import { authorities } from "@/lib/data";
import { ChevronRight } from "lucide-react";

export default function ContactsPage() {
  return (
    <main className="p-4">
      <header className="py-4">
        <h1 className="text-3xl font-bold text-gray-800">
          Your Local Authorities
        </h1>
      </header>

      <section className="flex flex-col gap-4">
        {authorities.map((authority) => (
          <Link
            href={`/Chat/${authority.id}`}
            key={authority.id}
            className="group"
          >
            <div className="flex items-center gap-4 rounded-2xl border border-white/50 bg-white/40 p-4 shadow-sm backdrop-blur-lg transition-transform duration-200 group-hover:scale-105">
              <Image
                src={authority.avatarUrl}
                alt={authority.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border-2 border-white object-cover"
              />
              <div className="flex-grow">
                <p className="font-bold text-gray-900">{authority.name}</p>
                <p className="text-sm text-gray-600">{authority.role}</p>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
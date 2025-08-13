"use client";

import Image from "next/image";
import { X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type DocumentItem = {
  id: string;
  title: string;
  imageUrl: string;
  verified?: boolean;
};

interface DocumentSectionProps {
  title: string;
  documents: DocumentItem[];
}

function DocumentCard({ doc }: { doc: DocumentItem }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative w-[150px] h-[100px] rounded-2xl overflow-hidden shadow-lg",
          "bg-white/30 backdrop-blur-md border border-white/20"
        )}
      >
        <Image
          src={doc.imageUrl}
          alt={doc.title}
          fill
          className="object-cover"
        />

        {doc.verified && (
          <div className="absolute top-1 left-1 bg-blue-500 text-white rounded-full p-[2px] border border-white">
            <CheckCircle size={14} />
          </div>
        )}

        <button className="absolute top-1 right-1 p-1 bg-white/70 rounded-full hover:bg-white transition">
          <X size={14} />
        </button>
      </div>
      <span className="mt-2 text-sm text-gray-700 underline">{doc.title}</span>
    </div>
  );
}

function DocumentSection({ title, documents }: DocumentSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-6">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const verifiedDocs: DocumentItem[] = [
    {
      id: "1",
      title: "Nic",
      imageUrl: "/images/nic1.jpg",
      verified: true,
    },
    {
      id: "2",
      title: "Birth Certificate",
      imageUrl: "/images/birth.jpg",
      verified: true,
    },
    {
      id: "3",
      title: "Nic",
      imageUrl: "/images/nic2.jpg",
      verified: true,
    },
  ];

  const otherDocs: DocumentItem[] = [
    {
      id: "4",
      title: "Nic",
      imageUrl: "/images/nic3.jpg",
    },
  ];

  return (
    <div className="p-6 h-screen">
      <DocumentSection title="Verified Documents" documents={verifiedDocs} />
      <DocumentSection title="Other Documents" documents={otherDocs} />
    </div>
  );
}

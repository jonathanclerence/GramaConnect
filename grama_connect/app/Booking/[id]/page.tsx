// app/booking/[id]/page.tsx
"use client";

import { useState, useRef } from "react";
import { ChevronLeft, Image as ImageIcon, X, Star, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";

// --- Mock Data for the Page ---
const mockBookingDetails = {
  id: "bk_12345",
  subject: "Character Certificate",
  officer: "Grama Niladhari",
  date: "July 16, Tue",
  time: "09:00 AM",
  documents: [] as File[], // Start with no pre-loaded documents
  qrValue: "GRAMACONNECT_BOOKING_ID_12345",
};

// --- Main Page Component ---
export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(mockBookingDetails.documents);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileDelete = (fileToDelete: File) => {
    setUploadedFiles(uploadedFiles.filter((file) => file !== fileToDelete));
  };

  return (
    <main className="p-4 pt-6 pb-28">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      <div className="mx-auto max-w-md space-y-6">
        <header className="relative flex items-center justify-center">
          <Link href="/home" className="absolute left-0 p-1">
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </Link>
          <h1 className="text-lg font-semibold text-gray-800">
            Appointment Details
          </h1>
        </header>

        <div className="space-y-4">
          <div className="w-full rounded-xl border-white/50 bg-white/40 p-3 text-gray-700 backdrop-blur-lg">
            {mockBookingDetails.subject}
          </div>
          <div className="w-full rounded-xl border-white/50 bg-white/40 p-3 text-gray-700 backdrop-blur-lg">
            {mockBookingDetails.officer}
          </div>
        </div>

        <DocumentsSection
          files={uploadedFiles}
          onDelete={handleFileDelete}
          onUpload={triggerFileUpload}
          isCompleted={isCompleted}
        />

        {isCompleted ? (
          <FeedbackSection 
            rating={rating} 
            setRating={setRating} 
            feedbackText={feedbackText} 
            setFeedbackText={setFeedbackText} 
          />
        ) : (
          <PendingSection />
        )}

        <Button onClick={() => setIsCompleted(!isCompleted)} variant="secondary" className="w-full">
          Toggle to {isCompleted ? "Pending" : "Completed"} View
        </Button>
      </div>
    </main>
  );
}

// --- Reusable Documents Component ---
function DocumentsSection({ files, onDelete, onUpload, isCompleted }: any) {
  return (
    <Card className="rounded-2xl border-none bg-white/40 p-4 backdrop-blur-lg">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-semibold text-gray-800">
          Documents for this Meeting
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        {files.length > 0 ? (
          <div className="flex items-center gap-3 overflow-x-auto p-2">
            {files.map((file: File, index: number) => (
              <div key={`${file.name}-${index}`} className="relative flex-shrink-0">
                {file.type.startsWith("image/") ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-lg object-cover"
                    onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                  />
                ) : (
                  <div className="flex h-20 w-20 flex-col items-center justify-center rounded-lg bg-gray-200 p-2">
                    <FileText className="h-8 w-8 text-gray-500" />
                    <p className="mt-1 truncate text-xs text-gray-600">{file.name}</p>
                  </div>
                )}
                {!isCompleted && (
                  <button
                    onClick={() => onDelete(file)}
                    className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white shadow-md"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="py-2 text-sm text-gray-500">No documents uploaded yet.</p>
        )}
        
        {!isCompleted && (
          <Button
            onClick={onUpload}
            variant="outline"
            className="mt-2 w-full rounded-xl border-white/50 bg-white/30 backdrop-blur-lg"
          >
            Upload or Add Documents
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// --- Sub-component for the Pending State ---
function PendingSection() {
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-none bg-white/40 p-4 backdrop-blur-lg">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-semibold text-gray-800">Date and Time</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <div className="flex items-center gap-4">
            <p className="font-medium text-gray-600">{mockBookingDetails.date.split(" ")[0]}</p>
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-blue-500 text-white">
              <span className="font-bold">{mockBookingDetails.date.split(" ")[1]}</span>
              <span className="text-xs">{mockBookingDetails.date.split(" ")[2]}</span>
            </div>
            <div className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white">
              {mockBookingDetails.time}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="rounded-2xl border-none bg-white/60 p-4 text-center backdrop-blur-lg">
        <CardHeader className="p-0">
          <CardTitle className="mb-2 text-base font-semibold text-gray-800">Show this QR at the office</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-0 pt-2">
          <QRCodeSVG value={mockBookingDetails.qrValue} size={128} bgColor="transparent" />
        </CardContent>
      </Card>

      <Button variant="destructive" className="w-full rounded-full bg-red-500 text-lg">
        Cancel Appointment
      </Button>
    </div>
  );
}

// --- Sub-component for the Completed State ---
function FeedbackSection({ rating, setRating, feedbackText, setFeedbackText }: any) {
  return (
    <Card className="rounded-2xl border-none bg-white/40 p-4 backdrop-blur-lg">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-semibold text-gray-800">Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-0 pt-4">
        <Textarea
          placeholder="Write your feedback for the Grama Niladhari..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="min-h-[100px] rounded-xl border-white/50 bg-white/30 backdrop-blur-lg"
        />
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setRating(star)}>
              <Star
                className={cn("h-10 w-10 text-gray-300 transition-colors", rating >= star && "text-yellow-400")}
                fill={rating >= star ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
        <Button className="w-full rounded-full bg-blue-500 text-lg">
          Submit Feedback
        </Button>
      </CardContent>
    </Card>
  );
}

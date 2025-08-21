// app/booking/[id]/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, Image as ImageIcon, X, Star, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { QRCodeSVG } from "qrcode.react";
import { auth } from "@/lib/firebaseConfig";
import { useRouter } from "next/navigation";

type BookingDetails = {
  id: string;
  subject?: string;
  officerName?: string;
  appointment_datetime?: { seconds: number } | string | null;
  time?: string;
  serviceName?: string;
  documents?: { id?: string; file_name?: string; file_url?: string }[];
  qr_code_value?: string;
  status?: string;
};

// --- Main Page Component ---
export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  useEffect(() => {
    fetchBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchBooking() {
    setLoading(true);
    setError(null);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError('You must be signed in to view this booking.');
        setLoading(false);
        return;
      }
      const idToken = await currentUser.getIdToken();
      const res = await fetch(`/api/bookings/${params.id}`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Failed to load booking');
        setLoading(false);
        return;
      }
      // Map server data to UI state
      setBooking(data as BookingDetails);
      setUploadedFiles(data.documents || []);
      setLoading(false);
    } catch (err: any) {
      setError(err?.message || 'Unexpected error while fetching booking');
      setLoading(false);
    }
  }

  async function cancelBooking() {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setError('You must be signed in to cancel this booking.');
        return;
      }
      const idToken = await currentUser.getIdToken();
      const res = await fetch(`/api/bookings/${params.id}/cancel`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${idToken}` },
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Failed to cancel booking');
        return;
      }
      // refetch to update status
      await fetchBooking();
    } catch (err: any) {
      setError(err?.message || 'Unexpected error while cancelling booking');
    }
  }

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
          {loading ? (
            <p className="text-center text-sm text-gray-500">Loading booking...</p>
          ) : error ? (
            <p className="text-center text-sm text-red-600">{error}</p>
          ) : booking ? (
            <>
              <div className="w-full rounded-xl border-white/50 bg-white/40 p-3 text-gray-700 backdrop-blur-lg">{booking.subject || booking.serviceName}</div>
              <div className="w-full rounded-xl border-white/50 bg-white/40 p-3 text-gray-700 backdrop-blur-lg">{booking.officerName}</div>
            </>
          ) : (
            <p className="text-center text-sm text-gray-500">No booking found.</p>
          )}
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
          <PendingSection booking={booking} cancelBooking={cancelBooking} />
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
function PendingSection({ booking, cancelBooking }: any) {
  // booking: BookingDetails | null
  // cancelBooking: () => Promise<void>
  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-none bg-white/40 p-4 backdrop-blur-lg">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-semibold text-gray-800">Date and Time</CardTitle>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <div className="flex items-center gap-4">
            <p className="font-medium text-gray-600">{booking?.appointment_datetime ? new Date(booking.appointment_datetime as any).toLocaleDateString() : '—'}</p>
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-blue-500 text-white">
              <span className="font-bold">{booking?.appointment_datetime ? new Date(booking.appointment_datetime as any).toLocaleString(undefined, { day: 'numeric' }) : ''}</span>
              <span className="text-xs">{booking?.appointment_datetime ? new Date(booking.appointment_datetime as any).toLocaleString(undefined, { weekday: 'short' }) : ''}</span>
            </div>
            <div className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white">
              {booking?.time || (booking?.appointment_datetime ? new Date(booking.appointment_datetime as any).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—')}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="rounded-2xl border-none bg-white/60 p-4 text-center backdrop-blur-lg">
        <CardHeader className="p-0">
          <CardTitle className="mb-2 text-base font-semibold text-gray-800">Show this QR at the office</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-0 pt-2">
          <QRCodeSVG value={booking?.qr_code_value || ''} size={128} bgColor="transparent" />
        </CardContent>
      </Card>

      <Button variant="destructive" onClick={cancelBooking} className="w-full rounded-full bg-red-500 text-lg">
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

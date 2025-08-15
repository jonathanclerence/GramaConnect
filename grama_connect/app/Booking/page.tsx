// app/booking/page.tsx
"use client";

import { useState, useMemo, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { authorities, bookingSubjects, availableTimes, serviceMappings } from "@/lib/data";
import { Image as ImageIcon, X, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Helper for calendar (no changes needed here)
const getWeekDays = (startDate: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    days.push({
      date: date.getDate(),
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      fullDate: date.toISOString().split("T")[0],
      monthName: date.toLocaleString("en-US", { month: "long" }),
    });
  }
  return days;
};

export default function BookingPage() {
  const [subject, setSubject] = useState("");
  const [officer, setOfficer] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [requestOnline, setRequestOnline] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const calendarDays = useMemo(() => getWeekDays(weekStartDate), [weekStartDate]);
  const currentMonthName = calendarDays[0]?.monthName || "";

  // --- UPDATED: Handler for subject change ---
  const handleSubjectChange = (selectedSubjectId: string) => {
    // Check for our special "show-all" option
    if (selectedSubjectId === "show-all") {
      setOfficer(""); // Clear the officer selection
      setSubject(""); // Clear the subject selection
      return;
    }
    
    setSubject(selectedSubjectId);
    const responsibleOfficerId = serviceMappings[selectedSubjectId]?.responsible[0];
    if (responsibleOfficerId) {
      setOfficer(responsibleOfficerId);
    } else {
      setOfficer("");
    }
  };

  const handleOfficerChange = (selectedOfficerId: string) => {
    setOfficer(selectedOfficerId);
    setSubject("");
  };

  const filteredSubjects = useMemo(() => {
    if (!officer) return bookingSubjects;
    const responsibleSubjectIds = Object.keys(serviceMappings).filter((id) => serviceMappings[id].responsible.includes(officer));
    return bookingSubjects.filter((s) => responsibleSubjectIds.includes(s.id));
  }, [officer]);

  const requiredDocs = subject ? serviceMappings[subject]?.docs || [] : [];
  
  // (All other functions remain the same)
  const handleNextWeek = () => { const nextDate = new Date(weekStartDate); nextDate.setDate(weekStartDate.getDate() + 7); setWeekStartDate(nextDate); };
  const handlePreviousWeek = () => { const prev = new Date(weekStartDate); prev.setDate(weekStartDate.getDate() - 7); setWeekStartDate(prev); };
  const isPastWeekDisabled = weekStartDate.toISOString().split("T")[0] <= new Date().toISOString().split("T")[0];
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => { if (event.target.files) setUploadedFiles((prev) => [...prev, ...Array.from(event.target.files!)]); };
  const triggerFileUpload = () => fileInputRef.current?.click();
  const handleFileDelete = (fileToDelete: File) => setUploadedFiles(uploadedFiles.filter((file) => file !== fileToDelete));

  return (
    // --- UPDATED: Added pt-12 (padding-top) to move content down ---
    <main className="p-4 pt-20">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-4">
          <Select onValueChange={handleSubjectChange} value={subject}>
            <SelectTrigger className="w-full rounded-xl border-white/50 bg-white/40 backdrop-blur-lg"><SelectValue placeholder="Select a Service" /></SelectTrigger>
            <SelectContent position="popper">
              {/* --- Conditionally show the "Show All" option --- */}
              {officer && (
                <SelectItem value="show-all" className="font-bold text-blue-600">
                  -- Show All Services --
                </SelectItem>
              )}
              {filteredSubjects.map((s) => (<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>))}
            </SelectContent>
          </Select>
          
          <Select onValueChange={handleOfficerChange} value={officer}><SelectTrigger className="w-full rounded-xl border-white/50 bg-white/40 backdrop-blur-lg"><SelectValue placeholder="Select an Officer (Optional)" /></SelectTrigger><SelectContent>{authorities.map((auth) => (<SelectItem key={auth.id} value={auth.id}>{auth.name} - {auth.role}</SelectItem>))}</SelectContent></Select>
        </div>
        
        {/* ... All other JSX remains exactly the same ... */}
        <Card className="rounded-2xl border-white/50 bg-white/40 backdrop-blur-lg"><CardHeader><CardTitle className="text-lg font-semibold">Required documents</CardTitle></CardHeader><CardContent>{subject ? (<ol className="list-inside list-decimal space-y-1 text-gray-700">{requiredDocs.map((doc) => <li key={doc}>{doc}</li>)}</ol>) : (<p className="text-sm text-gray-500">Select a service to see required documents.</p>)}</CardContent></Card>
        <div className="space-y-4">
          <Button onClick={triggerFileUpload} variant="outline" className="w-full rounded-xl border-white/50 bg-white/40 backdrop-blur-lg">Upload documents</Button>
          {uploadedFiles.length > 0 && (<div className="flex items-center gap-3 overflow-x-auto p-2">{uploadedFiles.map((file, index) => (<div key={`${file.name}-${index}`} className="relative flex-shrink-0">{file.type.startsWith("image/") ? (<Image src={URL.createObjectURL(file)} alt={file.name} width={80} height={80} className="h-20 w-20 rounded-lg object-cover" onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)} />) : (<div className="flex h-20 w-20 flex-col items-center justify-center rounded-lg bg-gray-200 p-2"><FileText className="h-8 w-8 text-gray-500" /><p className="mt-1 truncate text-xs text-gray-600">{file.name}</p></div>)}<button onClick={() => handleFileDelete(file)} className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white shadow-md"><X className="h-3 w-3" /></button></div>))}</div>)}
        </div>
        <div className="flex items-center justify-between rounded-2xl border-white/50 bg-white/40 p-4 backdrop-blur-lg"><div><Label htmlFor="online-request" className="font-semibold">Request Online</Label><p className="text-xs text-gray-600">You will be emailed a meet link if it's accepted.</p></div><Switch id="online-request" checked={requestOnline} onCheckedChange={setRequestOnline} /></div>
        <div className="space-y-4 rounded-2xl border-white/50 bg-white/40 p-4 backdrop-blur-lg">
          <div>
            <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Calendar</h3><div className="flex items-center gap-2"><p className="text-sm font-medium">{currentMonthName}</p><button onClick={handlePreviousWeek} disabled={isPastWeekDisabled} className="disabled:opacity-30"><ArrowLeft className="h-4 w-4" /></button><button onClick={handleNextWeek}><ArrowRight className="h-4 w-4" /></button></div></div>
            <div className="flex justify-between">{calendarDays.map((day) => (<button key={day.fullDate} onClick={() => setSelectedDate(day.fullDate)} className={cn("flex h-14 w-14 flex-col items-center justify-center rounded-full transition-colors", selectedDate === day.fullDate ? "bg-blue-500 text-white" : "hover:bg-blue-100")}><span className="text-xs">{day.dayName}</span><span className="font-bold">{day.date}</span></button>))}</div>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Time</h3>
            <div className="flex flex-wrap justify-center gap-2">{availableTimes.map((time) => (<Button key={time} onClick={() => setSelectedTime(time)} variant={selectedTime === time ? "default" : "outline"} className={cn("rounded-full", selectedTime !== time && "border-gray-300 bg-transparent")}>{time}</Button>))}</div>
          </div>
        </div>
        <Button size="lg" className="w-full rounded-full bg-blue-500 text-lg">Book Appointment</Button>
      </div>
    </main>
  );
}
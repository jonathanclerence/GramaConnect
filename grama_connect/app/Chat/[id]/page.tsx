// app/Chat/[id]/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Paperclip, Mic, Send } from "lucide-react";

import { authorities, mockMessages } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";


export default function ChatPage({ params }: { params: { id: string } }) {
  const authority = authorities.find((auth) => auth.id === params.id);

  if (!authority) {
    notFound();
  }

  // --- STATE MANAGEMENT FOR INTERACTIVITY ---
  // Holds the list of messages displayed on screen
  const [messages, setMessages] = useState(mockMessages);
  // Holds the text currently in the input field
  const [newMessage, setNewMessage] = useState("");

  // --- FUNCTION TO HANDLE SENDING A MESSAGE ---
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (newMessage.trim() === "") return; // Don't send empty messages

    // Create the new message object
    const newMsgObject = {
      id: Date.now(), // Use a timestamp for a unique key
      text: newMessage,
      sender: "me" as const,
    };

    // Add the new message to our messages state
    setMessages([...messages, newMsgObject]);

    // Clear the input field
    setNewMessage("");
  };

  return (
    <div className="flex h-screen flex-col bg-[#EFE6E6]">
      {/* 1. Chat Header (Fixed) */}
      <header className="fixed left-0 top-0 z-10 flex w-full items-center gap-4 border-b border-white/30 bg-white/20 p-4 backdrop-blur-lg">
        <Link href="/Contacts" className="p-1">
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </Link>
        <Avatar>
          <AvatarImage src={authority.avatarUrl} alt={authority.name} />
          <AvatarFallback>{authority.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-gray-800">{authority.name}</p>
          <p className="text-sm text-gray-600">{authority.role}</p>
        </div>
      </header>

      {/* 2. Message Area (Scrollable, now maps over 'messages' state) */}
      <main className="flex-1 overflow-y-auto p-4 pt-24 pb-28">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-end gap-2",
                message.sender === "me" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "them" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={authority.avatarUrl} />
                  <AvatarFallback>{authority.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-xs rounded-2xl p-3 text-sm md:max-w-md",
                  message.sender === "me"
                    ? "rounded-br-none bg-blue-500 text-white"
                    : "rounded-bl-none bg-white text-gray-800 shadow-sm"
                )}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 3. Message Input Footer (Now a functional form) */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-white/30 bg-white/20 p-2 backdrop-blur-lg md:p-4">
        <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
          <button type="button" className="p-2 text-gray-600">
            <Paperclip className="h-6 w-6" />
          </button>
          <Input
            type="text"
            placeholder="Write a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded-full border-none bg-white/50 focus-visible:ring-1 focus-visible:ring-blue-500"
            autoComplete="off"
          />
          <button type="submit" className="p-2 text-gray-600">
            <Send className="h-6 w-6" />
          </button>
          <button type="button" className="rounded-full bg-blue-500 p-2 text-white">
            <Mic className="h-6 w-6" />
          </button>
        </form>
      </footer>
    </div>
  );
}
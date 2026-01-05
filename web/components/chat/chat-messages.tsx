"use client";

import { useRef, useEffect } from "react";
import type { Message } from "@/hooks/use-socket";
import { groupMessagesByDate } from "@/lib/chat-utils";
import { ChatMessage } from "./chat-message";
import { ChatEmpty } from "./chat-empty";
import { DateSeparator } from "./date-separator";

interface ChatMessagesProps {
  messages: Message[];
  currentSender: string;
}

export function ChatMessages({ messages, currentSender }: ChatMessagesProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const messageGroups = groupMessagesByDate(messages);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <main className="flex-1 overflow-y-auto px-4">
        <ChatEmpty />
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto px-4 py-4">
      <div className="mx-auto max-w-2xl space-y-4">
        {messageGroups.map((group, i) => (
          <div key={i} className="space-y-3">
            <DateSeparator date={group.date} />
            {group.messages.map((msg, j) => (
              <ChatMessage
                key={`${msg.timestamp}-${j}`}
                message={msg}
                isOwn={msg.sender === currentSender}
              />
            ))}
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </main>
  );
}



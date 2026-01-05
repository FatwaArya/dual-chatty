"use client";

import { useState } from "react";
import { useSocket } from "@/hooks/use-socket";
import { ChatHeader } from "./chat/chat-header";
import { ChatMessages } from "./chat/chat-messages";
import { ChatInput } from "./chat/chat-input";

function ChatWrapper({role}: {role: string}) {
  const { isConnected, messages, sendMessage } = useSocket(role);
  const [text, setText] = useState("");
  

  const handleSend = () => {
    if (text.trim() && role) {
      sendMessage(text.trim());
      setText("");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
        <ChatHeader sender={role} isConnected={isConnected} />
      <ChatMessages messages={messages} currentSender={role} />
      <ChatInput
        value={text}
        onChange={setText}
        onSubmit={handleSend}
        disabled={!isConnected}
      />
    </div>
  );
}

export default ChatWrapper;

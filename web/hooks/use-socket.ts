"use client";

import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import { createNewSocket } from "@/lib/socket";


export interface Message {
  sender: string;
  text: string;
  timestamp: string;
}


export function useSocket(owner: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [flash, setFlash] = useState(false);
  
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = createNewSocket(owner);
    socketRef.current = socket;

    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("chat_history", (history: Message[]) => {
      setMessages(history);
    });

    socket.on("new_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      
      // Trigger flash if the incoming message is NOT from this window
      if (message.sender !== owner) {
        setFlash(true);
        setTimeout(() => setFlash(false), 300);
      }
    });

    // Cleanup: Disconnect this specific socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [owner]);

  const sendMessage = (text: string) => {
    if (socketRef.current) {
      socketRef.current.emit("send_message", { sender: owner, text });
    }
  };

  return { messages, isConnected, sendMessage, flash };
}

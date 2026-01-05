"use client";

import { io, Socket } from "socket.io-client";


const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 
  (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001');

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      forceNew: true
    });
  }
  return socket;
}

export function createNewSocket(role: string): Socket {
  return io(SOCKET_URL, {
    forceNew: true,             // Important: Forces a new connection
    reconnectionAttempts: 3,
    timeout: 10000,
    transports: ["websocket"],
    query: { role }             
  });
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

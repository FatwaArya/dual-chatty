# Dual Chatty

Real-time dual chat app with two Socket.IO connections side-by-side. Messages are saved to JSON.

## Assumptions

- **Dual chat** → Two separate Socket.IO connections (one per chat panel)
- **Store messages on close** → Write chat log to JSON file

## Run (Development)

**Terminal 1 — Server:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

## Run (Docker)

```bash
docker-compose up --build
```

Open http://localhost:3001

## How It Works

- Each chat panel has its own Socket.IO connection
- Messages broadcast to all connected clients in real-time
- Chat history saved to `server/messages.json` and restored on restart

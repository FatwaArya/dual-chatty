const { createServer } = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';

const MESSAGES_FILE = path.join(__dirname, 'messages.json');

// Initialize messages array
let messages = [];

// Load existing messages from file
function loadMessages() {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf-8');
      messages = JSON.parse(data);
      console.log(`Loaded ${messages.length} messages from ${MESSAGES_FILE}`);
    } else {
      // Create empty messages file
      fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
      console.log(`Created new ${MESSAGES_FILE}`);
    }
  } catch (err) {
    console.error('Error loading messages:', err);
    messages = [];
  }
}

// Save messages to file
function saveMessages() {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error('Error saving messages:', err);
  }
}

// Setup Socket.IO handlers
function setupSocketIO(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Send chat history to newly connected client
    socket.emit('chat_history', messages);

    // Handle incoming messages
    socket.on('send_message', (payload) => {
      const { sender, text } = payload;

      const message = {
        sender,
        text,
        timestamp: new Date().toISOString(),
      };

      // Add to messages array
      messages.push(message);

      // Save to file
      saveMessages();

      // Broadcast to all connected clients
      io.emit('new_message', message);

      console.log('Message saved and broadcast:', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

// Load messages on server start
loadMessages();

// Production mode: Serve Next.js and Socket.IO on the same port
if (!dev) {
  const next = require('next');
  const app = next({ dev: false, dir: path.join(__dirname, '../web') });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
      handle(req, res);
    });

    const io = new Server(httpServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    setupSocketIO(io);

    httpServer.listen(port, () => {
      console.log(`> Production server ready on http://localhost:${port}`);
      console.log('> Serving Next.js frontend and Socket.IO on the same port');
    });
  });
} else {
  // Development mode: Socket.IO only (Next.js runs separately)
  const httpServer = createServer();

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  setupSocketIO(io);

  httpServer.listen(port, () => {
    console.log(`> WebSocket server ready on http://localhost:${port}`);
  });
}

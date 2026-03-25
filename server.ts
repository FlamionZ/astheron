import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // Real-time state (In-memory for this demo)
  let projectNodes = [
    { id: '1', x: 100, y: 100, title: 'Project Alpha', content: 'Initial concept and research phase.', color: '#3b82f6' },
    { id: '2', x: 400, y: 200, title: 'Beta Testing', content: 'User feedback and bug fixes.', color: '#10b981' },
    { id: '3', x: 200, y: 400, title: 'Launch Strategy', content: 'Marketing and distribution plan.', color: '#f59e0b' }
  ];

  let activeUsers: { [id: string]: { name: string, color: string, x: number, y: number } } = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Send initial state
    socket.emit("init", { nodes: projectNodes, users: activeUsers });

    // Handle user joining
    socket.on("user:join", (userData) => {
      activeUsers[socket.id] = { ...userData, x: 0, y: 0 };
      io.emit("user:joined", { id: socket.id, user: activeUsers[socket.id] });
    });

    // Handle cursor movement
    socket.on("cursor:move", (pos) => {
      if (activeUsers[socket.id]) {
        activeUsers[socket.id].x = pos.x;
        activeUsers[socket.id].y = pos.y;
        socket.broadcast.emit("cursor:moved", { id: socket.id, x: pos.x, y: pos.y });
      }
    });

    // Handle node movement
    socket.on("node:move", (data) => {
      const node = projectNodes.find(n => n.id === data.id);
      if (node) {
        node.x = data.x;
        node.y = data.y;
        socket.broadcast.emit("node:moved", data);
      }
    });

    // Handle node update
    socket.on("node:update", (data) => {
      const index = projectNodes.findIndex(n => n.id === data.id);
      if (index !== -1) {
        projectNodes[index] = { ...projectNodes[index], ...data };
        socket.broadcast.emit("node:updated", data);
      }
    });

    // Handle node creation
    socket.on("node:create", (newNode) => {
      projectNodes.push(newNode);
      io.emit("node:created", newNode);
    });

    // Handle node deletion
    socket.on("node:delete", (id) => {
      projectNodes = projectNodes.filter(n => n.id !== id);
      io.emit("node:deleted", id);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      delete activeUsers[socket.id];
      io.emit("user:left", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

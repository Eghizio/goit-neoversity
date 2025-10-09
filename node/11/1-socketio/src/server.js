import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import http from "node:http";
import express from "express";
import { Server as SocketServer } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, "public")));

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log("\x1b[32m%s\x1b[0m", `[server] ${new Date().toISOString()}`);
  console.log("\x1b[32m%s\x1b[0m", `[server] Server running on ${PORT}`);
  console.log("\x1b[32m%s\x1b[0m", `[server] http://localhost:${PORT}`);
});

// Making last 10 messages available
const messages = []; // Database (would be good to implement some capacity mechanism like LRU)

app.get("/messages", (req, res) => {
  const last = parseInt(req.query.last);

  const limit = isNaN(last) ? 10 : Math.min(last, 42); // cap at 42

  const lastMsgs = messages.slice(0, limit).reverse(); // get latest

  res.json({ messages: lastMsgs });
});

/*
  Chat Not GPT:
  - Register user upon connection
  - Notify other users about new joiner

  - Unregister when user drops connection
  - Notify other users about leaver

  - User can send message to everybody

  - Users can change their name
  - I wanna know how many clients are connected at the moment
*/

const createBroadcaster =
  (socket) =>
  (data, event = "message") => {
    console.log("\x1b[36m%s\x1b[0m", `(${event}) -> ${data}`);

    if (event === "message") messages.unshift(data);

    socket.emit(event, data);
    socket.broadcast.emit(event, data);
  };

const clients = new Map();

io.on("connection", (socket) => {
  const broadcast = createBroadcaster(socket);
  const id = socket.id;

  // Register
  clients.set(id, id); // `id` as inital name
  broadcast(`${id} has joined the room!`);

  // Rename
  socket.emit("name", id);
  socket.on("name", (name) => {
    const oldName = clients.get(id);
    clients.set(id, name);
    socket.emit("name", name);
    broadcast(`${oldName} - changed name to ${name}`);
  });

  // Display online users count
  broadcast(clients.size, "online");

  // Send message to everybody!
  socket.on("message", (msg) => broadcast(`[${clients.get(id)}]: ${msg}`));

  socket.on("disconnect", () => {
    // Unregister
    const leavingUsername = clients.get(id);
    clients.delete(id);
    broadcast(`${leavingUsername} has left the room!`);
    // Update online users count
    broadcast(clients.size, "online");
  });
});

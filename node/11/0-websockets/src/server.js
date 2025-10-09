import { WebSocketServer } from "ws";

const port = 1337;
const server = new WebSocketServer({ port });

const clients = new Map();

server.on("connection", (socket) => {
  const clientId = crypto.randomUUID();
  console.log("\x1b[32m%s\x1b[0m", `Connected - ${clientId}`);
  socket.send(`Hello ${clientId}`);

  clients.set(clientId, socket);

  [...clients.values()].forEach((client) =>
    client.send(`${clientId} connected!`)
  );

  socket.on("message", (message) => {
    const msg = message.toString();
    const payload = `[${clientId}]: ${msg}`;

    console.log("\x1b[36m%s\x1b[0m", payload);

    [...clients.values()].forEach((client) => client.send(payload));
  });
});

server.once("listening", () =>
  console.log(
    "\x1b[32m%s\x1b[0m",
    `[server] WebSocket Server listening on port ${port}`
  )
);

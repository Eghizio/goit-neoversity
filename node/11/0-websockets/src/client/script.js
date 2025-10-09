const ws = new WebSocket("ws://localhost:1337");

const chatElement = document.querySelector("ul#chat");

ws.onmessage = (event) => {
  const msg = event.data;
  console.log(msg);

  const messageElement = document.createElement("li");
  messageElement.textContent = msg;
  chatElement.appendChild(messageElement);
};

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const msg = event.target.elements["msg"].value.trim();
  if (!msg) return;

  ws.send(msg);

  event.target.reset();
});

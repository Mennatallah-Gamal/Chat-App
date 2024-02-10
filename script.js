const socket = window.io();

const msgForm = document.getElementById("message-form");
const msgInput = document.getElementById("message-input");
const msgContainer = document.getElementById("message-container");

const name = prompt("What is your name?");
appendMessage("you joined");
socket.emit("new-user", name);

socket.on("send-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
  scrollToBottom();
});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);
});

msgForm.onsubmit = (e) => {
  e.preventDefault();
  const msg = msgInput.value;
  appendMessage(`You: ${msg}`);
  scrollToBottom();
  socket.emit("send-message", msg);
  msgInput.value = "";
};

function appendMessage(message) {
  const messageElement = document.createElement("p");
  messageElement.innerHTML = message;
  msgContainer.append(messageElement);
  scrollToBottom();
}

function scrollToBottom() {
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

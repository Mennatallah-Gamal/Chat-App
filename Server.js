const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  return res.render("index.html");
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-connected", name);
  });
  socket.on("send-message", (message) => {
    socket.broadcast.emit("send-message", {
      message: message,
      name: users[socket.id],
    });
  });
});
server.listen(process.env.PORT||5000 , () => {});

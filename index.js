const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("path");

app.use(express.static(path.resolve("./public")));
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

io.on("connection", (socket) => {
  console.log("a new user connected");

  socket.on("chat message", (msg) => {
    console.log("message, " + msg);
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

io.on("connection", socket => {

    console.log("Client was connected: ", socket.id);

    socket.emit("welcome-message", "Welcome");
  
    socket.broadcast.emit("user-connected", socket.id);
  
    socket.on("disconnect", () => {
      io.emit("message", "A user has left the chat");
      console.log("user disconnected");
    });    
})

server.listen(4000, () => console.log("server is running on port 4000"));
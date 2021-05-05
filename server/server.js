const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {pingTimeout: 25000});

let userInfo = {};

io.on("connection", socket => {

    console.log("Client was connected: ", socket.id);

    socket.emit("welcome-message", "Welcome");
  
    socket.broadcast.emit("user-connected", socket.id);
  
    socket.on("set-name", (data) => {
      userInfo[socket.id] = { name: data };
      console.log(userInfo);
    });

    socket.on('message', (message) => {
      console.log('Message from Client:', message);
      io.send(message)
    })

    socket.on("disconnect", () => {
      // ta bort userInfo!
      io.emit("message", "A user has left the chat");
      console.log("user disconnected: ", socket.id);
    });    

    socket.on('create', (room) => {
      socket.join(room);
      console.log("room created: ", room)
    });
})

server.listen(4000, () => console.log("server is running on port 4000"));
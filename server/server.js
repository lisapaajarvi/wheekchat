const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {pingTimeout: 25000});

let userInfo = {};

let rooms = [
  {
  name: 'room 1',
  users: [{
    name: 'Tristan'
  }]
  },
  {
    name: 'room 2',
    users: [
    {
      name: 'Tony'
    },
    {
      name: 'Jonas'
    },
  ]
  }
];

// function getRooms() {
//   const sockets = Object.values(io.sockets.sockets)
//   let rooms: string[] = []
//   for (const socket of sockets) {
//   const actualRooms = Object.keys(socket.rooms).filter(room => room !== socket.id)
//   rooms.push(...actualRooms)
//   }
//   return [...new Set(rooms)]
//   }

io.on("connection", socket => {

    console.log("Client was connected: ", socket.id);
    console.log(rooms[1].users)
    socket.emit("welcome-message", "Welcome");
    socket.emit("rooms", rooms);
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

    socket.on('join-room', (room) => {
      // lämna rum socket.leave
      socket.join(room);
      addRoom(room)
      socket.emit("rooms", rooms);
      console.log("joined room: ", room)

      console.log(socket.rooms)
    });

    socket.on('leave-room', (room) => {
      socket.leave(room);

    });
})

function addRoom(room) {
  const newRoom = {name: room, users: [{name:''}]};
  rooms.push(newRoom);
}

server.listen(4000, () => console.log("server is running on port 4000"));
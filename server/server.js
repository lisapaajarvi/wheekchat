const express = require("express");
const http = require("http");
const app = express();
const cors = require('cors')
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {pingTimeout: 25000});

app.use(cors())

// USERS ARRAY
const users = [];

const addUser = (id, name) => {
  const user = { id, name, room: '' }
  users.push(user);
  return { user }
}

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => {
  let user = users.find(user => user.id === id)
  return user
}

// ROOMS ARRAY
const rooms = [];

const addRoom = (room, socket) => {
    let currentUser = users.find((user) => user.id === socket.id)
    
    if(currentUser.room) {
      socket.leave(currentUser.room);
      const oldRoom = currentUser.room;
      currentUser.room = room.name;
      const oldRoomUser = users.find((user) => user.room === oldRoom);
      
      if (!oldRoomUser) {
        deleteRoom(oldRoom);
      }
    }
    else
    {
      currentUser.room = room.name;
    }
    const joinedRoom = rooms.find((r) => r.name === room.name);
    if(!joinedRoom) {
      rooms.push(room);
    }
    socket.emit("rooms", rooms);
}

const deleteRoom = (oldRoom) => {
  const index = rooms.findIndex(room => room.name === oldRoom);
  rooms.splice(index, 1); 
}

const checkPassword = (roomName, password) => {
  const roomToJoin = rooms.find((r) => r.name === roomName);
  if(roomToJoin.password === password) {
    return true;
  }
  else {
    return false;
  }
}

// SERVER CONNECTION
io.on("connection", socket => {
  
  socket.on('login', (name) => {
    addUser(socket.id, name);
  })

  socket.on('join-room', (room, password) => {
    if(password) {
      const isPasswordOK = checkPassword(room.name, password);
      if(!isPasswordOK) {
        socket.emit('join-room-response', { name: room.name, success: false })
        return
      }
    }
    socket.join(room.name);
    addRoom(room, socket);
    socket.emit("rooms", rooms);
    socket.emit('join-room-response', { name: room.name, success: true });
    io.emit("rooms", rooms);
  });

  socket.on("get-rooms", ()=> {
    socket.emit("rooms", rooms);
  })

  socket.on('send-message', message => {
    const user = getUser(socket.id);
    io.in(user.room).emit('message', { user: user.name, text: message });    
})

  socket.on('logout', () => {
    let currentUser = users.find((user) => user.id === socket.id)

    
    if(currentUser.room) {
      socket.leave(currentUser.room);
      deleteUser(socket.id)
      const oldRoomUser = users.find((user) => user.room === currentUser.room);
      
      if (!oldRoomUser) {
        deleteRoom(currentUser.room);
      }
    }
    io.emit("rooms", rooms);
})

  socket.on("disconnect", () => {
    const deletedUser = deleteUser(socket.id);
    if (deletedUser) {
    
      if(deletedUser.room) {
       socket.leave(deletedUser.room);
       const oldRoomUser = users.find((user) => user.room === deletedUser.room);
      
        if (!oldRoomUser) {
          deleteRoom(deletedUser.room);
        }
        
      }
    io.emit("rooms", rooms);
    }
  })
})

server.listen(4000, () => console.log("server is running on port 4000"));
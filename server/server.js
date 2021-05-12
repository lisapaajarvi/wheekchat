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
  users.push(user)
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

const getUsers = (room) => users.filter(user => user.room === room)

// ROOMS ARRAY
const rooms = [];

const addRoom = (room, socket) => {
  console.log("room: " + room + "socket.id: " + socket.id)
    let currentUser = users.find((user) => user.id === socket.id)
    console.log("this is the current user: " + currentUser.name)
    if(currentUser.room) {
      console.log("this is the current user's old room: " + currentUser.room)
      socket.leave(currentUser.room)
      console.log("left old room")
      const oldRoom = currentUser.room
      currentUser.room = room.name;
      const oldRoomUser = users.find((user) => user.room === oldRoom);
      
      if (!oldRoomUser) {
        deleteRoom(oldRoom);
        console.log("room " + oldRoom + " is empty and can be deleted")
      }
      else {
        console.log("room in use " + oldRoomUser.room + " by " + oldRoomUser.name )
      }
    }
    else
    {
      currentUser.room = room.name;
    }
    const joinedRoom = rooms.find((r) => r.name === room.name);
    if(!joinedRoom) {
      rooms.push(room)
    }
    socket.emit("rooms", rooms)
}

const deleteRoom = (oldRoom) => {
  const index = rooms.findIndex(room => room.name === oldRoom);
  if (index===-1) {
    console.log("room " + oldRoom + " does not exist")
  }
  else {
    rooms.splice(index, 1);
    console.log("room " + oldRoom + " has been removed")
  } 
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
    addUser(socket.id, name)
  })

  socket.on('join-room', (room, password) => {
    if(password) {
      const isPasswordOK = checkPassword(room.name, password)
      if(!isPasswordOK) {
        socket.emit('join-room-response', { name: room.name, success: false })
        return
      }
    }
    socket.join(room.name);
    addRoom(room, socket)
    console.log("joined room: ", room)
    socket.emit("rooms", rooms);
    socket.emit('join-room-response', { name: room.name, success: true })
  });

  socket.on("getRooms", ()=> {
    socket.emit("rooms", rooms);
  })

  socket.on('sendMessage', message => {
    const user = getUser(socket.id)
    io.in(user.room).emit('message', { user: user.name, text: message });
})

  socket.on("disconnect", () => {
    console.log("User disconnected");
    const user = deleteUser(socket.id)
    if (user) {
        io.in(user.room).emit('notification', { title: 'Someone just left', description: `${user.name} just left the room` })
        io.in(user.room).emit('users', getUsers(user.room))
    }
  })
})

server.listen(4000, () => console.log("server is running on port 4000"));
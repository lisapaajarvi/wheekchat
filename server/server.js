const express = require("express");
const http = require("http");
const app = express();
const cors = require('cors')
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {pingTimeout: 120000});

app.use(cors())

// ROOMS ARRAY

const rooms = [];

// USERS ARRAY
const users = []

const addUser = (id, name) => {
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (existingUser) return { error: "Username has already been taken" }
    if (!name) return { error: "Username is required" }

    const user = { id, name, room: '' }
    users.push(user)
    return { user }
}

const addRoom = (room, socket) => {
    let currentUser = users.find((user) => user.id === socket.id)
     if (currentUser === undefined ) {
      console.log("current user is undefined")
      return
    }
    else
    {
      console.log("current user " + currentUser.name)
    }
    
    if(currentUser.room) {
      console.log("current user " + currentUser + " is in room " + currentUser.room)
      socket.leave(currentUser.room)
      const oldRoom = currentUser.room
      console.log("old room " + oldRoom)
      currentUser.room = room;
      const oldRoomUser = users.find((user) => user.room === oldRoom);
      
      if (!oldRoomUser) {
        console.log("room is unused deleting")
        deleteRoom(oldRoom);
      }
      else {
        console.log("room in use " + oldRoomUser.room + "by" + oldRoomUser )
      }
    }
    else
    {
      currentUser.room = room;
    }

    let joinedRoom = rooms.includes(room);
    if(!joinedRoom) {
      rooms.push(room)
    }
    socket.emit("rooms", rooms)
    console.log("rooms" + rooms)
}

const deleteRoom = (oldRoom) => {
  let index = rooms.indexOf(oldRoom);
  if (index===-1) {
    console.log("rummet finns inte")
  }
  else {
    rooms.splice(index, 1);
  } 
}

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = id => {
  let user = users.find(user => user.id === id)
  return user
}

const getUsers = (room) => users.filter(user => user.room === room)





// SERVER CONNECTION
io.on("connection", socket => {
  
  socket.on('login', (name) => {
    addUser(socket.id, name)
    // console.log(users)
})

    socket.on('join-room', (room) => {
      // lämna rum socket.leave
      socket.join(room);
      addRoom(room, socket)
      console.log("joined room: ", room)
      socket.emit("rooms", rooms);
    });

    socket.on("getRooms", ()=> {
      socket.emit("rooms", rooms);
    })

//   socket.on('login', ({ name, room }, callback) => {
//     const { user, error } = addUser(socket.id, name, room)
//     if (error) return callback(error)
//     socket.join(user.room)
//     socket.in(room).emit('notification', { title: 'Someone\'s here', description: `${user.name} just entered the room` })
//     io.in(room).emit('users', getUsers(room))
//     callback()
//     // console.log(name)
// })

  socket.on('sendMessage', message => {
    const user = getUser(socket.id)
    io.in(user.room).emit('message', { user: user.name, text: message });
    console.log(message)
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


// io.on("connection", socket => {

//     console.log("Client was connected: ", socket.id);
//     console.log(rooms[1].users)
//     socket.emit("welcome-message", "Welcome");
//     socket.emit("rooms", rooms);
//     socket.broadcast.emit("user-connected", socket.id);
  
//     socket.on("set-name", (data) => {
//       userInfo[socket.id] = { name: data };
//       console.log(userInfo);
//     });

//     socket.on('message', (message) => {
//       console.log('Message from Client:', message);
//       io.send(message)
//     })

//     socket.on("disconnect", () => {
//       // ta bort userInfo!
//       io.emit("message", "A user has left the chat");
//       console.log("user disconnected: ", socket.id);
//     });    

//     socket.on('join-room', (room) => {
//       // lämna rum socket.leave
//       socket.join(room);
//       addRoom(room)
//       socket.emit("rooms", rooms);
//       console.log("joined room: ", room)

//       console.log(socket.rooms)
//     });

//     socket.on('leave-room', (room) => {
//       socket.leave(room);

//     });
// })

// function addRoom(room) {
//   const newRoom = {name: room, users: [{name:''}]};
//   rooms.push(newRoom);
// }

// app.get('/', (req, res) => {
//   res.send("Server is up and running")
// })

// http.listen(PORT, () => {
//   console.log(`Listening to ${PORT}`);
// })

server.listen(4000, () => console.log("server is running on port 4000"));
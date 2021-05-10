const express = require("express");
const http = require("http");
const app = express();
const cors = require('cors')
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {pingTimeout: 25000});

app.use(cors())

// USERS ARRAY
const users = []

const addUser = (id, name) => {
    const existingUser = users.find(user => user.name.trim().toLowerCase() === name.trim().toLowerCase())

    if (existingUser) return { error: "Username has already been taken" }
    // if (!name && !room) return { error: "Username and room are required" }
    if (!name) return { error: "Username is required" }
    // if (!room) return { error: "Room is required" }

    const user = { id, name }
    users.push(user)
    return { user }
}

// const getUser = id => {
//     let user = users.find(user => user.id == id)
//     return user
// }

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
  
  // socket.on("set-name", (data) => {
  //         users[socket.id] = { name: data };
  //         console.log(users);
  // });
  
  socket.on('login', (name) => {
    addUser(socket.id, name)
    console.log(users)
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
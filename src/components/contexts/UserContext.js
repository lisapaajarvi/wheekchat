import React, { useState, useEffect } from 'react'
import io from "socket.io-client";

const UserContext = React.createContext()

export const UserConsumer = UserContext.Consumer


export function UserProvider({ children }) {
    const ENDPOINT = 'http://127.0.0.1:4000/';
    const [socket] = useState(io(ENDPOINT, { transports: ['websocket', 'polling'] }));
    const [user, setUser] = useState();
    //const [users, setUsers] = useState([])
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // const saveIncomingUsers = (incomingUsers) => {
        //     setUsers(incomingUsers)
        //     console.log(incomingUsers);
        //     console.log(users);
        // }

        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
            socket.emit("getRooms", {})
        });

        socket.on("rooms", activeRooms => {
            setRooms(activeRooms);
        })        

        socket.on("message", msg => {
            setMessages([...messages, msg]);
            console.log(messages)
        })

            
            // // socket.on('join-room', incomingMessage);
            // // socket.on('etc..', incomingMessage);
        }, [messages, socket])       

    const sendMessage = (message) => {
        socket.emit('sendMessage', message)
    }

    const saveUser = (name) => {
        setUser(name)
        socket.emit('login', name);
    }

    const joinRoom = (roomName) => {
        setRoom(roomName);
        setMessages([]);
        socket.emit('join-room', roomName);
    }


    return (
        <UserContext.Provider value={{
            room,
            user,
            rooms,
            messages,
            //users,
            saveUser,
            joinRoom,
            sendMessage
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
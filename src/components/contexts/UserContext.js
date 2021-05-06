import React, { useState, useEffect } from 'react'
import io from "socket.io-client";

const UserContext = React.createContext()

export const UserConsumer = UserContext.Consumer


export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();
    const [socket] = useState(io());
    const [messages, setMessages] = useState([]);
    const [rooms, setRooms] = useState([]);
    


    useEffect(() => {
        const incomingMessage = (message) => {
            let messageList = [...messages];
            messageList.push(message);
            setMessages(messageList)
            console.log(messages);
        }
        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
        });
        socket.on('message', incomingMessage);
        
        socket.on('rooms', incomingRooms);
        // socket.on('join-room', incomingMessage);
        // socket.on('etc..', incomingMessage);
    }, [messages, socket])


    const incomingRooms = (chatrooms) => {
        setRooms(chatrooms)
        console.log(chatrooms);
    }

    const sendMessage = (message) => {
        socket.send(user + ": " + message)
    }

    const saveUser = (username) => {
        setUser(username)
        socket.emit('set-name', username);
    }

    const joinRoom = (roomName) => {
        setRoom(roomName);
        socket.emit('join-room', roomName);
    }

    return (
        <UserContext.Provider value={{
            room,
            user,
            rooms,
            messages,
            setUser,
            saveUser,
            joinRoom,
            sendMessage
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
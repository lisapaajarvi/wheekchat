import React, { useState, useEffect } from 'react'
import io from "socket.io-client";

const UserContext = React.createContext()

export const UserConsumer = UserContext.Consumer


export function UserProvider({ children }) {
    const ENDPOINT = 'http://127.0.0.1:4000/';
    const [socket] = useState(io(ENDPOINT, { transports: ['websocket', 'polling'] }));
    const [user, setUser] = useState();
    // const [users, setUsers] = useState([])
    // const [room, setRoom] = useState();
    // const [messages, setMessages] = useState([]);
    // const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
        });
        // const incomingMessage = (message) => {
        //     let messageList = [...messages];
        //     messageList.push(message);
        //     setMessages(messageList)
        //     console.log(messages);
        // }
        // socket.on('message', incomingMessage);
        
        // socket.on('rooms', incomingRooms);
        // // socket.on('join-room', incomingMessage);
        // // socket.on('etc..', incomingMessage);
    }, [socket])


    // const incomingRooms = (chatrooms) => {
    //     setRooms(chatrooms)
    //     console.log(chatrooms);
    // }

    // const sendMessage = (message) => {
    //     socket.send(user + ": " + message)
    // }

    const saveUser = (name) => {
        setUser(name)
        // socket.emit('set-name', username);
    }

    // const joinRoom = (roomName) => {
    //     setRoom(roomName);
    //     socket.emit('join-room', roomName);
    // }

    return (
        <UserContext.Provider value={{
            // room,
            user,
            // rooms,
            // messages,
            setUser,
            saveUser,
            // joinRoom,
            // sendMessage
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
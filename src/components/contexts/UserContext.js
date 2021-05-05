import React, { useState, useEffect } from 'react'
import io from "socket.io-client";

const UserContext = React.createContext()

export const UserConsumer = UserContext.Consumer


export function UserProvider({ children }) {
    const [user, setUser] = React.useState();
    const [socket] = useState(io());

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
        });
        socket.on('message', incomingMessage);

        // socket.on('join-room', incomingMessage);
        // socket.on('etc..', incomingMessage);
    }, [socket])

    const incomingMessage = (message) => {
        console.log(message);
    }

    const sendMessage = (message) => {
        socket.send(user + ": " + message)
    }

    const saveUser = (username) => {
        setUser(username)
        socket.emit('set-name', username);
    }

    const joinRoom = (room) => {
        socket.emit('join-room', room);
    }

    return (
        <UserContext.Provider value={{
            user,
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
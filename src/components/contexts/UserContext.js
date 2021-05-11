import React, { useState, useEffect } from 'react'
import io from "socket.io-client";

const UserContext = React.createContext()

export const UserConsumer = UserContext.Consumer


export function UserProvider({ children }) {
    const ENDPOINT = 'http://127.0.0.1:4000/';
    const [socket] = useState(io(ENDPOINT, { transports: ['websocket', 'polling'] }));
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.on('connect', () => {
            console.log(`I'm connected with the back-end`);
            socket.emit("getRooms", {})
        });

        socket.on("rooms", activeRooms => {
            setRooms(activeRooms);
        })        

        socket.on("message", msg => {
            setMessages([...messages, msg]);
        })

        }, [messages, rooms, socket])       

    const sendMessage = (message) => {
        socket.emit('sendMessage', message)
    }

    const saveUser = (name) => {
        setUser(name)
        socket.emit('login', name);
    }

    const joinOpenRoom = (newRoom) => {
        setRoom(newRoom.name);
        setMessages([]);
        socket.emit('join-room', newRoom);
    }
    const createOpenRoom = (roomName) => {
        setRoom(roomName);
        setMessages([]);
        socket.emit('join-room', {name: roomName, isLocked: false});
    }

    const createLockedRoom = (roomName, password) => {
        setRoom(roomName);
        setMessages([]);
        socket.emit('join-room', {name: roomName, isLocked: true, password: password});
    }

    const joinLockedRoom = (roomName, password) => {
        //setRoom(roomName);
        //setMessages([]);
        //socket.emit('join-locked-room', roomName, password);
    }

    const openRooms = rooms.filter(room => room.isLocked === false);
    const closedRooms = rooms.filter(room => room.isLocked === true);

    return (
        <UserContext.Provider value={{
            room,
            user,
            rooms,
            messages,
            saveUser,
            createOpenRoom,
            createLockedRoom,
            joinOpenRoom,
            joinLockedRoom,
            sendMessage,
            openRooms,
            closedRooms
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
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
    const [passwordError, setPasswordError] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    // useEffect(() => {
    //     const onMessage = msg => {
    //         console.log('HEJ')
    //         setMessages([...messages, msg]);
    //     }

    //     const onConnect = () => {
    //         console.log("Connected to server");
    //         socket.emit("getRooms", {})
    //     }

    //     const onRooms = activeRooms => {
    //         setRooms(activeRooms);
    //     }        

    //     socket.on("message", onMessage)
    //     socket.on("rooms", onRooms)
    //     socket.on("connect", onConnect)

    //     return () => {
    //         socket.off("message", onMessage)
    //         socket.off("rooms", onRooms)
    //         socket.off("connect", onConnect)
    //     }

    // }, [messages, socket])  

    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to server");
            socket.emit("getRooms", {})
        });

        socket.on("rooms", activeRooms => {
            setRooms(activeRooms);
        })        

        socket.on("message", msg => {
            console.log('HEJ')
            setMessages((prevMessages) => [...prevMessages, msg]);
        })
        socket.on("join-room-response", ({ name, success }) => {
            if (success) {
                console.log("successfully joined room: " + name)
                setRoom(name);
                setMessages([]);
                setPasswordError(false);
                setPasswordModalOpen(false);

            } else {
                console.log("wrong password")
                setPasswordError(true)
            }
        })

    }, [socket])       

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
        socket.emit('join-room', { name: roomName, isLocked: false });
    }

    const createLockedRoom = (roomName, password) => {
        setRoom(roomName);
        setMessages([]);
        socket.emit('join-room', { name: roomName, isLocked: true, password });
    }

    const joinLockedRoom = (roomName, password) => {
        socket.emit('join-room', { name: roomName, isLocked: true, password }, password);
        console.log(roomName + password)
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
            closedRooms,
            passwordError,
            setPasswordError,
            passwordModalOpen,
            setPasswordModalOpen
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
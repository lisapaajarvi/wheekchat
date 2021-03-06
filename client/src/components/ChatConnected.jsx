import React, { useState, useContext } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import '../css/chatconnected.css';
import UserContext from './contexts/UserContext';
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";

function ChatConnected() {
    const [message, setMessage] = useState('')

    const { messages, sendMessage, user, room } = useContext(UserContext)

    const handleClick = () => {
        sendMessage(message)
        setMessage('')
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }

    return (
        <div className="connectedStyle">
            {room ? (
                <>
                    <div className="titleBoxChat">
                        <Typography variant="h5" >{user} @ {room}</Typography>
                    </div>
                    <div className="chatBox">
                        <ul className="ulStyle">
                            <Typography variant="h6">
                                {messages.map((msg, index) => (
                                    <li className="textBox" key={index}>
                                        {msg.user + ': ' + msg.text}
                                    </li>
                                ))}
                            </Typography>
                        </ul>
                    </div>
                    <div className="sendNewTextBox">
                        <TextField
                            id="sendtext"
                            label="Enter text"
                            value={message}
                            onChange={handleMessageChange}
                            variant="outlined"
                            size="small" />
                        <Button
                            variant="contained"
                            style={{ marginLeft: '1rem', background: '#302F4A', color: 'white' }}
                            onClick={handleClick}
                        >
                            SEND
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <img className="logo" style={{ width: 180, marginTop: 30 }} src={logo} alt="Logo" />
                    {user ? (
                        <>
                            <h2>Welcome {user}!</h2>
                            <p>Please create a new room or click on a room to join.</p>
                        </>
                    ) : (
                        <Link to="/">
                            <h2>Please login to wheek!</h2>
                        </Link>
                    )}        
                </>
            )}
        </div>
    )    
}

export default ChatConnected;
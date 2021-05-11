import React, { useState, useContext } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import '../css/chatconnected.css';
import UserContext from './contexts/UserContext';
import logo from '../assets/logo_text2.png'

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
            {room? (
                <>
                <div className="titleBox">
                <Typography variant="h5" style={{textDecoration: 'underline'}}>{user} @ {room}</Typography>
            </div>
            <div className="chatBox">
                <Typography>CHAT TEXT GOES HERE</Typography>
                 <ul>
                    {messages.map((msg, index) => (
                 
                        <li key={index}>
                            {msg.user + ':' + msg.text}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="somebodyTypingBox">
                <Typography>Somebody is typing...</Typography>
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
                    style={{ marginLeft: '1rem', background: 'black', color: 'white' }}
                    onClick={handleClick}
                >
                    SEND
                </Button>
            </div>
            </>
            ):(
                <>
                <h2>Welcome {user}!</h2>
                <p>Please create a new room or click on a room to join.</p>
                <img style={{width: 400, marginTop: 50 }} src={logo} alt="Logo" />;
                </>
            )}             
        </div>
    )    
}

export default ChatConnected;
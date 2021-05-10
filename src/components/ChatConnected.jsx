import React from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import '../css/chatconnected.css';
// import UserContext from './contexts/UserContext';

function ChatConnected() {
    // const [message, setMessage] = useState('')
    // const { user, room, messages, sendMessage } = useContext(UserContext)

    const handleClick = () => {
        // sendMessage(message)
        // setMessage('')
    }

    const handleMessageChange = (e) => {
        // setMessage(e.target.value)
    }

    return (
        <div className="connectedStyle">
            <div className="titleBox">
                <Typography variant="h5" style={{textDecoration: 'underline'}}>{''} @ {''}</Typography>
            </div>
            <div className="chatBox">
                <Typography>CHAT TEXT GOES HERE</Typography>
                {/* <ul>
                    {messages.map((chatMessage, index) => (
                 
                        <li key={index}>
                            {chatMessage}
                        </li>
                    ))}
                </ul> */}
            </div>
            <div className="somebodyTypingBox">
                <Typography>Somebody is typing...</Typography>
            </div>
            <div className="sendNewTextBox">
                <TextField 
                    id="sendtext" 
                    label="Enter text" 
                    value={''} 
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
        </div>
    )    
}

export default ChatConnected;
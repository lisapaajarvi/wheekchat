import React, { useContext } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import '../css/chatconnected.css';
import UserContext from './contexts/UserContext';

function ChatConnected() {
    const { sendMessage } = useContext(UserContext)

    const handleButtonPress = () => {
        sendMessage('HELLO!!!!')
    }

    return (
        <div className="connectedStyle">
            <div className="titleBox">
                <Typography variant="h5" style={{textDecoration: 'underline'}}>ROOM {1}</Typography>
            </div>
            <div className="chatBox">
                <Typography>CHAT TEXT GOES HERE</Typography>
            </div>
            <div className="somebodyTypingBox">
                <Typography>Somebody is typing...</Typography>
            </div>
            <div className="sendNewTextBox">
                <TextField id="sendtext" label="Enter text" value={""} variant="outlined" size="small" />
                <Button
                    variant="contained"
                    style={{ marginLeft: '1rem', background: 'black', color: 'white' }}
                    onClick={handleButtonPress}
                >
                    SEND
                </Button>
            </div>
        </div>
    )    
}

export default ChatConnected;
import React from 'react';
import '../css/chatconnected.css';
import { Typography, TextField, Button } from '@material-ui/core';

function ChatConnected() {   
    return (
        <div className="connectedStyle">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem'}}>
                <Typography variant="h5">
                    ROOM {1}
                </Typography>
            </div>

            <div style={{width: '80%', height: '80%', background: '#9ccc65', border: '1px solid black'}}>
                CHAT TEXT GOES HERE
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem'}}>
                <TextField id="sendtext" label="Enter text" value={""} variant="outlined" size="small" />
                <Button variant="contained" style={{marginLeft: '1rem'}}>Send</Button>           
            </div>
        </div>
    )    
}

export default ChatConnected;
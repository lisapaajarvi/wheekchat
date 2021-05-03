import React from 'react';
import '../css/chatconnected.css';
import { Typography, TextField, Button } from '@material-ui/core';

function ChatConnected() {   
    return (
        <div className="connectedStyle">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem' }}>
                <Typography variant="h5">
                    ROOM {1}
                </Typography>
            </div>
            <div style={{ border: '1px solid black', width: '80%', height: '80%', background: '#9ccc65', minHeight: '10rem' }}>
                <div style={{ background: '#9ccc65' }}>
                    <div>
                        <Typography>
                            CHAT TEXT GOES HERE
                    </Typography>
                    </div>
                </div>
            </div>
            <div style={{ background: 'darkgray', width: '80%', borderLeft: '1px solid black', borderRight: '1px solid black', borderBottom: '1px solid black', }}>
                <Typography>
                    Somebody is typing...
                    </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem' }}>
                <TextField id="sendtext" label="Enter text" value={""} variant="outlined" size="small" />
                <Button variant="contained" style={{ marginLeft: '1rem', background: 'black', color: 'white' }}>SEND</Button>
            </div>
        </div>
    )    
}

export default ChatConnected;
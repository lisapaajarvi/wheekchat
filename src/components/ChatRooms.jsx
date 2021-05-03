import React from 'react';
import '../css/chatrooms.css';
import { Typography, Divider, Button } from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';

function ChatRooms() {   
    return (
        <div className="roomStyle">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0rem'}}>
                <Typography variant="h5">
                    CHAT ROOMS
                </Typography>
            </div>

            <ul>
                <li><Typography variant="h6">ROOM {1}</Typography></li>
                <li><Typography variant="h6">ROOM {2}</Typography></li>
                <li><Typography variant="h6">ROOM {3}</Typography></li>
            </ul>

            <Divider />

            <ul>
                <li><Typography variant="h6">ROOM {4}<LockIcon style={{marginLeft: '0.5rem'}}/></Typography></li>
                <li><Typography variant="h6">ROOM {5}<LockIcon style={{marginLeft: '0.5rem'}}/></Typography></li>
                <li><Typography variant="h6">ROOM {6}<LockIcon style={{marginLeft: '0.5rem'}}/></Typography></li>
            </ul>

            <Divider />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" style={{margin: '1rem', background: 'black', color: 'white'}}>CREATE ROOM</Button>
            </div>

        </div>
    )    
}

export default ChatRooms;
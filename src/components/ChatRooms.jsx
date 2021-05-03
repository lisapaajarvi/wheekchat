import React from 'react';
import '../css/chatrooms.css';
import { Typography } from '@material-ui/core';

function ChatRooms() {   
    return (
        <div className="roomStyle">
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0rem'}}>
                <Typography variant="h5">
                    CHAT ROOMS
                </Typography>
            </div>

            <ul>
                <li>{1}</li>
                <li>{2}</li>
                <li>{3}</li>
            </ul>

        </div>
    )    
}

export default ChatRooms;
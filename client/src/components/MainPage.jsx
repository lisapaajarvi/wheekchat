import React from 'react';
import ChatRooms from './ChatRooms';
import ChatConnected from './ChatConnected';
import '../css/mainpage.css';

function MainPage() {   
    return (
        <div className="mainStyle">
            <ChatRooms />
            <ChatConnected />
        </div>
    )    
}

export default MainPage;
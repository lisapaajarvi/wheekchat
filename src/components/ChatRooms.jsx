import React, { useContext } from 'react';
import { Typography, Divider, Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LockIcon from '@material-ui/icons/Lock';
import '../css/chatrooms.css';
import logo from '../assets/logo_text2.png'
import UserContext from './contexts/UserContext'

function ChatRooms() {
    const { rooms, joinRoom } = useContext(UserContext);
    
    const [openCreateRoom, setOpenCreateRoom] = React.useState(false);
    const [roomName, setRoomName] = React.useState('');

    const handleCreateRoomClose = () => {
        setOpenCreateRoom(false);
    };

    function openCreateRoomModal() {
        setOpenCreateRoom(true);
    }
    
    function onCreateRoomClick() {
        joinRoom(roomName);
        setOpenCreateRoom(false);
        setRoomName('');
    }
    const handleRoomName = (e) => {
        setRoomName(e.target.value)
    }

    return (
        <div className="roomStyle">
            <div className="titleBox">
                <img className="logoRooms" style={{width: 180, marginTop: 30 }} src={logo} alt="Logo" />
            </div>
            <ul>
                 <Typography variant="h6">
                    {rooms.map((room, index) => (                       
                        <li className="roomLink" style={{listStyle: 'none'}} key={index} onClick={() => joinRoom(room)}>
                            {room}
                        </li>
                    ))}
                </Typography>  
            </ul>

            <Divider style={{background: '#9DA1C2'}} />

            <ul>
                <Typography variant="h6">
                    <li style={{listStyle: 'none'}}>Hemliga rummet<LockIcon style={{marginLeft: '0.5rem'}}/></li>
                </Typography>
            </ul>

            <Divider />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={openCreateRoomModal} style={{margin: '2rem 0 1rem 0', background: 'white', color: '#302F4A'}}>CREATE ROOM</Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <Button variant="contained" style={{background: 'white', color: '#302F4A', marginBottom: '2rem'}}>LOG OUT</Button>
                </Link>
            </div>

            {/* Create room modal */}
            <Dialog open={openCreateRoom} onClose={handleCreateRoomClose} aria-labelledby="form-dialog-create">
                 <DialogTitle id="create">Create new room</DialogTitle>
                 <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Room name"
                        type="text"
                        onChange={handleRoomName}
                        value={roomName}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateRoomClose} color="primary" style={{color: 'black'}}>GO BACK</Button>
                    <Button onClick={onCreateRoomClick} variant="contained" color="primary" style={{background: '#302F4A', color: 'white'}}>CREATE</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ChatRooms;
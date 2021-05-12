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
    const { joinOpenRoom, joinLockedRoom, createOpenRoom, createLockedRoom, openRooms, closedRooms } = useContext(UserContext);
    
    const [openCreateRoom, setOpenCreateRoom] = React.useState(false);
    const [openCreateLockedRoom, setOpenCreateLockedRoom] = React.useState(false);    
    const [openJoinLockedRoom, setOpenJoinLockedRoom] = React.useState(false); 
    const [roomName, setRoomName] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleCreateRoomClose = () => {
        setOpenCreateRoom(false);
    };

    function openCreateRoomModal() {
        setOpenCreateRoom(true);
    }

    const handleCreateLockedRoomClose = () => {
        setOpenCreateLockedRoom(false);
    };

    function openCreateLockedRoomModal() {
        setOpenCreateLockedRoom(true);
    }
    
    function onCreateRoomClick() {
        createOpenRoom(roomName);
        setOpenCreateRoom(false);
        setRoomName('');
    }

    function onCreateLockedRoomClick() {
        createLockedRoom(roomName, password);
        setOpenCreateLockedRoom(false);
        setRoomName('');
        setPassword('');
    }

    function openJoinLockedRoomModal(room) {
        setOpenJoinLockedRoom(true)
    }

    
    const handleJoinLockedRoomClose = () => {
        setOpenJoinLockedRoom(false);
    };

    function onJoinLockedRoomClick(room) {
        setRoomName(room.name)
        setPassword()
        setOpenJoinLockedRoom(true)
    }

    const handleRoomName = (e) => {
        setRoomName(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="roomStyle">
            <div className="titleBox">
                <img className="logoRooms" style={{width: '15rem', margin: '1rem' }} src={logo} alt="Logo" />
            </div>
            <ul>
                    <Typography variant="h6">
                    {openRooms.map((room, index) => (                      
                        <li className="roomLink" style={{listStyle: 'none'}} key={index} onClick={() => joinOpenRoom(room)}>
                            {room.name}
                        </li>                        
                    ))}
                </Typography>  
            </ul>
            <Divider style={{background: '#9DA1C2'}} />
            <ul>
                <Typography variant="h6">
                    {closedRooms.map((room, index) => (                       
                        <li className="roomLink" style={{listStyle: 'none'}} key={index} onClick={() => openJoinLockedRoomModal(room)}>
                            {room.name} 
                            <LockIcon style={{marginLeft: '0.5rem'}}/> 
                        </li>
                    ))}
                </Typography>  
            </ul>
            <Divider />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={openCreateRoomModal} style={{margin: '2rem 0 0 0', background: 'black', color: 'white'}}>CREATE OPEN ROOM</Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={openCreateLockedRoomModal} style={{margin: '1rem 0 1rem 0', background: 'black', color: 'white'}}>CREATE LOCKED ROOM</Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <Button variant="contained" style={{background: 'black', color: 'white', marginBottom: '2rem'}}>LOG OUT</Button>
                </Link>
            </div>

            {/* Create room modal */}
            <Dialog open={openCreateRoom} onClose={handleCreateRoomClose} aria-labelledby="form-dialog-create">
                 <DialogTitle id="create">Create open room</DialogTitle>
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

            {/* Create locked room modal */}
            <Dialog open={openCreateLockedRoom} onClose={handleCreateLockedRoomClose} aria-labelledby="form-dialog-create">
                 <DialogTitle id="create">Create locked room</DialogTitle>
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
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        onChange={handlePassword}
                        defaultValue={password}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateLockedRoomClose} color="primary" style={{color: 'black'}}>GO BACK</Button>
                    <Button onClick={onCreateLockedRoomClick} variant="contained" color="primary" style={{background: 'black', color: 'white'}}>CREATE</Button>
                </DialogActions>
            </Dialog>

                        {/* Join locked room modal */}
                        <Dialog open={openJoinLockedRoom} onClose={handleJoinLockedRoomClose} aria-labelledby="form-dialog-create">
                 <DialogTitle id="create">Join locked room</DialogTitle>
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
                    <Button onClick={onJoinLockedRoomClick} variant="contained" color="primary" style={{background: '#302F4A', color: 'white'}}>CREATE</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ChatRooms;
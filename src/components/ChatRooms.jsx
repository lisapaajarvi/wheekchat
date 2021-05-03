import React from 'react';
import { Typography, Divider, Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LockIcon from '@material-ui/icons/Lock';
import '../css/chatrooms.css';

function ChatRooms() {   
    const [openCreateRoom, setOpenCreateRoom] = React.useState(false);

    const handleCreateRoomClose = () => {
        setOpenCreateRoom(false);
    };

    function openCreateRoomModal() {
        setOpenCreateRoom(true);
    }

    // const handleCreateRoomName = (e) => {
    //     setCreateRoom(e.target.value)
    // }


    return (
        <div className="roomStyle">
            <div className="titleBox">
                <Typography variant="h5" style={{textDecoration: 'underline'}}>CHAT ROOMS</Typography>
            </div>

            <ul>
                <Typography variant="h6">
                    <li>ROOM {1}</li>
                    <li>ROOM {2}</li>
                    <li>ROOM {3}</li>
                </Typography>
            </ul>

            <Divider />

            <ul>
                <Typography variant="h6">
                    <li>ROOM {4}<LockIcon style={{marginLeft: '0.5rem'}}/></li>
                    <li>ROOM {5}<LockIcon style={{marginLeft: '0.5rem'}}/></li>
                    <li>ROOM {6}<LockIcon style={{marginLeft: '0.5rem'}}/></li>
                </Typography>
            </ul>

            <Divider />

            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button variant="contained" onClick={openCreateRoomModal} size="small" style={{margin: '2rem 0 1rem 0', background: 'black', color: 'white'}}>CREATE ROOM</Button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Link to="/" style={{textDecoration: 'none'}}>
                    <Button variant="contained" size="small" style={{background: 'black', color: 'white', marginBottom: '2rem'}}>LOG OUT</Button>
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
                        // onChange={handleCreateRoomName}
                        defaultValue={""}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateRoomClose} color="primary" style={{color: 'black'}}>GO BACK</Button>
                    <Button onClick={handleCreateRoomClose} variant="contained" color="primary" style={{background: 'black', color: 'white'}}>CREATE</Button>
                </DialogActions>
            </Dialog>
        </div>
    )    
}

export default ChatRooms;
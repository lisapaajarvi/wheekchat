import React from 'react';
import { Typography, Divider, Button, TextField } from '@material-ui/core';
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
                <Button variant="contained" onClick={openCreateRoomModal} style={{margin: '1rem', background: 'black', color: 'white'}}>CREATE ROOM</Button>
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
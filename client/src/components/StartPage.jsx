import React, { useContext } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import '../css/startpage.css';
import UserContext from './contexts/UserContext'

function StartPage() {
    const [name, setName] = React.useState('');
    const { saveUser } = useContext(UserContext);
    
    const handleOnClick = () => {
        saveUser(name);
    }
    const handleUserChange = (e) => {
        setName(e.target.value);
    }
    return (
        <div style={{ background: '#e2e2e2' }}>
            <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <img className="logoStyle" src={logo} alt="Logo" />
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '1.5rem' }}>
                    <TextField id="name" onChange={handleUserChange} label="Enter your name" value={name} variant="outlined" size="small" />
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <Link to="/chat" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" onClick={handleOnClick} style={{ background: 'black', color: 'white' }}>LET'S WHEEK!</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default StartPage;
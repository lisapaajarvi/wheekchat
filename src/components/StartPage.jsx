import React from 'react';
import { TextField } from '@material-ui/core';
import { Container, Button } from '@material-ui/core';
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import '../css/startpage.css';

function StartPage() {   
    return (
        <div style={{ background: '#F5F5F5' }}>
            <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <img className="logoStyle" src={logo} alt="Logo" />
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '1.5rem' }}>
                    <TextField id="name" label="Enter your name" value={""} variant="outlined" size="small" />
                    <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                        <Link to="/chat">
                            <Button variant="contained">Let's wheek!</Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )    
}

export default StartPage;
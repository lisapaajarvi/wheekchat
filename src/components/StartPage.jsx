import React from 'react';
import { TextField } from '@material-ui/core';
import { Container, Button } from '@material-ui/core';
import logo from '../assets/logo.png';
import '../css/startpage.css';

function StartPage() {   
    return (
        <div style={{ background: '#E8E8E8' }}>
            <Container maxWidth="md" style={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'white', justifyContent: 'center', alignItems: 'center' }}>
                <img className="logoStyle" src={logo} alt="Logo" />
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: '1rem' }}>
                    <TextField id="name" label="Enter your name" value="" />

                    <div style={{ margin: '1rem', display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained">
                            Let's wheek!
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    )    
}

export default StartPage;
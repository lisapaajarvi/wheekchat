import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StartPage from './StartPage';
import MainPage from './MainPage';

function Main() {   
    return (
        <Switch>
            <Route exact path="/">
                <StartPage />
            </Route>
            <Route path="/chat" component={MainPage} />
        </Switch>
    )    
}

export default Main;
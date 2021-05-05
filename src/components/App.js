import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main';
import { UserProvider } from './contexts/UserContext';

function App() {
  
  return (
    <UserProvider>
      <Router>
        <Main />
      </Router>
    </UserProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [user, setUser] = React.useState();
  return (
    <UserProvider value={{
      user,
      setUser
    }}>
    <Router>
      <Main />
    </Router>
    </UserProvider>
  );
}

export default App;

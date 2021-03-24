import React from 'react';
import { Router} from '@reach/router';
import './App.css';
import LogReg from './views/LogReg';
import Header from './views/Header';
import UserHome from './views/UserHome';



function App() {
  
  return (
    <div className="container">
      <Header />
      <Router>
        <LogReg path = "/"/>
        <UserHome path = "/user/:id" />
      </Router>
    </div>
  );
}

export default App;

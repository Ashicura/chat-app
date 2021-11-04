import React, { useState } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import Login from './Components/Login/Login';
import { useStateValue } from './StateProvider';



function App() {
  const [ {user}, dispatch] = useStateValue();


  return (
    <div className="app">

      {!user ? (
        <Login />
      ): (
        <div className="appBody">
        <Router>
          <Sidebar />
            <Switch>
             
              <Route path="/rooms/:roomId"> 
                  <Chat />
                </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
        </Router>
      </div>
      )}      
    </div>
  );
}

export default App;


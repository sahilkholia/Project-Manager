import './App.css';
import Menu from './Menu';
import { useState,useEffect } from 'react';
import Axios from "axios";
import SignUp from './SignUp';
import Login from './Login';

function App() {

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      console.log(response.data);
    })
  }, []);

  return (
    <div className="App">
      <Menu />
      <div className="credBody">
        <SignUp />
        <Login />
      </div>
    </div>
  );
}

export default App;

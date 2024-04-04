import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Get, Post } from './api_service';

function App() {  
  const url = "/app";
  const [userData, setData] = useState([]);

  const x = Get(url);
  useEffect(() => {
    Promise.all([x]).then(res => {
      console.log(res);
      setData(res);
    });
  }, [])

  const response = {
    "Wells": 450,
    "Wavelength": 2,
    "Lm": [519, 53]
  }

  return (
    <div className="App">    
      <h1>Axios Data</h1>   
      <button onClick={() => {Post(url, response)}}>Click me for post</button>  
    </div>
  );
}

export default App;

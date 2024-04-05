import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Get, Post } from './api_service';
import Home from './component/Home';
import EditSettings from './component/EditSettings';

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

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(prevState => !prevState);
  };

  return (
    <div>    
     <Home toggleSettings={toggleSettings}></Home>  
     {showSettings && <EditSettings />}
    </div>
  );
}

export default App;

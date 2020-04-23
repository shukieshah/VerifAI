import React, { useState, useEffect } from 'react';
import Form from './Form.js';
import './App.css';
import Img from 'react-image';




function App() {

  useEffect(() => {
    document.title = "VerifAI";
  }, []);

  return (
    <div className="App">
      <Form/>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Form from './Form.js';
import './App.css';
import Img from 'react-image';




function App() {

  const [image, setImage] = useState('splash.jpg');

  useEffect(() => {
    document.title = "VerifAI";
  }, []);

  const changeImage = (type) => {
    setImage(type + '.jpg');
  };


  return (
    <div className="App">
      <Img backgroundSize='cover' height={'800'} width={950} src={require('./images/' + image)}/>
      <Form changeImage={changeImage}/>
    </div>
  );
}

export default App;

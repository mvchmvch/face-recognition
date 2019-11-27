import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'


const particleOptions = {
  particles: {
   number: {
    value:300,
    density: {
      enable: true,
      value_area: 800
    }
   }
  }
}

function App() {
  return (
    <div className="App">
      <Particles
        className = 'particles' 
        params={particleOptions}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/*<FaceRecognition/> */}

    </div>
  );
}

export default App;

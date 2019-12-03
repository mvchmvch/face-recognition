import React, {Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation'
import Logo from './components/logo/Logo'
import Rank from './components/rank/Rank'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm'
import FaceRecognition from './components/facerecognition/FaceRecognition'
import SignIn from './components/signin/SignIn'
import Register from './components/register/Register'

import Clarifai from 'clarifai'

const clarifaiApp = new Clarifai.App({
 apiKey: '454dfe2690d64122815a1ad8a6ed3267'
});


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

class App extends Component {

constructor() {
  super();
  this.state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn : false
  }
}

calculateFaceLocation = (data) => {
  const cl_face = data.outputs[0].data.regions[0].region_info.bounding_box
  const image = document.getElementById('inputimage')
  const width = Number(image.width)
  const height = Number(image.height)
  return {
    leftCol: cl_face.left_col * width,
    topRow:  cl_face.top_row * height,
    rightCol: width - (cl_face.right_col * width),
    bottomRow: height - (cl_face.bottom_row * height)
  }
}

displayFaceBox = (box) => {
  this.setState({box: box});
}

onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit  = () => {
 this.setState({imageUrl: this.state.input})
 
 clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
 .then( response => this.displayFaceBox(this.calculateFaceLocation(response)))
 .catch (err => console.log(err));
}

onRouteChange = (route) => {
  if (route === 'signout') {
      this.setState({isSignedIn: false})
  } else if (route === 'home') {
      this.setState({isSignedIn: true})
  }
  this.setState({route: route})
}

render() {
  
  const { isSignedIn, imageUrl, route, box } = this.state;

  return (
    <div className="App">
      <Particles
        className = 'particles' 
        params={particleOptions}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      
      {
      route === 'home' 
        ? <div>
            <Logo/>
            <Rank/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
            route === 'signin' 
              ? <SignIn onRouteChange = {this.onRouteChange}/>
              : <Register onRouteChange = {this.onRouteChange}/>
        )

        
      }
    </div>
  );
}
}

export default App;

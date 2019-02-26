import React, { Component } from 'react';
import ParticleOptions from './components/ParticleOptions/ParticleOptions';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Footer from './components/Footer/Footer';
import './App.css';

const app = new Clarifai.App({
	apiKey: 'eea44f3b0fed4c8ea7ec3bb796cfb5d5'
});

class App extends Component {
	constructor() {
		super();
		this.state = {
			input:'',
			imageUrl: ' ',
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit =() => {
		this.setState({ imageUrl: this.state.input });
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL, 
			this.state.input
			)
		.then(
			function(response) {
				console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
			},
			function(err) {}
		)
	}

	render() {
		return (
			<div className="App site">
				<Particles className='particles'
					params={ParticleOptions}
					/>
				<Navigation />
				<div className='site-content'>
					<Logo />
					<Rank />
					<ImageLinkForm 
						onInputChange={this.onInputChange} 
						onButtonSubmit={this.onButtonSubmit}/>
					<FaceRecognition imageUrl={this.state.imageUrl} />
				</div>
				<Footer />
			</div>
			);
	}
}

export default App;

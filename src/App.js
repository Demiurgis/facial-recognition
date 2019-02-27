import React, { Component } from 'react';
import ParticleOptions from './components/ParticleOptions/ParticleOptions';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
			box: {},
			route: 'signin',
			isSignedIn: false
		}
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box: box});
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
		.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
		.catch(err => console.log(err));
	}

	onRouteChange = ( route ) => {
		if( route === 'signin' ) {
			this.setState({ isSignedIn: false })
		} else if ( route === 'home' ) {
			this.setState({ isSignedIn: true })
		}
		this.setState({ route: route });
	}

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className="App site">
				<Particles className='particles'
					params={ParticleOptions}
					/>
				<Navigation onRouteChange={ this.onRouteChange } isSignedIn={ isSignedIn } />
				{ route === 'home' 
					?	<div className='site-content'>
							<Logo />
							<Rank />
							<ImageLinkForm 
								onInputChange={this.onInputChange} 
								onButtonSubmit={this.onButtonSubmit}/>
							<FaceRecognition box={ box } imageUrl={ imageUrl } />
						</div>
					: 	(
						this.state.route === 'signin'
						?  <SignIn onRouteChange={ this.onRouteChange } />
						:  <Register onRouteChange={ this.onRouteChange } />
						)
				}
				<Footer />
			</div>
		);
	}
}

export default App;

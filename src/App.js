import React, { Component } from 'react';
import ParticleOptions from './components/ParticleOptions/ParticleOptions';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Footer from './components/Footer/Footer';
import './App.css';

const initialState = {
	input:'',
	imageUrl: ' ',
	box: {},
	route: 'signin',
	isSignedIn: false,
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	loadUser = ( data ) => {
		this.setState( {user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		}})
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
		// console.log(box);
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onPictureSubmit =() => {
		this.setState({ imageUrl: this.state.input });
			fetch('https://morning-lowlands-35882.herokuapp.com/imageurl', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					input: this.state.input	
				})
			})
		.then( response => response.json() )
		.then( response => {
			if( response ){ 
				fetch('https://morning-lowlands-35882.herokuapp.com/image', {
					method: 'put',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						id: this.state.user.id	
					})
				})
				.then( response => response.json() )
				.then( count => {
					this.setState(Object.assign(this.state.user,  { entries: count }))
				})
				.catch( console.log )
			}
			this.displayFaceBox(this.calculateFaceLocation(response))
		})
		.catch(err => console.log(err));
	}

	onRouteChange = ( route ) => {
		if( route === 'signout' ) {
			this.setState( initialState );
		} else if ( route === 'home' ) {
			this.setState({ isSignedIn: true });
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
							<Rank name={ this.state.user.name } entries={ this.state.user.entries} />
							<ImageLinkForm 
								onInputChange={this.onInputChange} 
								onPictureSubmit={this.onPictureSubmit}/>
							<FaceRecognition box={ box } imageUrl={ imageUrl } />
						</div>
					: 	(
						route === 'signin' || route === 'signout'
						?  <SignIn loadUser={ this.loadUser } onRouteChange={ this.onRouteChange } />
						:  <Register loadUser={ this.loadUser } onRouteChange={ this.onRouteChange } />
						)
				}
				<Footer />
			</div>
		);
	}
}

export default App;

//add enter key functionality
//clear input upon submission
//if no face is found => notice should alert such and entries should not increase
//if face found => notice that a face was found
//particles.js => fix left padding issue. fix particles updating with state change
//add register warning about password security
import React from 'react';
import Tilt from 'react-tilt';
import chip from './chip.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='center ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa2">
 					<img alt= 'logo' src={chip}/>
 				</div>
			</Tilt>
		</div>
	);
}

export default Logo;
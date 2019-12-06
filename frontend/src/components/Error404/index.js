import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
	return (
		<div className='containter'>
			<div className='error-wrapper'>
				<div className='man-icon'></div>
				<h3 className='title'>404</h3>
				<p className='info'>Página no encontrada!</p>

				<Link to='/' className='home-btn'>
					Volver al home
				</Link>
			</div>
		</div>
	);
}

export default Error404;

import React from 'react';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import { loggearORegistrarUsuario } from '../../actions/usuarioActions';

function LoginFacebook({ textoBoton }) {
	const dispatch = useDispatch();

	let responseFacebook = response => {
		let usuario = {
			id_facebook: response.id,
			mail: response.email,
			nombre: response.name,
			imagen: response.picture.data.url
		};

		loggearORegistrarUsuario(dispatch, usuario);
	};

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<FacebookLogin
				size='small'
				appId='2604956162886248'
				autoLoad={false}
				fields='name,email,picture'
				callback={responseFacebook}
				textButton={textoBoton}
				cssClass='btnFacebook'
				icon={<i className='fab fa-facebook-f' style={{ marginRight: '10px', fontSize: '15px' }}></i>}
			/>
		</div>
	);
}

export default LoginFacebook;

import React from 'react';
import { useDispatch } from 'react-redux';
import FacebookLogin from 'react-facebook-login';

import { loggearUsuario } from '../../actions/usuarioActions';

function LoginFacebook() {
	const dispatch = useDispatch();

	let responseFacebook = response => {
		let usuario = {
			id_facebook: response.id,
			mail: response.email,
			nombre: response.name,
			imagen: response.picture.data.url
		};
		console.log(usuario);
		loggearUsuario(dispatch, usuario);
	};

	return (
		<div>
			<FacebookLogin
				size='small'
				appId='2604956162886248'
				autoLoad={false}
				fields='name,email,picture'
				callback={responseFacebook}
				textButton={''}
				icon={<i class='fab fa-facebook-f'></i>}
			/>
		</div>
	);
}

export default LoginFacebook;

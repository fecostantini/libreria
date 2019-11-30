import React from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';

import { loggearORegistrarUsuario } from '../../actions/usuarioActions';

function LoginGoogle({ textoBoton }) {
	const dispatch = useDispatch();

	const responseGoogle = response => {
		console.log(response);
		let usuario = {
			id_google: response.profileObj.googleId,
			mail: response.profileObj.email,
			nombre: response.profileObj.name,
			imagen: response.profileObj.imageUrl
		};

		loggearORegistrarUsuario(dispatch, usuario);
	};

	return (
		<div>
			<GoogleLogin
				clientId='747302210477-6hc48cst5ljqu4057cb4qcf719b2i492.apps.googleusercontent.com'
				buttonText={textoBoton}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
				className='btnGoogle'
			/>
		</div>
	);
}

export default LoginGoogle;

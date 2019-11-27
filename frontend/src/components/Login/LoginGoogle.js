import React from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';

import { loggearUsuario } from '../../actions/usuarioActions';

function LoginGoogle() {
	const dispatch = useDispatch();

	const responseGoogle = response => {
		console.log(response);
		let usuario = {
			id_google: response.profileObj.googleId,
			mail: response.profileObj.email,
			nombre: response.profileObj.name,
			imagen: response.profileObj.imageUrl
		};
		console.log(usuario);
		loggearUsuario(dispatch, usuario);
	};

	return (
		<div>
			<GoogleLogin
				clientId='747302210477-6hc48cst5ljqu4057cb4qcf719b2i492.apps.googleusercontent.com'
				buttonText={''}
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
			,
		</div>
	);
}

export default LoginGoogle;

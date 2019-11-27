import React from 'react';
import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';
function Login() {
	return (
		<div className='row'>
			<LoginFacebook className='col-6' />
			<LoginGoogle className='col-6' />
		</div>
	);
}

export default Login;

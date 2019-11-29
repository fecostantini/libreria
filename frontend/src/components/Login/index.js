import React from 'react';
import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';
function Login() {
	return (
		<div className='row'>
			<LoginFacebook className='col-lg-6 col-sm-12 col-md-12' />
			<LoginGoogle className='col-lg-6 col-sm-12 col-md-12' />
		</div>
	);
}

export default Login;

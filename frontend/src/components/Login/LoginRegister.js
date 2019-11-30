import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loggearUsuario } from '../../actions/usuarioActions';
import { Button, Modal } from 'react-bootstrap';

function LoginRegister() {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
		<Fragment>
			<Button variant='primary' onClick={handleShow} className='btnLogin'>
				Loggear
			</Button>
			<Button variant='primary' onClick={handleShow} className='btnRegister'>
				Registrarse
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
					<Button variant='primary' onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default LoginRegister;

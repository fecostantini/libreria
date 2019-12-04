import LoginFacebook from './LoginFacebook';
import LoginGoogle from './LoginGoogle';
import React, { Fragment, useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { loggearUsuario, registrarUsuario } from '../../actions/usuarioActions';

import Swal from 'sweetalert2';
import { Button, Modal, Col, Row, Form } from 'react-bootstrap';
import Error from '../Common/Error';
import estados from '../../estados';
import { swalConfig } from '../Common/utils';

const imagenDefault = 'https://i.pinimg.com/originals/4f/8e/66/4f8e66cbf93a262d2039ccfd1639723d.png';
const tiposModales = { LOGIN: 'LOGIN', REGISTER: 'REGISTER' };
const usuarioDefault = { mail: '', nombre: '', password: '', imagen: imagenDefault };

const infoModalLogin = {
	titulo: 'Iniciar sesión',
	textoBotones: {
		google: 'Loggear con Google',
		facebook: 'Loggear con Facebook',
		principal: 'Loggearte'
	}
};

const infoModalRegister = {
	titulo: 'Registrarse',
	textoBotones: {
		google: 'Registrarse con Google',
		facebook: 'Registrarse con Facebook',
		principal: 'Registrarte'
	}
};

function Login() {
	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);
	const dispatch = useDispatch();

	const [mostrarAlerta, setMostrarAlerta] = useState(false);
	const [error, setError] = useState({ activo: false, mensaje: '' }); // error en el formulario
	const [mostrarModal, setMostrarModal] = useState(false);
	const [infoModal, setInfoModal] = useState(infoModalLogin);
	const [usuario, setUsuario] = useState(usuarioDefault);
	const handleClose = () => setMostrarModal(false);

	useEffect(() => {
		// solo queremos mostrar el error si mostrarAlerta es verdadero
		if (!mostrarAlerta) return;

		// solo queremos mostrar estos estados
		if (
			statusUltimaPeticion !== estados.CONTRASEÑA_INCORRECTA &&
			statusUltimaPeticion !== estados.CONEXION_FALLIDA &&
			statusUltimaPeticion !== estados.FRACASO &&
			statusUltimaPeticion !== estados.YA_EXISTE
		) {
			setMostrarAlerta(false);
			return;
		}

		const swalConfigNueva = {
			...swalConfig,
			icon: 'error'
		};

		if (statusUltimaPeticion === estados.CONTRASEÑA_INCORRECTA)
			swalConfigNueva.title = 'La contraseña que ingresó es incorrecta';
		else if (statusUltimaPeticion === estados.CONEXION_FALLIDA)
			swalConfigNueva.title = 'Falló la conexión a la Base de Datos';
		else if (statusUltimaPeticion === estados.FRACASO)
			swalConfigNueva.title = 'No existe ningún usuario con el mail ingresado';
		else if (statusUltimaPeticion === estados.YA_EXISTE)
			swalConfigNueva.title = 'El correo que quiso registrar ya pertenece a otra cuenta';

		setMostrarAlerta(false);
		Swal.fire(swalConfigNueva);
	}, [mostrarAlerta]);

	const levantarModal = tipoModal => {
		if (tipoModal === tiposModales.LOGIN) setInfoModal(infoModalLogin);
		else if (tipoModal === tiposModales.REGISTER) setInfoModal(infoModalRegister);
		setMostrarModal(true);
	};

	let handleChange = e => {
		let { name, value } = e.target;

		setUsuario(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	let handleSubmit = () => {
		const enviarFormulario = tipoModal => {
			setError({ activo: false });
			if (tipoModal === tiposModales.LOGIN)
				loggearUsuario(dispatch, usuario).then(() => {
					setMostrarAlerta(true);
				});
			else if (tipoModal === tiposModales.REGISTER)
				registrarUsuario(dispatch, usuario).then(() => {
					setMostrarAlerta(true);
				});
			setUsuario(usuarioDefault);
			setMostrarModal(false);
		};

		const errorInfo = {
			activo: true,
			mensaje: 'Debe rellenar todos los campos'
		};

		// si se está registrando se necesita el nombre
		if (infoModal.titulo === 'Registrarse') {
			if (usuario.nombre && usuario.mail && usuario.password) enviarFormulario(tiposModales.REGISTER);
			else setError(errorInfo);
		} else {
			// si se está loggeando no hace falta el nombre
			if (usuario.mail && usuario.password) enviarFormulario(tiposModales.LOGIN);
			else setError(errorInfo);
		}
	};

	let formulario = (
		<Form>
			{error.activo ? <Error mensaje={error.mensaje} /> : null}
			{/* Si se va a registrar también debe ingresar nombre y apellido */}
			{infoModal.titulo === 'Registrarse' ? (
				<Form.Group>
					<Form.Label>Nombre y apellido</Form.Label>
					<Form.Control
						value={usuario.nombre}
						type='text'
						name='nombre'
						placeholder='Juan Perez'
						onChange={handleChange}
					/>
				</Form.Group>
			) : null}

			<Form.Group>
				<Form.Label>Email</Form.Label>
				<Form.Control
					value={usuario.mail}
					type='email'
					name='mail'
					placeholder='ejemplo@hotmail.com'
					onChange={handleChange}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Contraseña</Form.Label>
				<Form.Control
					value={usuario.password}
					type='password'
					name='password'
					placeholder='Ingrese su contraseña'
					onChange={handleChange}
				/>
			</Form.Group>
		</Form>
	);

	let modal = (
		<Modal show={mostrarModal} onHide={handleClose} size='lg'>
			<Modal.Header closeButton>
				<Row>
					<Col sm={12} md={12} lg={4}>
						<Modal.Title>{infoModal.titulo}</Modal.Title>
					</Col>
					<Col sm={12} md={6} lg={4}>
						<LoginFacebook textoBoton={infoModal.textoBotones.facebook} />
					</Col>
					<Col sm={12} md={6} lg={4}>
						<LoginGoogle textoBoton={infoModal.textoBotones.google} />
					</Col>
				</Row>
			</Modal.Header>
			<Modal.Body>{formulario}</Modal.Body>
			<Modal.Footer>
				<Button variant='primary' onClick={handleSubmit} block>
					{infoModal.textoBotones.principal}
				</Button>
			</Modal.Footer>
		</Modal>
	);

	return (
		<Fragment>
			<Button variant='primary' onClick={e => levantarModal(tiposModales.LOGIN)} className='btnLogin'>
				Loggear
			</Button>
			<Button variant='primary' onClick={e => levantarModal(tiposModales.REGISTER)} className='btnRegister'>
				Registrarse
			</Button>

			{modal}
		</Fragment>
	);
}

export default Login;

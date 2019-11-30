import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUsuario } from '../../actions/usuarioActions';
import Error from '../Common/Error';

const AltaProducto = () => {
	const dispatch = useDispatch();
	const usuarioActualRedux = useSelector(state => state.usuario.usuarioActual);

	const [error, setError] = useState({ activo: false, mensaje: '' });
	const [usuarioActualState, setUsuarioActualState] = useState(usuarioActualRedux);

	const handleChange = e => {
		let { name, value } = e.target;
		setUsuarioActualState(estadoPrevio => {
			return { ...estadoPrevio, [name]: value };
		});
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (!usuarioActualState.nombre) setError({ activo: true, mensaje: 'Ingrese un nombre y un apellido' });
		else if (!usuarioActualState.mail) setError({ activo: true, mensaje: 'Ingrese un mail' });
		else {
			updateUsuario(dispatch, usuarioActualState).then(() => {
				window.location.reload();
			});
		}
	};
	return (
		<Form>
			{error.activo ? <Error mensaje={error.mensaje} /> : null}
			<Form.Group>
				<Form.Label>Nombre y apellido</Form.Label>
				<Form.Control
					name='nombre'
					type='text'
					placeholder='Juan Perez'
					value={usuarioActualState.nombre}
					onChange={handleChange}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Mail</Form.Label>
				<Form.Control
					name='mail'
					type='email'
					placeholder='Enter email'
					value={usuarioActualState.mail}
					onChange={handleChange}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Contraseña</Form.Label>
				<Form.Control
					name='password'
					type='password'
					placeholder='Ingrese su nueva contraseña'
					value={usuarioActualState.password}
					onChange={handleChange}
				/>
			</Form.Group>

			<Button variant='primary' type='submit' onClick={handleSubmit}>
				Submit
			</Button>
		</Form>
	);
};

export default AltaProducto;

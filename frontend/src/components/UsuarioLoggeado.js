import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { desloggearUsuario } from '../actions/usuarioActions';

export default function UsuarioLoggeado() {
	let history = useHistory();
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const dispatch = useDispatch();

	let desloggear = () => {
		desloggearUsuario(dispatch);
		history.push('/'); // ir al home
	};

	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle>
					<Image className='mr-2' src={usuarioActual.imagen} style={{ height: '42px', width: 'auto' }} roundedCircle />
					{usuarioActual.nombre}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item onClick={() => history.push('/editar_perfil')}>
						<i className='fas fa-edit'></i> Editar perfil
					</Dropdown.Item>

					<Dropdown.Divider />
					<Dropdown.Item onClick={desloggear}>
						<i className='fas fa-sign-out-alt'></i> Cerrar sesión
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

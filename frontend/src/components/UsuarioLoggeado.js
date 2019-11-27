import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Image } from 'react-bootstrap';
import { desloggearUsuario } from '../actions/usuarioActions';

export default function UsuarioLoggeado() {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const dispatch = useDispatch();

	let desloggear = () => {
		desloggearUsuario(dispatch);
	};

	return (
		<div>
			<Dropdown>
				<Dropdown.Toggle>
					<Image className='mr-2' src={usuarioActual.imagen} />
					{usuarioActual.nombre}
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item>
						<Link to='/editar_perfil' style={{ textDecoration: 'none', color: '#000000' }}>
							<i class='fas fa-edit'></i> Editar perfil
						</Link>
					</Dropdown.Item>

					<Dropdown.Divider />
					<Dropdown.Item onClick={desloggear}>
						<i class='fas fa-sign-out-alt'></i> Cerrar sesión
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</div>
	);
}

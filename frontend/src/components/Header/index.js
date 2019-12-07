import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../Login';
import UsuarioLoggeado from './UsuarioLoggeado';
import IconoCarrito from './IconoCarrito';
import { getElementos, fetchCarritoActivo } from '../../actions/carritoActions';

const Header = () => {
	const dispatch = useDispatch();
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const elementosCarrito = useSelector(state => state.carrito.items);
	const idCarritoActivo = useSelector(state => state.carrito.idCarritoActivo);

	const cantidadElementosCarrito = () => {
		let cantidadElementos = 0;
		elementosCarrito.forEach(elemento => (cantidadElementos += elemento.cantidad));
		return cantidadElementos;
	};

	useEffect(() => {
		if (usuarioActual) {
			fetchCarritoActivo(dispatch, usuarioActual.id_usuario).then(() => {
				getElementos(dispatch, idCarritoActivo);
			});
		}
	}, [idCarritoActivo, usuarioActual]);

	const linkAdministrar = (
		<li className='nav-item'>
			<NavLink to='/administrar/gestion_productos/alta' className='nav-link' activeClassName='active'>
				Administrar
			</NavLink>
		</li>
	);

	const iconoCarrito = (
		<Link to='/carrito' className='btn btn-success btn-sm mr-3' key='1'>
			<IconoCarrito cantidadElementos={cantidadElementosCarrito} />
		</Link>
	);

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<Link to='/' className='navbar-brand'>
					Libreria
				</Link>

				<ul className='navbar-nav mr-auto'>
					{usuarioActual && usuarioActual.rol === 'ADMIN' ? linkAdministrar : null}

					<li className='nav-item'>
						<NavLink to='/productos' className='nav-link' activeClassName='active'>
							Productos
						</NavLink>
					</li>
				</ul>

				<form className='form-inline my-2 my-lg-0'>
					{usuarioActual ? [iconoCarrito, <UsuarioLoggeado key='2' />] : <Login />}
				</form>
			</div>
		</nav>
	);
};

export default Header;

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../Login';
import UsuarioLoggeado from './UsuarioLoggeado';
import IconoCarrito from './IconoCarrito';

const Header = () => {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	const linkAdministrar = usuarioActual && (
		<li className='nav-item'>
			<NavLink to='/administrar/gestion_productos/alta' className='nav-link' activeClassName='active'>
				Administrar
			</NavLink>
		</li>
	);

	const iconoCarrito = (
		<Link to='/carrito' className='btn btn-success btn-sm mr-3' key='1' style={{ fontSize: '18px' }}>
			<IconoCarrito />
		</Link>
	);

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<Link to='/' className='navbar-brand'>
					Libreria
				</Link>

				<ul className='navbar-nav mr-auto'>{linkAdministrar}</ul>

				<form className='form-inline my-2 my-lg-0'>
					{usuarioActual ? [iconoCarrito, <UsuarioLoggeado key='2' />] : <Login />}
				</form>
			</div>
		</nav>
	);
};

export default Header;

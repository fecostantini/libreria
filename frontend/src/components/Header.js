import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
import UsuarioLoggeado from './UsuarioLoggeado';

const Header = () => {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	const linkAdministrar = (
		<li className='nav-item'>
			<NavLink to='/administrar' className='nav-link' activeClassName='active'>
				Administrar
			</NavLink>
		</li>
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
				<form className='form-inline my-2 my-lg-0'>{usuarioActual ? <UsuarioLoggeado /> : <Login />}</form>
			</div>
		</nav>
	);
};

export default Header;

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
	<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
		<div className='container'>
			<Link to='/' className='navbar-brand'>
				Libreria
			</Link>

			<ul className='navbar-nav mr-auto'>
				<li className='nav-item'>
					<NavLink
						to='/administrar'
						className='nav-link'
						activeClassName='active'
					>
						Administrar
					</NavLink>
				</li>

				<li className='nav-item'>
					<NavLink
						to='/productos'
						className='nav-link'
						activeClassName='active'
					>
						Productos
					</NavLink>
				</li>
			</ul>
		</div>
	</nav>
);

export default Header;

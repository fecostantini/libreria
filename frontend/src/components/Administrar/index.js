import React, { Fragment } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

const Administrar = () => (
	<Fragment>
		<ul className='nav flex-column'>
			<li className='nav-item'>
				<NavLink
					to='/administrar/gestion_productos'
					className='nav-link'
					activeClassName='active'
				>
					Gestionar productos
				</NavLink>
				<NavLink
					to='/administrar/gestion_usuarios'
					className='nav-link'
					activeClassName='active'
				>
					Gestionar usuarios
				</NavLink>
			</li>
		</ul>
		<Switch>
			<Route
				path='/administrar/gestion_productos'
				component={() => <h1>Gestionar productos</h1>}
			/>
			<Route
				path='/administrar/gestion_usuarios'
				component={() => <h1>Gestionar usuarios</h1>}
			/>
			<Route
				render={() => <h1 className='text-center'>Seleccione una opción!</h1>}
			/>
		</Switch>
	</Fragment>
);

export default Administrar;

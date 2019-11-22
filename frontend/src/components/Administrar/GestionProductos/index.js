import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import AltaProducto from '../GestionProductos/AltaProducto';
import BajaProducto from '../GestionProductos/BajaProducto';
import ModificarProducto from '../GestionProductos/ModificarProducto';

const GestionProductos = () => (
	<div className='col'>
		<ul className='nav nav-tabs'>
			<li className='nav-item'>
				<NavLink to='/administrar/gestion_productos/alta' className='nav-link'>
					Alta
				</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink to='/administrar/gestion_productos/baja' className='nav-link'>
					Baja
				</NavLink>
			</li>
			<li className='nav-item'>
				<NavLink
					to='/administrar/gestion_productos/modificar'
					className='nav-link'
				>
					Modificar
				</NavLink>
			</li>
		</ul>

		<Switch>
			<Route
				exact
				path={[
					'/administrar/gestion_productos',
					'/administrar/gestion_productos/alta'
				]}
				component={AltaProducto}
			/>
			<Route
				path='/administrar/gestion_productos/baja'
				component={BajaProducto}
			/>
			<Route
				path='/administrar/gestion_productos/modificar'
				component={ModificarProducto}
			/>
			<Route render={() => <h1 className='text-center'>!</h1>} />
		</Switch>
	</div>
);

export default GestionProductos;

import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import GestionProductos from '../Administrar/GestionProductos';
import ReporteStock from '../Administrar/ReporteStock';

const Administrar = () => (
	<div className='container'>
		<div className='row'>
			<ul className='nav flex-column'>
				<li className='nav-item'>
					<NavLink to='/administrar/gestion_productos/alta' className='nav-link'>
						Gestionar productos
					</NavLink>
					<NavLink to='/administrar/reporte_stock' className='nav-link'>
						Reporte stock
					</NavLink>
					{/*
            <NavLink to='/administrar/gestion_usuarios' className='nav-link'>
						Gestionar usuarios
					</NavLink>
          */}
				</li>
			</ul>
			<Switch>
				<Route path='/administrar/gestion_productos' render={() => <GestionProductos />} />
				<Route path='/administrar/reporte_stock' component={ReporteStock} />
				{/*<Route path='/administrar/gestion_usuarios' component={() => <h1>Gestionar usuarios</h1>} />*/}
				<Route render={() => <h1 className='text-center'>Seleccione una opción!</h1>} />
			</Switch>
		</div>
	</div>
);

export default Administrar;

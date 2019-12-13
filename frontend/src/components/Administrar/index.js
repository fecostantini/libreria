import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GestionProductos from '../Administrar/GestionProductos';
import ReporteStock from '../Administrar/ReporteStock';
import GestionPedidos from '../Administrar/GestionPedidos';

const Administrar = () => {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	return (
		<div className='container'>
			<div className='row'>
				<ul className='nav flex-column'>
					<li className='nav-item'>
						<NavLink to='/administrar/gestion_productos/alta' className='nav-link'>
							Gestionar productos
						</NavLink>
						{usuarioActual.rol === 'ADMIN' && (
							<NavLink to='/administrar/reporte_stock' className='nav-link'>
								Reporte stock
							</NavLink>
						)}
						{(usuarioActual.rol === 'ADMIN' || usuarioActual.rol === 'GESTOR_PEDIDOS') && (
							<NavLink to='/administrar/gestion_pedidos/sin_decidir' className='nav-link'>
								Gestionar pedidos
							</NavLink>
						)}
					</li>
				</ul>
				<Switch>
					<Route path='/administrar/gestion_productos' render={() => <GestionProductos />} />

					{usuarioActual.rol === 'ADMIN' && <Route path='/administrar/reporte_stock' component={ReporteStock} />}
					{(usuarioActual.rol === 'ADMIN' || usuarioActual.rol === 'GESTOR_PEDIDOS') && (
						<Route path='/administrar/gestion_pedidos' component={GestionPedidos} />
					)}

					<Route
						render={() => (
							<div className='col text-center'>
								<h1>Seleccione una opción!</h1>
							</div>
						)}
					/>
				</Switch>
			</div>
		</div>
	);
};

export default Administrar;

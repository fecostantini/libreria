import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import PedidosSinDecidir from './PedidosSinDecidir';
import PedidosPagados from './PedidosPagados';

function GestionPedidos() {
	return (
		<div className='col-lg col-sm-12'>
			<ul className='nav nav-tabs'>
				<li className='nav-item'>
					<NavLink to='/administrar/gestion_pedidos/sin_decidir' className='nav-link'>
						Pedidos sin decidir
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink to='/administrar/gestion_pedidos/pagados' className='nav-link'>
						Pedidos pagados
					</NavLink>
				</li>
			</ul>

			<Switch>
				<Route
					exact
					path={['/administrar/gestion_pedidos', '/administrar/gestion_pedidos/sin_decidir']}
					component={PedidosSinDecidir}
				/>
				<Route path='/administrar/gestion_pedidos/pagados' component={PedidosPagados} />
			</Switch>
		</div>
	);
}

export default GestionPedidos;

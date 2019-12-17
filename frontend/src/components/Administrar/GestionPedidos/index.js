import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import PedidosSinDecidir from './PedidosSinDecidir';
import PedidosPagados from './PedidosPagados';
import TodosLosPedidos from './TodosLosPedidos';

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
				<li className='nav-item'>
					<NavLink to='/administrar/gestion_pedidos/todos' className='nav-link'>
						Todos los pedidos
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
				<Route path='/administrar/gestion_pedidos/todos' component={TodosLosPedidos} />
			</Switch>
		</div>
	);
}

export default GestionPedidos;

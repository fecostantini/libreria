import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { fetchPedidos } from '../../../../actions/pedidoActions';
import { dateToString } from '../../../Common/utils';

function PedidosSinDecidir() {
	const dispatch = useDispatch();
	const pedidosSinDecidir = useSelector(state => state.pedido.todos_los_pedidos);

	useEffect(() => {
		fetchPedidos(dispatch, 'TODOS');
	}, []);

	const FilaPedido = ({ pedido }) => {
		return (
			<tr>
				<td>{pedido.id_usuario}</td>
				<td>{pedido.isbn}</td>
				<td>{pedido.cantidad}</td>
				<td>{dateToString(pedido.fecha_pedido)}</td>
				<td>{pedido.pagado ? 'Si' : 'No'}</td>
				<td>{pedido.aceptado ? 'Si' : 'No'}</td>
				<td>{pedido.fecha_llegada ? dateToString(pedido.fecha_llegada) : 'Sin definir'}</td>
			</tr>
		);
	};

	return (
		<Fragment>
			<div className='col text-center my-4'>
				<h1>Todos los pedidos</h1>
			</div>
			<Table responsive>
				<thead>
					<tr>
						<th>ID Usuario</th>
						<th>ISBN</th>
						<th>Cantidad</th>
						<th>Fecha pedido</th>
						<th>Pagado</th>
						<th>Aceptado</th>
						<th>Fecha llegada</th>
					</tr>
				</thead>
				<tbody>
					{pedidosSinDecidir.map(pedido => (
						<FilaPedido key={pedido.id_pedido} pedido={pedido} />
					))}
				</tbody>
			</Table>
		</Fragment>
	);
}

export default PedidosSinDecidir;

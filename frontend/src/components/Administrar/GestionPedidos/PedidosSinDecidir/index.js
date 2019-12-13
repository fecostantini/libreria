import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { fetchPedidos, aceptarORechazarPedido } from '../../../../actions/pedidoActions';

function PedidosSinDecidir() {
	const dispatch = useDispatch();
	const pedidosSinDecidir = useSelector(state => state.pedido.pedidos_sin_decidir);

	useEffect(() => {
		fetchPedidos(dispatch, 'SIN_DECIDIR');
	}, []);

	const FilaPedido = ({ pedido }) => {
		const aceptarPedido = () => {
			const infoPedido = { id_pedido: pedido.id_pedido, decision: 'ACEPTAR' };
			aceptarORechazarPedido(dispatch, infoPedido);
		};
		const rechazarPedido = () => {
			const infoPedido = { id_pedido: pedido.id_pedido, decision: 'RECHAZAR' };
			aceptarORechazarPedido(dispatch, infoPedido);
		};

		return (
			<tr>
				<td>{pedido.isbn}</td>
				<td>{pedido.cantidad}</td>

				<td>
					<button type='button' className='close' onClick={rechazarPedido}>
						<span className='text-danger'>&times;</span>
					</button>
				</td>
				<td>
					<button type='button' className='close' onClick={aceptarPedido}>
						<span className='text-success'>✓</span>
					</button>
				</td>
			</tr>
		);
	};

	return (
		<Fragment>
			<div className='col text-center my-4'>
				<h1>Aceptar o rechazar pedidos</h1>
			</div>
			<Table responsive>
				<thead>
					<tr>
						<th>ISBN</th>
						<th>Cantidad</th>
						<th></th>
						<th></th>
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

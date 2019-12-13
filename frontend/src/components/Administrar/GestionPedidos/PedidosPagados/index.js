import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { fetchPedidos } from '../../../../actions/pedidoActions';

function PedidosPagados() {
	const dispatch = useDispatch();
	const pedidosPagados = useSelector(state => state.pedido.pedidos_pagados);

	useEffect(() => {
		console.log('asd');
		fetchPedidos(dispatch, 'PAGADOS');
	}, []);

	const FilaPedido = ({ pedido }) => {
		return (
			<tr>
				<td>{pedido.isbn}</td>
				<td>{pedido.cantidad}</td>
				<td>FECHA ENTREGA</td>
			</tr>
		);
	};

	return (
		<Fragment>
			<div className='col text-center my-4'>
				<h1>Confirmar fecha de entrega</h1>
			</div>
			<Table responsive>
				<thead>
					<tr>
						<th>ISBN</th>
						<th>Cantidad</th>
						<th>FECHA ENTREGA</th>
					</tr>
				</thead>
				<tbody>
					{pedidosPagados.map(pedido => (
						<FilaPedido key={pedido.id_pedido} pedido={pedido} />
					))}
				</tbody>
			</Table>
		</Fragment>
	);
}

export default PedidosPagados;

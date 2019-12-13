import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { fetchPedidos, setFechaLlegada } from '../../../../actions/pedidoActions';
import axios from 'axios';
import { dateToString } from '../../../Common/utils';

function PedidosPagados() {
	const dispatch = useDispatch();
	const pedidosPagados = useSelector(state => state.pedido.pedidos_pagados);

	const setFechaPedido = (valor, idPedido) => {
		setFechasLlegada(prevState => {
			return { ...prevState, [idPedido]: valor };
		});
	};
	useEffect(() => {
		fetchPedidos(dispatch, 'PAGADOS');
	}, []);

	useEffect(() => {
		if (pedidosPagados)
			pedidosPagados.forEach(pedido => {
				setFechasLlegada(prevState => {
					return { ...prevState, [pedido.id_pedido]: null };
				});
			});
	}, [pedidosPagados.length]);

	const formatearDateParaInput = date => {
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;
	};

	const [fechasLlegada, setFechasLlegada] = useState({});

	const FilaPedido = ({ pedido }) => {
		return (
			<tr>
				<td>{pedido.isbn}</td>
				<td>{pedido.cantidad}</td>
				<td>
					<input
						type='date'
						value={
							fechasLlegada[pedido.id_pedido] ? formatearDateParaInput(new Date(fechasLlegada[pedido.id_pedido])) : ''
						}
						onChange={e => setFechaPedido(e.target.value, pedido.id_pedido)}
						min={formatearDateParaInput(new Date())}
						max={'2020-12-31'}
					/>
				</td>
				<td>
					<button
						type='button'
						className='btn btn-primary'
						disabled={fechasLlegada[pedido.id_pedido] === null}
						onClick={() => {
							setFechaLlegada(dispatch, pedido.id_pedido, fechasLlegada[pedido.id_pedido]);
							axios.post('http://localhost:3210/mailsender/enviarMail', {
								id_pedido: pedido.id_pedido,
								subject: 'Pedido enviado!',
								text: `Su pedido de ${pedido.cantidad} unidad/es del libro con ISBN ${
									pedido.isbn
								} ha sido despachado y llegará aproximadamente el ${dateToString(fechasLlegada[pedido.id_pedido])}.`
							});
						}}
					>
						Confirmar
					</button>
				</td>
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
						<th>Fecha entrega</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{pedidosPagados
						.filter(pedido => pedido.fecha_llegada === null)
						.map(pedido => (
							<FilaPedido key={pedido.id_pedido} pedido={pedido} />
						))}
				</tbody>
			</Table>
		</Fragment>
	);
}

export default PedidosPagados;

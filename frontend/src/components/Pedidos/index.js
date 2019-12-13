import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPedidosUsuario } from '../../actions/pedidoActions';
import { fetchLibros } from '../../actions/libroActions';
import { fetchPromociones } from '../../actions/promocionActions';
import { dateToString } from '../Common/utils';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function Pedidos() {
	const dispatch = useDispatch();
	const pedidosUsuario = useSelector(state => state.pedido.pedidos_usuario);
	const libros = useSelector(state => state.libros.items);
	const promociones = useSelector(state => state.promociones.items);
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	useEffect(() => {
		fetchPedidosUsuario(dispatch, usuarioActual.id_usuario);
		fetchLibros(dispatch);
		fetchPromociones(dispatch);
	}, []);

	const Fila = ({ pedido }) => {
		const pagarPedido = pedido => {
			let producto = [
				{
					id: pedido.id_pedido,
					quantity: pedido.cantidad,
					currency_id: 'ARS',
					unit_price: calcularPrecioFinal(pedido)
				}
			];

			const comprador = {
				name: usuarioActual.nombre,
				email: usuarioActual.mail
			};
			const config = {
				items: producto,
				payer: comprador,
				back_urls: {
					success: `http://localhost:3000/pago_pedido?id_pedido=${pedido.id_pedido}`,
					pending: 'http://localhost:3000/',
					failure: 'http://localhost:3000/'
				}
			};
			axios.post('http://localhost:3210/mercadopago/pagar', { ...config }).then(resp => {
				localStorage.setItem('checkoutID', resp.data.body.id); // seteamos el id de checkout para validarlo posteriormente en /checkout.
				document.location = resp.data.body.sandbox_init_point;
			});
		};

		const botonPedido = () => {
			if (!pedido.aceptado && !pedido.rechazado)
				return <span className='font-italic'>Pedido en espera de aprobación</span>;
			else if (pedido.rechazado) return <span className='font-italic'>Pedido rechazado</span>;
			else if (!pedido.pagado)
				return (
					<button type='button' className='btn btn-primary' onClick={() => pagarPedido(pedido)}>
						Pagar pedido
					</button>
				);
			else if (pedido.pagado)
				return (
					<button style={{ cursor: 'default' }} type='button' className='btn btn-success' disabled>
						Pagado
					</button>
				);
		};

		const calcularPrecioFinal = pedido => {
			const libroPedido = libros.find(libro => libro.isbn === pedido.isbn);
			const promoPedido = promociones.find(promo => promo.id_promocion === libroPedido.id_promocion);

			let precioLibro = libroPedido.precio;

			if (promociones && promoPedido) precioLibro = precioLibro - (precioLibro * promoPedido.descuento) / 100;

			return precioLibro * pedido.cantidad;
		};

		return (
			<tr>
				<td>{dateToString(pedido.fecha_pedido)}</td>
				<td>{pedido.fecha_llegada ? dateToString(pedido.fecha_llegada) : 'Pendiente'}</td>
				<td>{pedido.isbn}</td>
				<td>{pedido.cantidad}</td>
				<td>${calcularPrecioFinal(pedido)}</td>
				<td>{botonPedido()}</td>
			</tr>
		);
	};

	if (pedidosUsuario && pedidosUsuario.length)
		return (
			<div className='text-center'>
				<h1 className='mb-5'>Pedidos</h1>
				<Table className='col'>
					<thead>
						<tr>
							<th>Fecha pedido</th>
							<th>Fecha llegada</th>
							<th>ISBN</th>
							<th>Cantidad</th>
							<th>Precio final</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{pedidosUsuario.map(pedido => (
							<Fila pedido={pedido} key={pedido.id_pedido} />
						))}
					</tbody>
				</Table>
			</div>
		);
	else
		return (
			<div className='text-center'>
				<h1>No posee ningún pedido!</h1>
				<h4 className='font-weight-light font-italic'>Cuando realices pedidos aquí es donde aparecerán.</h4>
				<img
					className='my-5'
					src='https://library.kissclipart.com/20180925/yhw/kissclipart-icono-programacion-clipart-computer-icons-clip-art-ee6a30d3ae899386.png'
					alt='pedido'
					style={{ width: '150px' }}
				></img>
			</div>
		);
}

export default Pedidos;

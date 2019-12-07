import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getElementos, fetchCarritoActivo } from '../../actions/carritoActions';
import { fetchProductos } from '../../actions/productoActions';
import { fetchPromociones } from '../../actions/promocionActions';
import Fila from './Fila';

let Carrito = () => {
	const dispatch = useDispatch();
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const idCarritoActivo = useSelector(state => state.carrito.idCarritoActivo);
	const elementosCarrito = useSelector(state => state.carrito.items);
	const promociones = useSelector(state => state.promociones.items);
	const productos = useSelector(state => state.producto.items);

	// array que contendrá los productos con toda la información propia de cada producto
	// a esta información del producto se le suma la cantidad que figura en el carrito y el precio con descuento
	let productosCarrito = [];

	// elementosCarrito solo tiene el id_producto, necesitamos más información del producto.
	elementosCarrito.forEach(elemento => {
		const productosEnElCarrito = productos.filter(producto =>
			elementosCarrito.some(e => e.id_producto === producto.id_producto)
		);
		const productoCarrito = productosEnElCarrito.find(producto => producto.id_producto === elemento.id_producto);

		const idPromoProducto = productoCarrito.id_promocion;

		let precio = productoCarrito.precio;
		let precioConDescuento = productoCarrito.precio;

		if (idPromoProducto) {
			const promocion = promociones.find(promo => promo.id_promocion === idPromoProducto);
			const descuento = (precio * promocion.descuento) / 100;
			precioConDescuento = precio - descuento;
		}
		// guardamos el producto que ahora posee la cantidad en la que figura en el carrito y su precio con el descuento aplicado (si posee)
		productosCarrito.push({
			...productoCarrito,
			cantidad: elemento.cantidad,
			precio_descuento: precioConDescuento
		});
	});

	const calcularSubTotal = () => {
		let subTotal = 0;

		productosCarrito.forEach(producto => {
			subTotal += producto.precio_descuento * producto.cantidad;
		});
		return subTotal;
	};

	const calcularImpuestos = () => {
		return calcularSubTotal() * 0.21;
	};

	const calcularTotal = () => {
		return calcularSubTotal() + calcularImpuestos();
	};

	const pagarConMercadoPago = () => {
		let productos = productosCarrito.map(producto => {
			return {
				id: producto.id_producto,
				title: producto.titulo,
				quantity: producto.cantidad,
				currency_id: 'ARS',
				unit_price: producto.precio
			};
		});

		// agregamos el IVA como si fuera un producto más.
		productos.concat({
			id: 999, // id arbitrario (solo se va a romper si compra más de 1000 elementos)
			title: 'IVA',
			quantity: 1,
			currency_id: 'ARS',
			unit_price: calcularImpuestos()
		});

		const comprador = {
			name: usuarioActual.nombre,
			email: usuarioActual.mail
		};

		axios.post('http://localhost:3210/mercadopago/pagar', { items: productos, payer: comprador }).then(resp => {
			localStorage.setItem('checkoutID', resp.data.body.id); // seteamos el id de checkout para validarlo posteriormente en /checkout.
			document.location = resp.data.body.sandbox_init_point;
		});
	};

	useEffect(() => {
		fetchCarritoActivo(dispatch, usuarioActual.id_usuario).then(() => {
			getElementos(dispatch, idCarritoActivo);
		});
		fetchProductos(dispatch);
		fetchPromociones(dispatch);
	}, [idCarritoActivo, usuarioActual]);

	if (elementosCarrito && elementosCarrito.length)
		return (
			<div className='row'>
				<div className='col-lg-12 p-5 bg-white rounded shadow-sm mb-5'>
					<div className='table-responsive'>
						<table className='table'>
							<thead>
								<tr>
									<th scope='col' className='border-0 bg-light'>
										<div className='p-2 px-3 text-center'>PRODUCTO</div>
									</th>
									<th scope='col' className='border-0 bg-light'>
										<div className='py-2 text-center'>PRECIO</div>
									</th>
									<th scope='col' className='border-0 bg-light'>
										<div className='py-2 text-center'>CANTIDAD</div>
									</th>
									<th scope='col' className='border-0 bg-light'>
										<div className='py-2 text-center'>REMOVER</div>
									</th>
								</tr>
							</thead>
							<tbody>
								{productosCarrito.map(producto => (
									<Fila producto={producto} key={producto.id_producto} />
								))}
							</tbody>
						</table>
					</div>

					<div className='col-lg-12'>
						<div className='bg-light rounded-pill px-4 py-3 text-center '>
							<h3 className='font-weight-bold'>RESUMEN DE COMPRA</h3>
						</div>
						<div className='p-4'>
							<ul className='list-unstyled mb-4'>
								<li className='d-flex justify-content-between py-3 border-bottom'>
									<strong className='text-muted'>Subtotal compra </strong>
									<strong>${calcularSubTotal()}</strong>
								</li>
								<li className='d-flex justify-content-between py-3 border-bottom'>
									<strong className='text-muted'>Impuestos</strong>
									<strong>${calcularImpuestos()}</strong>
								</li>
								<li className='d-flex justify-content-between py-3 border-bottom'>
									<strong className='text-muted'>Total</strong>
									<h5 className='font-weight-bold'>${calcularTotal()}</h5>
								</li>
							</ul>
							<a className='btn btn-dark rounded-pill py-2 btn-block' onClick={pagarConMercadoPago}>
								<span className='text-white'>Proceder al checkout</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	else
		return (
			<div className='text-center'>
				<h1>No posee ningún elemento en el carrito!</h1>
				<img
					className='my-5'
					src='https://www.seamwork.com/assets/cart-empty-0642206d80ee53cff984a7bcd293d372e084e371597f8cae290b57283e0f3d8c.png'
					alt='carrito'
				></img>
			</div>
		);
};

export default Carrito;

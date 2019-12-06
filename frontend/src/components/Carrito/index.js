import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getElementos, fetchCarritoActivo } from '../../actions/carritoActions';
import { fetchProductos } from '../../actions/productoActions';
import Fila from './Fila';

let Carrito = () => {
	const dispatch = useDispatch();
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const idCarritoActivo = useSelector(state => state.carrito.idCarritoActivo);
	const elementosCarrito = useSelector(state => state.carrito.items);
	const productos = useSelector(state => state.producto.items);

	let productosCarritoConCantidad = [];

	elementosCarrito.forEach(elemento => {
		const productosEnElCarrito = productos.filter(producto =>
			elementosCarrito.some(e => e.id_producto === producto.id_producto)
		);
		const productoCarrito = productosEnElCarrito.find(producto => producto.id_producto === elemento.id_producto);
		productosCarritoConCantidad.push({ ...productoCarrito, cantidad: elemento.cantidad });
	});

	const calcularSubTotal = () => {
		let subTotal = 0;
		productosCarritoConCantidad.forEach(producto => (subTotal += producto.precio * producto.cantidad));
		return subTotal;
	};

	const calcularImpuestos = () => {
		return calcularSubTotal() * 0.21;
	};

	const calcularTotal = () => {
		return calcularSubTotal() + calcularImpuestos();
	};

	useEffect(() => {
		fetchCarritoActivo(dispatch, usuarioActual.id_usuario).then(() => {
			getElementos(dispatch, idCarritoActivo);
		});
		fetchProductos(dispatch);
	}, [idCarritoActivo, usuarioActual]);

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
							{productosCarritoConCantidad.map(producto => (
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
						<a className='btn btn-dark rounded-pill py-2 btn-block'>
							<span className='text-white'>Proceder al checkout</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Carrito;

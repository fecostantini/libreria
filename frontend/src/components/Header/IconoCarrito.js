import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getElementos, fetchCarritoActivo } from '../../actions/carritoActions';

let IconoCarrito = () => {
	const dispatch = useDispatch();

	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const elementosCarrito = useSelector(state => state.carrito.items);
	const idCarritoActivo = useSelector(state => state.carrito.idCarritoActivo);

	const [cantidadProductos, setCantidadProductos] = useState(0);

	useEffect(() => {
		if (usuarioActual) {
			fetchCarritoActivo(dispatch, usuarioActual.id_usuario).then(() => {
				getElementos(dispatch, idCarritoActivo);
			});
		}
	}, [idCarritoActivo, usuarioActual]);

	useEffect(() => {
		let cantidadTotal = 0;
		elementosCarrito.forEach(elemento => (cantidadTotal += elemento.cantidad));
		setCantidadProductos(cantidadTotal);
	}, [elementosCarrito.length]);

	return (
		<Fragment>
			<i className='fa fa-shopping-cart'></i> <span className='badge badge-light'>{cantidadProductos}</span>
		</Fragment>
	);
};

export default IconoCarrito;

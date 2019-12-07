import React from 'react';

import { Spinner } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { realizarCheckout } from '../../actions/carritoActions';
import { useSelector, useDispatch } from 'react-redux';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

let RealizarCheckout = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const query = useQuery();
	const idCarritoActivo = useSelector(state => state.carrito.idCarritoActivo);
	const idUsuarioActivo = JSON.parse(localStorage.getItem('usuarioActual')).id_usuario;

	const transaccionAceptada = localStorage.getItem('checkoutID') === query.get('preference_id');

	if (transaccionAceptada && idCarritoActivo) {
		localStorage.removeItem('checkoutID');
		realizarCheckout(dispatch, idCarritoActivo, idUsuarioActivo).then(() => {
			history.push('/');
		});
	}

	return (
		<div className='text-center'>
			<Spinner animation='border' />
			<h1>Procesando pago...</h1>
		</div>
	);
};

export default RealizarCheckout;

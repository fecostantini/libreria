import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { pagarPedido } from '../../actions/pedidoActions';
import { useDispatch } from 'react-redux';
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

let PagarPedido = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const query = useQuery();

	const transaccionAceptada = localStorage.getItem('checkoutID') === query.get('preference_id');
	const idPedidoPagado = parseInt(query.get('id_pedido'), 10);

	if (transaccionAceptada && idPedidoPagado) {
		localStorage.removeItem('checkoutID');
		pagarPedido(dispatch, idPedidoPagado).then(() => {
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

export default PagarPedido;

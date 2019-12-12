import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getComprasUsuario } from '../../actions/carritoActions';
import { Table } from 'react-bootstrap';
import { dateToString, ordenar } from '../Common/utils';

function Compras() {
	const dispatch = useDispatch();
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const comprasUsuario = useSelector(state => state.carrito.compras);

	useEffect(() => {
		getComprasUsuario(dispatch, usuarioActual.id_usuario);
	}, [usuarioActual]);

	const Fila = ({ compra }) => (
		<tr>
			<td>{dateToString(compra.fecha_compra)}</td>
			<td>${compra.precio_total}</td>
		</tr>
	);

	if (comprasUsuario && comprasUsuario.length)
		return (
			<div className='col'>
				<div className='text-center mb-5'>
					<h1>Hisorial de compras</h1>
				</div>
				<div className='row'>
					<Table className='col' striped bordered hover>
						<thead>
							<tr>
								<th>Fecha</th>
								<th>Precio</th>
							</tr>
						</thead>
						<tbody>
							{comprasUsuario.sort(ordenar('fecha_compra')).map(compra => (
								<Fila compra={compra} />
							))}
						</tbody>
					</Table>
				</div>
			</div>
		);
	else
		return (
			<div className='text-center'>
				<h1>No posee ninguna compra!</h1>
				<h4 className='font-weight-light font-italic'>Cuando realices compras aquí es donde aparecerán.</h4>
				<img className='my-5' src='https://static.thenounproject.com/png/91330-200.png' alt='carrito'></img>
			</div>
		);
}
export default Compras;

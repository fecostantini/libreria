import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { fetchProductos } from '../../../../actions/productoActions';

import { ordenar } from '../../../Common/utils';

const BajaProducto = () => {
	const dispatch = useDispatch();
	const productos = useSelector(state => state.producto.items);

	const FilaProducto = ({ producto }) => {
		const eliminarProducto = () => {
			console.log(`Borrando producto con id ${producto.id_producto}...`);
			// TODO: Llamar action que borre el producto.
		};

		return (
			<tr>
				<td>{producto.titulo}</td>
				<td>${producto.precio}</td>
				<td>
					<button type='button' className='close' onClick={eliminarProducto}>
						<span className='text-danger'>&times;</span>
					</button>
				</td>
			</tr>
		);
	};
	// cargar los autores y las categorias cuando cargue la página
	useEffect(() => {
		fetchProductos(dispatch);
	}, []);

	return (
		<Table responsive className='mt-3'>
			<thead>
				<tr>
					<th>Titulo</th>
					<th>Precio</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{productos.sort(ordenar('titulo')).map(producto => (
					<FilaProducto key={producto.id_producto} producto={producto} />
				))}
			</tbody>
		</Table>
	);
};

export default BajaProducto;

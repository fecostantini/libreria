import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import { fetchProductos } from '../../../../actions/productoActions';

import { ordenar } from '../../../Common/utils';

const BajaProducto = () => {
	const dispatch = useDispatch();
	const productos = useSelector(state => state.producto.items);
	const [campoAOrdenar, setCampoAOrdenar] = useState('titulo');
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
		<Fragment>
			<Container className='my-4'>
				Ordenar por:{' '}
				<select onChange={e => setCampoAOrdenar(e.target.value)}>
					{['titulo', 'precio'].map(nombreCampo => (
						<option value={nombreCampo} key={nombreCampo}>
							{nombreCampo}
						</option>
					))}
				</select>
			</Container>
			<Table responsive>
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Precio</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{productos.sort(ordenar(campoAOrdenar)).map(producto => (
						<FilaProducto key={producto.id_producto} producto={producto} />
					))}
				</tbody>
			</Table>
		</Fragment>
	);
};

export default BajaProducto;

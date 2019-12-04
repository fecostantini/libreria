import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import { fetchProductos, deleteProducto } from '../../../../actions/productoActions';

import { ordenar } from '../../../Common/utils';

const BajaProducto = () => {
	const dispatch = useDispatch();
	const productos = useSelector(state => state.producto.items);

	const [campoAOrdenar, setCampoAOrdenar] = useState('titulo');
	const [ordenCreciente, setOrdenCreciente] = useState(false);

	const FilaProducto = ({ producto }) => {
		const eliminarProducto = () => {
			console.log(`Borrando producto con id ${producto.id_producto}...`);
			deleteProducto(dispatch, producto.id_producto).then(() => console.log('borra3'));
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
				</select>{' '}
				<label>
					<input
						type='checkbox'
						checked={ordenCreciente}
						onChange={e => {
							setOrdenCreciente(e.target.checked);
						}}
					/>{' '}
					Orden creciente
				</label>
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
					{productos.sort(ordenar(campoAOrdenar, ordenCreciente)).map(producto => (
						<FilaProducto key={producto.id_producto} producto={producto} />
					))}
				</tbody>
			</Table>
		</Fragment>
	);
};

export default BajaProducto;

import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Container } from 'react-bootstrap';
import { fetchProductos, deleteProducto } from '../../../../actions/productoActions';
import { fetchFotocopias } from '../../../../actions/fotocopiaActions';

import { ordenar } from '../../../Common/utils';

const BajaProducto = () => {
	const dispatch = useDispatch();
	const productos = useSelector(state => state.producto.items);
	const fotocopias = useSelector(state => state.fotocopias.items);
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

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
		fetchFotocopias(dispatch);
	}, []);

	const filasProducto = () => {
		if (usuarioActual.rol === 'ADMIN')
			// es admin, puede borrar cualquier producto
			return productos
				.sort(ordenar(campoAOrdenar, ordenCreciente))
				.map(producto => <FilaProducto key={producto.id_producto} producto={producto} />);
		else {
			// como no es admin solo puede borras las fotocopias que el usuario creó
			const productosUsuario = productos.filter(producto =>
				fotocopias.some(
					fotocopia =>
						fotocopia.id_producto === producto.id_producto && fotocopia.id_usuario === usuarioActual.id_usuario
				)
			);
			return productosUsuario
				.sort(ordenar(campoAOrdenar, ordenCreciente))
				.map(producto => <FilaProducto key={producto.id_producto} producto={producto} />);
		}
	};
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
						<th>Título</th>
						<th>Precio</th>
						<th></th>
					</tr>
				</thead>
				<tbody>{filasProducto()}</tbody>
			</Table>
		</Fragment>
	);
};

export default BajaProducto;

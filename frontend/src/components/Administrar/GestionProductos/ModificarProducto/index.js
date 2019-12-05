import React, { useEffect, useState } from 'react';

import InputFormulario from '../AltaProducto/InputFormulario';
import Item from '../../../Common/Item';

import { ordenar } from '../../../Common/utils';

import { Container } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { fetchProductos, fetchProducto, updateProducto } from '../../../../actions/productoActions';
import { fetchAutores } from '../../../../actions/autorActions';
import { fetchCategorias } from '../../../../actions/categoriaActions';
import { fetchSagas } from '../../../../actions/sagaActions';
import { fetchEditoriales } from '../../../../actions/editorialActions';
import { fetchPromociones } from '../../../../actions/promocionActions';

const ModificarProducto = () => {
	const dispatch = useDispatch();
	const producto = useSelector(state => state.producto.productoActual);
	const productos = useSelector(state => state.producto.items);

	const todasLasEditoriales = useSelector(state => state.editoriales.items);
	const todosLosAutores = useSelector(state => state.autores.items);
	const todasLasCategorias = useSelector(state => state.categorias.items);
	const todasLasSagas = useSelector(state => state.sagas.items);
	const todasLasPromociones = useSelector(state => state.promociones.items);

	const [idProductoAModificar, setIdProductoAModificar] = useState(null);

	useEffect(() => {
		fetchProductos(dispatch);
		fetchAutores(dispatch);
		fetchCategorias(dispatch);
		fetchSagas(dispatch);
		fetchEditoriales(dispatch);
		fetchPromociones(dispatch);
	}, []);

	useEffect(() => {
		fetchProducto(dispatch, idProductoAModificar);
	}, [idProductoAModificar]);

	const modificarProducto = e => {};

	// Agrega al producto algún elemento que después se visualzará como una nueva etiqueta azul en la vista
	const agregarElemento = (id, nombreElemento) => {
		const idElemento = parseInt(id, 10);
		var elemento;
		var elementoYaAgregado;
		if (nombreElemento === 'autores') {
			elemento = todosLosAutores.find(autor => autor.id_autor === idElemento);
			elementoYaAgregado = producto.autores.includes(elemento);
		} else if (nombreElemento === 'categorias') {
			elemento = todasLasCategorias.find(categoria => categoria.id_categoria === idElemento);
			elementoYaAgregado = producto.categorias.includes(elemento);
		}

		if (!elementoYaAgregado && elemento)
			updateProducto(dispatch, {
				...producto,
				[nombreElemento]: [...producto[nombreElemento], elemento],

				[`ids_${nombreElemento}`]: [...producto[`ids_${nombreElemento}`], idElemento]
			});
	};

	// Borra algun elemento del producto que después se visualzará como una etiqueta azul menos en la vista
	const borrarElemento = (id, nombreElemento) => {
		var elementosSinElEliminado;
		var idsElementosSinElEliminado;

		if (nombreElemento === 'autores') {
			elementosSinElEliminado = producto.autores.filter(autor => autor.id_autor !== id);
			idsElementosSinElEliminado = producto.ids_autores.filter(id_autor => id_autor !== id);
		} else if (nombreElemento === 'categorias') {
			elementosSinElEliminado = producto.categorias.filter(categoria => categoria.id_categoria !== id);
			idsElementosSinElEliminado = producto.ids_categorias.filter(id_categoria => id_categoria !== id);
		}

		updateProducto(dispatch, {
			...producto,
			[nombreElemento]: [...elementosSinElEliminado],
			[`ids_${nombreElemento}`]: [...idsElementosSinElEliminado]
		});
	};

	const handleChange = e => {
		let name = e.target.name;
		let value = parseInt(e.target.value, 10);

		if (['id_saga', 'id_editorial', 'id_promocion'].includes(name))
			updateProducto(dispatch, {
				...producto,
				[name]: value ? value : null
			});
		else agregarElemento(value, name);
	};
	const formulario = (
		<form onSubmit={modificarProducto} id='formulario-producto'>
			<div className='form-row'>
				{[
					{
						titulo: 'Titulo',
						type: 'text',
						name: 'titulo',
						containerClass: 'col-6'
					},
					{
						titulo: 'Stock',
						type: 'number',
						name: 'stock',
						containerClass: 'col-3'
					},
					{
						titulo: 'Precio',
						type: 'number',
						name: 'precio',
						containerClass: 'col-3'
					}
				].map(e => (
					<InputFormulario
						key={e.titulo}
						titulo={e.titulo}
						type={e.type}
						name={e.name}
						containterClass={e.containerClass}
					/>
				))}
			</div>
			<div className='form-group mt-3'>
				<label>Promoción </label>{' '}
				<select onChange={handleChange} defaultValue={''} name='id_promocion' value={producto.id_promocion}>
					{todasLasPromociones
						.concat({ nombre_promocion: 'SIN PROMOCIÓN', id_promocion: 0, descuento: 0 })
						.sort(ordenar('descuento'))
						.map(promocion => (
							<option key={promocion.id_promocion} value={promocion.id_promocion}>
								{`${promocion.nombre_promocion} [${promocion.descuento}% OFF]`}
							</option>
						))}
				</select>
			</div>

			<input
				type='submit'
				className='font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3'
				value='Guardar cambios'
			/>
		</form>
	);
	return (
		<Container>
			<div className='col'>
				<h1 className='text-center mt-4'>Modificar un producto</h1>
				<div className='text-center my-3'>
					<select onChange={e => setIdProductoAModificar(parseInt(e.target.value, 10))}>
						{productos
							.concat({ titulo: '-SELECCIONE UN PRODUCTO-', id_producto: 0 })
							.sort(ordenar('titulo'))
							.map(producto => (
								<option value={producto.id_producto} key={producto.id_producto}>
									{producto.titulo}
								</option>
							))}
					</select>
				</div>
				{/*error.activo ? <Error mensaje={error.mensaje} /> : null*/}
			</div>

			{producto && idProductoAModificar ? formulario : null}
		</Container>
	);
};

export default ModificarProducto;

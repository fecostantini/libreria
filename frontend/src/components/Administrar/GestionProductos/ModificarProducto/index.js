import React, { useEffect, useState, Fragment } from 'react';

import InputFormulario from '../AltaProducto/InputFormulario';
import Error from '../../../Common/Error';
import Item from '../../../Common/Item';

import { ordenar, swalConfig } from '../../../Common/utils';

import { Container } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { fetchProductos, fetchProducto, updateProducto, updateProductoBBDD } from '../../../../actions/productoActions';
import { fetchAutores } from '../../../../actions/autorActions';
import { fetchCategorias } from '../../../../actions/categoriaActions';
import { fetchSagas } from '../../../../actions/sagaActions';
import { fetchEditoriales } from '../../../../actions/editorialActions';
import { fetchPromociones } from '../../../../actions/promocionActions';
import { fetchFotocopias } from '../../../../actions/fotocopiaActions';

import Swal from 'sweetalert2';
import estados from '../../../../estados';

const ModificarProducto = () => {
	const dispatch = useDispatch();
	const producto = useSelector(state => state.producto.productoActual);
	const productos = useSelector(state => state.producto.items);

	const todasLasEditoriales = useSelector(state => state.editoriales.items);
	const todosLosAutores = useSelector(state => state.autores.items);
	const todasLasCategorias = useSelector(state => state.categorias.items);
	const todasLasSagas = useSelector(state => state.sagas.items);
	const todasLasPromociones = useSelector(state => state.promociones.items);

	const fotocopias = useSelector(state => state.fotocopias.items);
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	const [idProductoAModificar, setIdProductoAModificar] = useState(null);
	const [autores, setAutores] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [error, setError] = useState({ activo: false, mensaje: '' }); // error en el formulario de producto

	const [mostrarAlerta, setMostrarAlerta] = useState(false);
	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);

	useEffect(() => {
		fetchProductos(dispatch);
		fetchAutores(dispatch);
		fetchCategorias(dispatch);
		fetchSagas(dispatch);
		fetchEditoriales(dispatch);
		fetchPromociones(dispatch);
		fetchFotocopias(dispatch);
	}, []);

	useEffect(() => {
		// solo queremos mostrar el error si mostrarAlerta es verdadero
		if (!mostrarAlerta) return;

		const swalConfigNueva = {
			...swalConfig,
			icon: statusUltimaPeticion === estados.ACTUALIZADO ? 'success' : 'error'
		};

		if (statusUltimaPeticion === estados.ACTUALIZADO) swalConfigNueva.title = 'Se actualizó el producto con éxito';
		else if (statusUltimaPeticion === estados.CONEXION_FALLIDA)
			swalConfigNueva.title = 'Falló la conexión a la Base de Datos';

		setMostrarAlerta(false);
		Swal.fire(swalConfigNueva);
	}, [mostrarAlerta]);

	useEffect(() => {
		fetchProducto(dispatch, idProductoAModificar);
		// cuando cambia el producto a modificar se busca la información del mismo
	}, [idProductoAModificar]);

	useEffect(() => {
		let autoresBuffer = [];
		let categoriasBuffer = [];

		producto.autores.forEach(nombreAutor => {
			console.log(nombreAutor);
			const autor = todosLosAutores.find(autor => autor.autor === nombreAutor);
			if (autor) autoresBuffer.push(autor);
		});

		producto.categorias.forEach(nombreCategoria => {
			const categoria = todasLasCategorias.find(categoria => categoria.nombre_categoria === nombreCategoria);
			console.log(categoria);
			if (categoria) categoriasBuffer.push(categoria);
		});

		setAutores(autoresBuffer);
		setCategorias(categoriasBuffer);
		// que se actualicen los arrays cuando cambia el producto a modificar
	}, [idProductoAModificar, producto.autores, producto.categorias]);

	const modificarProducto = () => {
		// no chequeamos el descuento porque puede no tener
		const informacionCompartidaSeteada = producto.titulo && producto.stock && producto.precio;

		if (producto.isbn) {
			const informacionLibroSeteada =
				producto.descripcion &&
				producto.isbn &&
				producto.idioma &&
				producto.edicion &&
				producto.nombre_editorial &&
				autores.length &&
				categorias.length;

			if (!informacionCompartidaSeteada || !informacionLibroSeteada) {
				setError({
					activo: true,
					mensaje: 'Debe rellenar todos los campos del libro'
				});
				return;
			}
		} else if (producto.id_fotocopia) {
			const informacionFotocopiaSeteada = producto.descripcion !== '';
			if (!informacionFotocopiaSeteada) {
				setError({
					activo: true,
					mensaje: 'Debe ingresar todos los campos de la fotocopia'
				});
				return;
			}
		}

		const actualizarProducto = () => {
			const editorial = todasLasEditoriales.find(editorial => editorial.nombre_editorial === producto.nombre_editorial);
			const ids_autores = autores ? autores.map(autor => autor.id_autor) : [];
			const ids_categorias = categorias ? categorias.map(categoria => categoria.id_categoria) : [];
			const productoFormateado = {
				...producto,
				isbn: producto.isbn ? producto.isbn : null,
				id_editorial: editorial ? editorial.id_editorial : null,
				id_saga: producto.id_saga && producto.id_saga > 0 ? producto.id_saga : null,
				ids_autores,
				ids_categorias
			};
			updateProductoBBDD(dispatch, productoFormateado).then(() => {
				setMostrarAlerta(true);
			});
			document.getElementById('select-producto').value = '0';
			setIdProductoAModificar(0);
			setError({ activo: false });
		};
		actualizarProducto();
	};

	// Agrega al producto algún elemento que después se visualzará como una nueva etiqueta azul en la vista
	const agregarElemento = (id, nombreElemento) => {
		const idElemento = parseInt(id, 10);
		var elemento;
		var elementoYaAgregado;

		if (nombreElemento === 'autores') {
			elemento = todosLosAutores.find(autor => autor.id_autor === idElemento);
			elementoYaAgregado = autores.includes(elemento);
			if (!elementoYaAgregado && elemento) setAutores([...autores, elemento]);
		} else if (nombreElemento === 'categorias') {
			elemento = todasLasCategorias.find(categoria => categoria.id_categoria === idElemento);
			elementoYaAgregado = categorias.includes(elemento);
			if (!elementoYaAgregado && elemento) setCategorias([...categorias, elemento]);
		}
	};

	// Borra algun elemento del producto que después se visualzará como una etiqueta azul menos en la vista
	const borrarElemento = (id, nombreElemento) => {
		if (nombreElemento === 'autores') {
			const autoresSinElEliminado = autores.filter(autor => autor.id_autor !== id);
			setAutores(autoresSinElEliminado);
		} else if (nombreElemento === 'categorias') {
			const categoriasSinLaEliminada = categorias.filter(categoria => categoria.id_categoria !== id);
			setCategorias(categoriasSinLaEliminada);
		}
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

	let formularioRestante = () => {
		// Ambos poseen una descripción, reutilizamos esta porción.
		const inputDescripcion = () =>
			[{ titulo: 'Descripción', type: 'textarea', name: 'descripcion' }].map(e => (
				<InputFormulario key={e.titulo} titulo={e.titulo} type={e.type} name={e.name} containterClass='form-group' />
			));

		if (producto.isbn) {
			return (
				<Fragment>
					{inputDescripcion()}
					<div className='form-row'>
						{[
							{ titulo: 'Idioma', type: 'text', name: 'idioma' },
							{ titulo: 'Edicion', type: 'text', name: 'edicion' }
						].map(e => (
							<InputFormulario key={e.titulo} titulo={e.titulo} type={e.type} name={e.name} containterClass='col-6' />
						))}
					</div>

					<hr className='mt-4' />
					<div className='form-row'>
						<div className='col-lg-9 col-sm-12'>
							<label>Editorial</label>{' '}
							<select
								onChange={handleChange}
								name='id_editorial'
								value={
									producto.nombre_editorial
										? todasLasEditoriales.find(editorial => editorial.nombre_editorial === producto.nombre_editorial)
												.id_editorial
										: ''
								}
							>
								{todasLasEditoriales
									.concat({ nombre_editorial: '-SELECCIONE UNA EDITORIAL -', id_editorial: 0 })
									.sort(ordenar('nombre_editorial'))
									.map(editorial => (
										<option value={editorial.id_editorial} key={editorial.id_editorial}>
											{editorial.nombre_editorial}
										</option>
									))}
							</select>
						</div>{' '}
					</div>

					<hr className='mt-4' />
					<div className='form-row'>
						<div className='col-lg-9 col-sm-12'>
							<label>Autores</label>{' '}
							<select onChange={handleChange} name='autores'>
								{todosLosAutores
									.concat({ autor: '-SELECCIONE LOS AUTORES-', id_autor: 0 })
									.sort(ordenar('autor'))
									.map(autor => (
										<option value={autor.id_autor} key={autor.id_autor}>
											{autor.autor}
										</option>
									))}
							</select>
						</div>{' '}
					</div>
					<div className='row'>
						{autores.map(autor =>
							autor ? (
								<Item
									titulo={autor.autor}
									id={autor.id_autor}
									name='autores'
									borrarElemento={borrarElemento}
									key={autor.id_autor}
								/>
							) : null
						)}
					</div>
					<hr className='mt-4' />
					<div className='form-row'>
						<div className='col-lg-9 col-sm-12'>
							<label>Categorías</label>{' '}
							<select onChange={handleChange} name='categorias'>
								{todasLasCategorias
									.concat({ nombre_categoria: '-SELECCIONE LAS CATEGORIAS -', id_categoria: 0 })
									.sort(ordenar('nombre_categoria'))
									.map(categoria => (
										<option value={categoria.id_categoria} key={categoria.id_categoria}>
											{categoria.nombre_categoria}
										</option>
									))}
							</select>
						</div>{' '}
					</div>
					<div className='row mt-3'>
						{categorias.map(categoria =>
							categoria ? (
								<Item
									titulo={categoria.nombre_categoria}
									id={categoria.id_categoria}
									name='categorias'
									borrarElemento={borrarElemento}
									key={categoria.id_categoria}
								/>
							) : null
						)}
					</div>
					<hr className='mt-4' />
					<div className='form-row'>
						<div className='col-lg-9 col-sm-12'>
							<label>Saga</label>{' '}
							<select onChange={handleChange} name='id_saga' value={producto.id_saga ? producto.id_saga : 0}>
								{todasLasSagas
									.concat({ nombre_saga: '-NO PERTENECE A NINGUNA-', id_saga: 0 })
									.sort(ordenar('nombre_saga'))
									.map(saga => (
										<option value={saga.id_saga} key={saga.id_saga}>
											{saga.nombre_saga}
										</option>
									))}
							</select>{' '}
						</div>
					</div>
					<hr className='mt-4' />
					<div className='form-row'>
						{[{ titulo: 'URL Imagen', type: 'text', name: 'imagen' }].map(e => (
							<InputFormulario key={e.titulo} titulo={e.titulo} type={e.type} name={e.name} containterClass='col-12' />
						))}
					</div>
				</Fragment>
			);
		} else if (producto.id_fotocopia) return <Fragment>{inputDescripcion()}</Fragment>;
		else return null;
	};

	const formulario = (
		<form id='formulario-producto' onSubmit={e => e.preventDefault()}>
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
				<select onChange={handleChange} value={producto.id_promocion ? producto.id_promocion : ''} name='id_promocion'>
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
			{formularioRestante()}
			<input
				type='submit'
				className='font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3'
				value='Guardar cambios'
				onClick={modificarProducto}
			/>
		</form>
	);
	const selects = () => {
		if (usuarioActual.rol === 'ADMIN')
			// es un admin, puede modificar todo.
			return productos
				.concat({ titulo: '-SELECCIONE UN PRODUCTO-', id_producto: 0 })
				.sort(ordenar('titulo'))
				.map(producto => (
					<option value={producto.id_producto} key={producto.id_producto}>
						{producto.titulo}
					</option>
				));
		else {
			// solo puede modificar sus fotocopias si es un usuario no administrador
			const productosUsuario = productos.filter(producto =>
				fotocopias.some(
					fotocopia =>
						fotocopia.id_producto === producto.id_producto && fotocopia.id_usuario === usuarioActual.id_usuario
				)
			);
			return productosUsuario
				.concat({ titulo: '-SELECCIONE UN PRODUCTO-', id_producto: 0 })
				.sort(ordenar('titulo'))
				.map(producto => (
					<option value={producto.id_producto} key={producto.id_producto}>
						{producto.titulo}
					</option>
				));
		}
	};
	return (
		<Container>
			<div className='col'>
				<h1 className='text-center mt-4'>Modificar un producto</h1>
				<div className='text-center my-3'>
					<select onChange={e => setIdProductoAModificar(parseInt(e.target.value, 10))} id='select-producto'>
						{selects()}
					</select>
				</div>
				{error.activo ? <Error mensaje={error.mensaje} /> : null}
			</div>

			{producto && idProductoAModificar ? formulario : null}
		</Container>
	);
};

export default ModificarProducto;

import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';

import Error from '../../../Common/Error';
import Item from '../../../Common/Item';
import { ordenar, swalConfig } from '../../../Common/utils';

import FormularioNuevoAutor from './FormularioNuevoAutor';
import FormularioNuevaCategoria from './FormularioNuevaCategoria';
import FormularioNuevaSaga from './FormularioNuevaSaga';
import FormularioNuevaEditorial from './FormularioNuevaEditorial';
import InputFormulario from './InputFormulario';

import { estados } from '../../../Common/utils';
import { fetchAutores } from '../../../../actions/autorActions';
import { fetchCategorias } from '../../../../actions/categoriaActions';
import { fetchSagas } from '../../../../actions/sagaActions';
import { fetchEditoriales } from '../../../../actions/editorialActions';
import { fetchPromociones } from '../../../../actions/promocionActions';
import { updateProducto, createProducto, resetProducto } from '../../../../actions/productoActions';
import { useSelector, useDispatch } from 'react-redux';

const tiposProducto = {
	FOTOCOPIA: 'FOTOCOPIA',
	LIBRO: 'LIBRO'
};

const AltaProducto = () => {
	const dispatch = useDispatch();

	// redux
	const producto = useSelector(state => state.producto.productoActual);
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	const todasLasEditoriales = useSelector(state => state.editoriales.items);
	const todosLosAutores = useSelector(state => state.autores.items);
	const todasLasCategorias = useSelector(state => state.categorias.items);
	const todasLasSagas = useSelector(state => state.sagas.items);
	const todasLasPromociones = useSelector(state => state.promociones.items);

	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);

	const [mostrarAlerta, setMostrarAlerta] = useState(false);
	const [error, setError] = useState({ activo: false, mensaje: '' }); // error en el formulario de producto
	const [tipoProducto, setTipoProducto] = useState(''); // FOTOCOPIA o LIBRO

	// determinan si se muestran o no los sub-formularios
	const [formularioNuevoAutor, setFormularioNuevoAutor] = useState(false);
	const [formularioNuevaCategoria, setFormularioNuevaCategoria] = useState(false);
	const [formularioNuevaSaga, setFormularioNuevaSaga] = useState(false);
	const [formularioNuevaEditorial, setFormularioNuevaEditorial] = useState(false);

	// cargar los autores, categorias, sagas, editoriales y promociones cuando cargue la página, también resetear el estado de producto.
	useEffect(() => {
		fetchAutores(dispatch);
		fetchCategorias(dispatch);
		fetchSagas(dispatch);
		fetchEditoriales(dispatch);
		fetchPromociones(dispatch);
		resetProducto(dispatch);
	}, []);

	useEffect(() => {
		if (usuarioActual.rol !== 'ADMIN') setTipoProducto(tiposProducto.FOTOCOPIA);
	}, [usuarioActual]);

	useEffect(() => {
		// solo queremos mostrar el error si mostrarAlerta es verdadero
		if (!mostrarAlerta) return;

		const swalConfigNueva = {
			...swalConfig,
			icon: statusUltimaPeticion === estados.CREADO || statusUltimaPeticion === estados.EXITO ? 'success' : 'error'
		};

		const cerrarFormularios = () => {
			setFormularioNuevoAutor(false);
			setFormularioNuevaCategoria(false);
			setFormularioNuevaSaga(false);
			setFormularioNuevaEditorial(false);
		};

		if (statusUltimaPeticion === estados.CREADO) {
			swalConfigNueva.title = 'La creación se realizó con éxito!';
			cerrarFormularios();
		} else if (statusUltimaPeticion === estados.YA_EXISTE)
			swalConfigNueva.title = 'El elemento que desea crear ya existe';
		else if (statusUltimaPeticion === estados.CONEXION_FALLIDA)
			swalConfigNueva.title = 'Falló la conexión a la Base de Datos';
		else if (statusUltimaPeticion === estados.EXITO) swalConfigNueva.title = 'Se envió el formulario con éxito!';

		setMostrarAlerta(false);
		Swal.fire(swalConfigNueva);
	}, [mostrarAlerta]);

	const enviarFormulario = tipoProducto => {
		let productoAEnviar;
		if (tipoProducto === tiposProducto.FOTOCOPIA) {
			console.log('creando nueva fotocopia..');
			productoAEnviar = { ...producto, isbn: null };
		} else if (tipoProducto === tiposProducto.LIBRO) {
			console.log('creando nuevo libro..');
			productoAEnviar = { ...producto };
		}

		createProducto(dispatch, { ...productoAEnviar, id_usuario: usuarioActual.id_usuario }).then(() => {
			setMostrarAlerta(true);
			setError({ activo: false });
			resetProducto(dispatch).then(() => {
				document.getElementById('formulario-producto').reset();
				if (usuarioActual.rol === 'ADMIN') setTipoProducto('');
				// para que no quede desplegado el formulario de la fotocopia o el libro
				else setTipoProducto(tiposProducto.FOTOCOPIA);
			});
		});
	};

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

	// agregar el producto
	const agregarProducto = e => {
		e.preventDefault();

		// no chequeamos el descuento porque puede no tener
		const informacionCompartidaSeteada = producto.titulo && producto.stock && producto.precio;

		if (!informacionCompartidaSeteada) {
			setError({
				activo: true,
				mensaje: 'Debe rellenar todos los campos del producto (titulo, stock, precio)'
			});
			return;
		}

		if (!tipoProducto) {
			setError({
				activo: true,
				mensaje: 'Debe seleccionar el tipo de producto'
			});
			return;
		}

		if (tipoProducto === tiposProducto.FOTOCOPIA) {
			const informacionFotocopiaSeteada = producto.descripcion !== '';
			if (!informacionFotocopiaSeteada) {
				setError({
					activo: true,
					mensaje: 'Debe ingresar la descripción de la fotocopia'
				});
				return;
			} else {
				enviarFormulario(tiposProducto.FOTOCOPIA);
			}
		} else if (tipoProducto === tiposProducto.LIBRO) {
			const informacionLibroSeteada =
				producto.descripcion &&
				producto.isbn &&
				producto.idioma &&
				producto.edicion &&
				producto.id_editorial &&
				producto.autores.length &&
				producto.categorias.length;

			if (!informacionLibroSeteada) {
				setError({
					activo: true,
					mensaje:
						'Debe ingresar la información del libro (descripción, isbn, idioma, edición, editorial, autores y categorías)'
				});
				return;
			} else {
				enviarFormulario(tiposProducto.LIBRO);
			}
		}
	};

	const handleChange = e => {
		let name = e.target.name;
		let value = parseInt(e.target.value, 10);

		if (['id_saga', 'id_editorial', 'id_promocion', 'imagen'].includes(name))
			updateProducto(dispatch, {
				...producto,
				[name]: value ? value : null
			});
		else agregarElemento(value, name);
	};

	///////////////////////////////////////////////////////////////////////////////////////////
	//                                    FORMULARIO                                         //
	///////////////////////////////////////////////////////////////////////////////////////////

	let formularioRestante = () => {
		// Ambos poseen una descripción, reutilizamos esta porción.
		const inputDescripcion = () =>
			[{ titulo: 'Descripción', type: 'textarea', name: 'descripcion' }].map(e => (
				<InputFormulario key={e.titulo} titulo={e.titulo} type={e.type} name={e.name} containterClass='form-group' />
			));

		if (tipoProducto === tiposProducto.LIBRO) {
			return (
				<Fragment>
					{inputDescripcion()}
					<div className='form-row'>
						{[
							{ titulo: 'ISBN', type: 'number', name: 'isbn' },
							{ titulo: 'Idioma', type: 'text', name: 'idioma' },
							{ titulo: 'Edicion', type: 'text', name: 'edicion' }
						].map(e => (
							<InputFormulario key={e.titulo} titulo={e.titulo} type={e.type} name={e.name} containterClass='col-4' />
						))}
					</div>

					<hr className='mt-4' />
					<div className='form-row'>
						<div className='col-lg-9 col-sm-12'>
							<label>Editorial</label>{' '}
							<select onChange={handleChange} name='id_editorial'>
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
						<div className='col-lg-3 col-sm-12'>
							<label>
								<input
									type='checkbox'
									checked={formularioNuevaEditorial}
									onChange={e => {
										setFormularioNuevaEditorial(e.target.checked);
									}}
								/>{' '}
								No encuentro la editorial
							</label>
						</div>
					</div>
					{formularioNuevaEditorial ? <FormularioNuevaEditorial setMostrarAlerta={setMostrarAlerta} /> : null}
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
						<div className='col-lg-3 col-sm-12'>
							<label>
								<input
									type='checkbox'
									checked={formularioNuevoAutor}
									onChange={e => {
										setFormularioNuevoAutor(e.target.checked);
									}}
								/>{' '}
								No encuentro el autor
							</label>
						</div>
					</div>
					<div className='row'>
						{producto.autores.map(autor => (
							<Item
								titulo={autor.autor}
								id={autor.id_autor}
								name='autores'
								borrarElemento={borrarElemento}
								key={autor.id_autor}
							/>
						))}
					</div>
					{formularioNuevoAutor ? <FormularioNuevoAutor setMostrarAlerta={setMostrarAlerta} /> : null}
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
						<div className='col-lg-3 col-sm-12'>
							<label>
								<input
									type='checkbox'
									checked={formularioNuevaCategoria}
									onChange={e => {
										setFormularioNuevaCategoria(e.target.checked);
									}}
								/>{' '}
								No encuentro la categoría
							</label>
						</div>
					</div>
					<div className='row'>
						{producto.categorias.map(categoria => (
							<Item
								titulo={categoria.nombre_categoria}
								id={categoria.id_categoria}
								name='categorias'
								borrarElemento={borrarElemento}
								key={categoria.id_categoria}
							/>
						))}
					</div>
					{formularioNuevaCategoria ? <FormularioNuevaCategoria setMostrarAlerta={setMostrarAlerta} /> : null}
					<hr className='mt-4' />
					<div className='form-row'>
						<div className='col-lg-9 col-sm-12'>
							<label>Saga</label>{' '}
							<select onChange={handleChange} name='id_saga'>
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
						<div className='col-lg-3 col-sm-12'>
							<label>
								<input
									type='checkbox'
									checked={formularioNuevaSaga}
									onChange={e => {
										setFormularioNuevaSaga(e.target.checked);
									}}
								/>{' '}
								No encuentro la saga
							</label>
						</div>
					</div>
					{formularioNuevaSaga ? <FormularioNuevaSaga setMostrarAlerta={setMostrarAlerta} /> : null}
					<hr className='mt-4' />
					<div className='form-row'>
						{[{ titulo: 'URL Imagen', type: 'text', name: 'imagen' }].map(e => (
							<InputFormulario key={e.titulo} titulo={e.titulo} type={e.type} name={e.name} containterClass='col-12' />
						))}
					</div>
				</Fragment>
			);
		} else if (tipoProducto === tiposProducto.FOTOCOPIA) return <Fragment>{inputDescripcion()}</Fragment>;
		else return null;
	};

	return (
		<div className='col'>
			<h1 className='text-center mt-4'>Dar de alta un producto</h1>
			{error.activo ? <Error mensaje={error.mensaje} /> : null}
			<form onSubmit={agregarProducto} id='formulario-producto'>
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
					<select onChange={handleChange} defaultValue={''} name='id_promocion'>
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

				{usuarioActual.rol === 'ADMIN' && (
					<Fragment>
						<legend className='text-center'>Tipo de producto</legend>
						<div className='text-center'>
							<div className='form-check form-check-inline'>
								<input
									className='form-check-input'
									type='radio'
									checked={tipoProducto === tiposProducto.LIBRO}
									value='LIBRO'
									onChange={e => {
										setTipoProducto(e.target.value);
									}}
								/>
								<label className='form-check-label'>Libro</label>
							</div>

							<div className='form-check form-check-inline'>
								<input
									className='form-check-input'
									type='radio'
									checked={tipoProducto === tiposProducto.FOTOCOPIA}
									value='FOTOCOPIA'
									onChange={e => {
										setTipoProducto(e.target.value);
									}}
								/>
								<label className='form-check-label'>Fotocopia</label>
							</div>
						</div>
					</Fragment>
				)}
				{formularioRestante()}

				<input
					type='submit'
					className='font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3'
					value='Agregar Producto'
				/>
			</form>
		</div>
	);
};

export default AltaProducto;

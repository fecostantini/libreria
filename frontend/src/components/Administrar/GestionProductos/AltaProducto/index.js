import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';

import Error from '../../../Common/Error';
import ItemEliminable from '../../../Common/ItemEliminable';
import FormularioNuevoAutor from './FormularioNuevoAutor';
import FormularioNuevaCategoria from './FormularioNuevaCategoria';
import FormularioNuevaSaga from './FormularioNuevaSaga';
import FormularioNuevaEditorial from './FormularioNuevaEditorial';
import InputFormulario from './InputFormulario';

import estados from '../../../../estados';
import { fetchAutores } from '../../../../actions/autorActions';
import { fetchCategorias } from '../../../../actions/categoriaActions';
import { fetchSagas } from '../../../../actions/sagaActions';
import { fetchEditoriales } from '../../../../actions/editorialActions';
import { updateProducto } from '../../../../actions/productoActions';
import { estadoInicialProducto } from '../../../../reducers/productoReducer';
import { useSelector, useDispatch } from 'react-redux';

const ordenar = campo => {
	return (a, b) => {
		if (a[campo] > b[campo]) return 1;
		if (a[campo] < b[campo]) return -1;
		return 0;
	};
};

const tiposProducto = {
	FOTOCOPIA: 'FOTOCOPIA',
	LIBRO: 'LIBRO'
};

const AltaProducto = () => {
	const dispatch = useDispatch();

	// redux
	const producto = useSelector(state => state.producto);
	const todasLasEditoriales = useSelector(state => state.editoriales.items);
	const todosLosAutores = useSelector(state => state.autores.items);
	const todasLasCategorias = useSelector(state => state.categorias.items);
	const todasLasSagas = useSelector(state => state.sagas.items);

	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);

	const [error, setError] = useState({ activo: false, mensaje: '' }); // error en el formulario de producto
	const [tipoProducto, setTipoProducto] = useState(''); // FOTOCOPIA o LIBRO

	// determinan si se muestran o no los sub-formularios
	const [formularioNuevoAutor, setFormularioNuevoAutor] = useState(false);
	const [formularioNuevaCategoria, setFormularioNuevaCategoria] = useState(false);
	const [formularioNuevaSaga, setFormularioNuevaSaga] = useState(false);
	const [formularioNuevaEditorial, setFormularioNuevaEditorial] = useState(false);

	// cargar los autores y las categorias cuando cargue la página
	useEffect(() => {
		fetchAutores(dispatch);
		fetchCategorias(dispatch);
		fetchSagas(dispatch);
		fetchEditoriales(dispatch);
	}, []);

	// cada vez que se actualice el estado de la última petición se mostrará un mensaje
	useEffect(() => {
		console.log(statusUltimaPeticion);
		// no queremos mostrar un mensaje cuando hace la petición para traer algo.
		if (statusUltimaPeticion === estados.EXITO) return;

		const swalConfig = {
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			icon: statusUltimaPeticion === estados.CREADO ? 'success' : 'error'
		};

		if (statusUltimaPeticion === estados.CREADO) {
			swalConfig.title = 'La creación se realizó con éxito!';
			setFormularioNuevoAutor(false);
			setFormularioNuevaCategoria(false);
			setFormularioNuevaSaga(false);
			setFormularioNuevaEditorial(false);
		} else if (statusUltimaPeticion === estados.YA_EXISTE) swalConfig.title = 'El elemento que desea crear ya existe';
		else if (statusUltimaPeticion === estados.CONEXION_FALLIDA)
			swalConfig.title = 'Falló la conexión a la Base de Datos';

		// statusUltimaPetición arranca en undefined, hay que hacer este chequeo
		if (statusUltimaPeticion) Swal.fire(swalConfig);
	}, [statusUltimaPeticion, todasLasEditoriales, todosLosAutores, todasLasCategorias, todasLasSagas]);

	const enviarFormulario = tipoProducto => {
		if (tipoProducto === tiposProducto.LIBRO) {
			console.log('creando nuevo libro..');
		} else if (tipoProducto === tiposProducto.FOTOCOPIA) {
			console.log('creando nueva fotocopia..');
		}

		setError({ activo: false });
		setTipoProducto(''); // para que no quede desplegado el formulario de la fotocopia o el libro
		updateProducto(dispatch, estadoInicialProducto);
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

		if (!elementoYaAgregado)
			updateProducto(dispatch, {
				...producto,
				[nombreElemento]: [...producto[nombreElemento], elemento]
			});
	};

	// Borra algun elemento del producto que después se visualzará como una etiqueta azul menos en la vista
	const borrarElemento = (id, nombreElemento) => {
		var elementosSinElEliminado;

		if (nombreElemento === 'autores') elementosSinElEliminado = producto.autores.filter(autor => autor.id_autor !== id);
		else if (nombreElemento === 'categorias')
			elementosSinElEliminado = producto.categorias.filter(categoria => categoria.id_categoria !== id);

		updateProducto(dispatch, {
			...producto,
			[nombreElemento]: [...elementosSinElEliminado]
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
				producto.editorial &&
				producto.autores.length &&
				producto.categorias.length &&
				producto.editorial.id_editorial; // id_editorial !== 0  (la opción default tiene id_editorial === 0)

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
		let { name, value } = e.target;
		if (name === 'saga')
			updateProducto(dispatch, {
				...producto,
				[name]: todasLasSagas.find(saga => saga.id_saga === parseInt(value, 10))
			});
		else if (name === 'editorial')
			updateProducto(dispatch, {
				...producto,
				[name]: todasLasEditoriales.find(editorial => editorial.id_editorial === parseInt(value, 10))
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
				<InputFormulario titulo={e.titulo} type={e.type} name={e.name} containterClass='form-group' />
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
							<InputFormulario titulo={e.titulo} type={e.type} name={e.name} containterClass='col-4' />
						))}
					</div>

					<hr className='mt-4' />
					<div className='form-row'>
						<div className='col-lg-9 col-sm-12'>
							<label>Editorial</label>{' '}
							<select onChange={handleChange} name='editorial'>
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
					{formularioNuevaEditorial ? <FormularioNuevaEditorial /> : null}
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
							<ItemEliminable titulo={autor.autor} id={autor.id_autor} name='autores' borrarElemento={borrarElemento} />
						))}
					</div>
					{formularioNuevoAutor ? <FormularioNuevoAutor /> : null}
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
							<ItemEliminable
								titulo={categoria.nombre_categoria}
								id={categoria.id_categoria}
								name='categorias'
								borrarElemento={borrarElemento}
							/>
						))}
					</div>
					{formularioNuevaCategoria ? <FormularioNuevaCategoria /> : null}
					<hr className='mt-4' />
					<div className='form-row'>
						<div className='col-lg-9 col-sm-12'>
							<label>Saga</label>{' '}
							<select onChange={handleChange} name='saga'>
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
					{formularioNuevaSaga ? <FormularioNuevaSaga /> : null}
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
						<InputFormulario titulo={e.titulo} type={e.type} name={e.name} containterClass={e.containerClass} />
					))}
				</div>
				<div className='form-group mt-3'>
					<label>Descuento promoción </label>{' '}
					<select onChange={handleChange} defaultValue={''} name='descuento'>
						{'0|5|10|15|20|25|30|35|40|45|50'.split('|').map(descuento => (
							<option key={descuento} value={descuento}>
								{descuento}%
							</option>
						))}
					</select>
				</div>
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

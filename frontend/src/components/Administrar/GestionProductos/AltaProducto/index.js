import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';

import Error from '../../../Common/Error';
import ItemEliminable from '../../../Common/ItemEliminable';
import FormularioNuevoAutor from './FormularioNuevoAutor';
import FormularioNuevaCategoria from './FormularioNuevaCategoria';

import estados from '../../../../estados';
import { fetchAutores } from '../../../../actions/autorActions';
import { fetchCategorias } from '../../../../actions/categoriaActions';
import { useSelector, useDispatch } from 'react-redux';

const tiposProducto = {
	FOTOCOPIA: 'FOTOCOPIA',
	LIBRO: 'LIBRO'
};

const estadoInicialProducto = {
	titulo: '',
	stock: 0,
	precio: 0,
	descuento: '',
	descripcion: '',
	isbn: 0,
	idioma: '',
	edicion: '',
	editorial: '',
	autores: [],
	categorias: []
};

const AltaProducto = () => {
	const dispatch = useDispatch();

	// redux
	const todosLosAutores = useSelector(state => state.autores.items);
	const todasLasCategorias = useSelector(state => state.categorias.items);
	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);

	// cargar los autores cuando cargue la página
	useEffect(() => {
		fetchAutores(dispatch);
		fetchCategorias(dispatch);
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
			setMostrarFormularioNuevoAutor(false);
		} else if (statusUltimaPeticion === estados.YA_EXISTE)
			swalConfig.title = 'El elemento que desea crear ya existe';
		else if (statusUltimaPeticion === estados.CONEXION_FALLIDA)
			swalConfig.title = 'Falló la conexión a la Base de Datos';

		// statusUltimaPetición arranca en undefined, hay que hacer este chequeo
		if (statusUltimaPeticion) Swal.fire(swalConfig);
	}, [statusUltimaPeticion, todosLosAutores, todasLasCategorias]);

	const [
		{
			titulo,
			stock,
			precio,
			autores,
			descuento,
			descripcion,
			isbn,
			idioma,
			edicion,
			editorial,
			categorias,
			saga
		},
		setProducto
	] = useState(estadoInicialProducto);

	const [error, setError] = useState({
		activo: false,
		mensaje: ''
	}); // error en el formulario de producto

	const [tipoProducto, setTipoProducto] = useState(''); // FOTOCOPIA o LIBRO

	// determinante si aparece o no el formulario del nuevo autor
	const [
		mostrarFormularioNuevoAutor,
		setMostrarFormularioNuevoAutor
	] = useState(false);
	// determinante si aparece o no el formulario de la nueva categoria
	const [
		mostrarFormularioNuevaCategoria,
		setMostrarFormularioNuevaCategoria
	] = useState(false);

	const limpiarFormulario = () => {
		document.getElementById('formulario-producto').reset();
		setTipoProducto(''); // fix para que no quede desplegado el formulario de la fotocopia o el libro
		setProducto(estadoInicialProducto);
	};

	const agregarAutor = idAutor => {
		const idAutorSeleccionado = parseInt(idAutor, 10);
		const autorSeleccionado = todosLosAutores.find(
			autor => autor.id_autor === idAutorSeleccionado
		);

		const autorYaAgregado = autores.includes(autorSeleccionado);
		if (!autorYaAgregado)
			setProducto(estadoPrevio => ({
				...estadoPrevio,
				autores: [...autores, autorSeleccionado]
			})); // agregarlo si no está
	};

	const borrarAutor = idAutorAEliminar => {
		const autoresSinElEliminado = autores.filter(
			autor => autor.id_autor !== idAutorAEliminar
		);

		setProducto(estadoPrevio => ({
			...estadoPrevio,
			autores: [...autoresSinElEliminado]
		}));
	};

	const agregarCategoria = idCategoria => {
		const idCategoriaSeleccionada = parseInt(idCategoria, 10);
		const categoriaSeleccionada = todasLasCategorias.find(
			categoria => categoria.id_categoria === idCategoriaSeleccionada
		);

		const categoriaYaAgregada = categorias.includes(categoriaSeleccionada);
		if (!categoriaYaAgregada)
			setProducto(estadoPrevio => ({
				...estadoPrevio,
				categorias: [...categorias, categoriaSeleccionada]
			})); // agregarlo si no está
	};

	const borrarCategoria = idCategoriaAEliminar => {
		const categoriasSinLaEliminada = categorias.filter(
			categoria => categoria.id_categoria !== idCategoriaAEliminar
		);

		setProducto(estadoPrevio => ({
			...estadoPrevio,
			categorias: [...categoriasSinLaEliminada]
		}));
	};

	const handleChange = e => {
		let { name, value } = e.target;

		const seteoNumerico = 'isbn|stock|precio'.split('|').includes(name);
		const seteoEspecial = 'autores|categorias|saga'.split('|').includes(name);

		if (seteoEspecial) {
			if (name === 'autores') agregarAutor(value);
			else if (name === 'categorias') agregarCategoria(value);

			return;
		} else if (seteoNumerico)
			value = name === 'precio' ? parseFloat(value, 10) : parseInt(value, 10);

		setProducto(estadoPrevio => ({ ...estadoPrevio, [name]: value }));
	};

	const leerTipoProducto = e => {
		setTipoProducto(e.target.value);
	};

	// agregar el producto
	const agregarProducto = e => {
		e.preventDefault();

		// no chequeamos el descuento porque puede no tener
		const informacionCompartidaSeteada = titulo && stock && precio;

		if (!informacionCompartidaSeteada) {
			setError({
				activo: true,
				mensaje:
					'Debe rellenar todos los campos del producto (titulo, stock, precio)'
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
			const informacionFotocopiaSeteada = descripcion !== '';
			if (!informacionFotocopiaSeteada) {
				setError({
					activo: true,
					mensaje: 'Debe ingresar la descripción de la fotocopia'
				});
				return;
			} else {
				console.log('creando nueva fotocopia..');
				setError({ activo: false });
				limpiarFormulario();
			}
		} else if (tipoProducto === tiposProducto.LIBRO) {
			const informacionLibroSeteada =
				descripcion &&
				isbn &&
				idioma &&
				edicion &&
				editorial &&
				autores.length &&
				categorias;

			if (!informacionLibroSeteada) {
				setError({
					activo: true,
					mensaje:
						'Debe ingresar la información del libro (descripción, isbn, idioma, edición, editorial, autores y categorías)'
				});
				return;
			} else {
				console.log('creando nuevo libro..');
				setError({ activo: false });
				limpiarFormulario();
			}
		}
	};

	let FormularioRestante = () => {
		// Ambos poseen una descripción, reutilizamos esta porción.
		const inputDescripcion = (
			<div className='form-group'>
				<label>Descripción</label>
				<textarea
					className='form-control'
					name='descripcion'
					rows='3'
					onChange={handleChange}
				></textarea>
			</div>
		);

		if (tipoProducto === tiposProducto.LIBRO) {
			return (
				<Fragment>
					{inputDescripcion}
					<div className='form-row'>
						<div className='col-4'>
							<label>ISBN</label>
							<input
								type='number'
								name='isbn'
								className='form-control'
								onChange={handleChange}
							/>
						</div>
						<div className='col-4'>
							<label>Idioma</label>
							<input
								type='text'
								name='idioma'
								className='form-control'
								onChange={handleChange}
							/>
						</div>
						<div className='col-4'>
							<label>Edición</label>
							<input
								type='text'
								name='edicion'
								className='form-control'
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className='form-group'>
						<label>Editorial</label>
						<input
							type='text'
							name='editorial'
							className='form-control'
							onChange={handleChange}
						/>
					</div>
					<div className='form-group'>
						<hr className='mt-4' />
						<label>Autores</label>{' '}
						<select onChange={handleChange} name='autores'>
							{todosLosAutores
								.sort((a, b) => {
									if (a.autor > b.autor) {
										return 1;
									}
									if (a.autor < b.autor) {
										return -1;
									}
									return 0;
								})
								.map(autor => (
									<option value={autor.id_autor} key={autor.id_autor}>
										{autor.autor}
									</option>
								))}
						</select>{' '}
						<label>
							<input
								type='checkbox'
								checked={mostrarFormularioNuevoAutor}
								onChange={e => {
									setMostrarFormularioNuevoAutor(e.target.checked);
								}}
							/>{' '}
							No encuentro el autor
						</label>
					</div>
					<div className='row'>
						{autores.map(autor => (
							<ItemEliminable
								titulo={autor.autor}
								id={autor.id_autor}
								borrarElemento={borrarAutor}
							/>
						))}
					</div>
					{mostrarFormularioNuevoAutor ? <FormularioNuevoAutor /> : null}
					<div className='form-group'>
						<hr className='mt-4' />
						<label>Categorías</label>{' '}
						<select onChange={handleChange} name='categorias'>
							{todasLasCategorias
								.sort((a, b) => {
									if (a.nombre_categoria > b.nombre_categoria) {
										return 1;
									}
									if (a.nombre_categoria < b.nombre_categoria) {
										return -1;
									}
									return 0;
								})
								.map(categoria => (
									<option
										value={categoria.id_categoria}
										key={categoria.id_categoria}
									>
										{categoria.nombre_categoria}
									</option>
								))}
						</select>{' '}
						<label>
							<input
								type='checkbox'
								checked={mostrarFormularioNuevaCategoria}
								onChange={e => {
									setMostrarFormularioNuevaCategoria(e.target.checked);
								}}
							/>{' '}
							No encuentro la categoría
						</label>
					</div>
					<div className='row'>
						{categorias.map(categoria => (
							<ItemEliminable
								titulo={categoria.nombre_categoria}
								id={categoria.id_categoria}
								borrarElemento={borrarCategoria}
							/>
						))}
					</div>
					{mostrarFormularioNuevaCategoria ? (
						<FormularioNuevaCategoria />
					) : null}
					<div className='form-group'>
						<hr className='mt-4' />
						<label>Saga (dejar vacío si no pertenece a ninguna)</label>
						<input
							type='text'
							name='saga'
							className='form-control'
							onChange={handleChange}
						/>
					</div>
				</Fragment>
			);
		} else if (tipoProducto === tiposProducto.FOTOCOPIA)
			return <Fragment>{inputDescripcion}</Fragment>;
		else return null;
	};

	return (
		<div className='col'>
			<h1 className='text-center mt-4'>Dar de alta un producto</h1>
			{error.activo ? <Error mensaje={error.mensaje} /> : null}
			<form onSubmit={agregarProducto} id='formulario-producto'>
				<div className='form-row'>
					<div className='col-6'>
						<label>Titulo</label>
						<input
							type='text'
							name='titulo'
							className='form-control'
							onChange={handleChange}
						/>
					</div>
					<div className='col-3'>
						<label>Stock</label>
						<input
							type='number'
							name='stock'
							className='form-control'
							onChange={handleChange}
						/>
					</div>
					<div className='col-3'>
						<label>Precio</label>
						<input
							type='number'
							name='precio'
							className='form-control'
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className='form-group mt-3'>
					<label>Descuento promoción </label>{' '}
					<select onChange={handleChange} defaultValue={''} name='descuento'>
						{'0|5|10|15|20|25|30|35|40|45|50'.split('|').map(descuento => (
							<option value={descuento}>{descuento}%</option>
						))}
					</select>
				</div>
				<legend className='text-center'>Tipo de producto</legend>
				<div className='text-center'>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='tipo_producto'
							value='LIBRO'
							onChange={e => leerTipoProducto(e)}
						/>
						<label className='form-check-label'>Libro</label>
					</div>

					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='tipo_producto'
							value='FOTOCOPIA'
							onChange={e => leerTipoProducto(e)}
						/>
						<label className='form-check-label'>Fotocopia</label>
					</div>
				</div>
				<FormularioRestante />
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

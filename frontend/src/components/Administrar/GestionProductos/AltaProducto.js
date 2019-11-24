import React, { useState, useEffect, useRef, Fragment } from 'react';
import Swal from 'sweetalert2';

import Error from '../../Common/Error';

import estados from '../../../estados';
import { FETCH_AUTORES, CREATE_AUTOR } from '../../../actions/types';
import { fetchAutores, createAutor } from '../../../actions/autorActions';
import { useSelector, useDispatch } from 'react-redux';

const tipoProductos = {
	FOTOCOPIA: 'FOTOCOPIA',
	LIBRO: 'FOTOCOPIA'
};

const AltaProducto = () => {
	const dispatch = useDispatch();

	// redux
	const todosLosAutores = useSelector(state => state.autores.items);
	const statusUltimaPeticion = useSelector(state => state.autores.status);

	const dispatchAutores = async accion => {
		switch (accion) {
			case FETCH_AUTORES:
				dispatch(await fetchAutores());
				break;

			case CREATE_AUTOR:
				const nuevoAutor = {
					autor: nombreNuevoAutor.toUpperCase(),
					nacionalidad: nacionalidadNuevoAutor
				};
				dispatch(await createAutor(nuevoAutor));
				break;

			default:
				break;
		}
	};

	// cargar los autores cuando cargue la página
	useEffect(() => {
		dispatchAutores(FETCH_AUTORES);
	}, []);

	// cada vez que se actualice el estado de la última petición se mostrará un mensaje
	useEffect(() => {
		// no queremos mostrar un mensaje cuando hace la petición para traer algo.
		if (statusUltimaPeticion === estados.EXITO) return;

		const swalConfig = {
			position: 'center',
			showConfirmButton: false,
			timer: 3000,
			icon:
				statusUltimaPeticion === estados.CREADO ||
				statusUltimaPeticion === estados.EXITO
					? 'success'
					: 'error'
		};

		if (statusUltimaPeticion === estados.CREADO) {
			swalConfig.title = 'El autor fue creado exitosamente';
			cerrarFormularioNuevoAutor();
		} else if (statusUltimaPeticion === estados.YA_EXISTE)
			swalConfig.title = 'El autor que ingresó ya existe';
		else if (statusUltimaPeticion === estados.CONEXION_FALLIDA)
			swalConfig.title = 'Falló la conexión a la Base de Datos';

		// statusUltimaPetición arranca en undefined, hay que hacer este chequeo
		if (statusUltimaPeticion) Swal.fire(swalConfig);
	}, [statusUltimaPeticion]);

	// determinante si aparece o no el formulario del nuevo autor
	const checkboxFormularioNuevoAutor = useRef(null);
	const [
		mostrarFormularioNuevoAutor,
		setMostrarFormularioNuevoAutor
	] = useState();

	const cerrarFormularioNuevoAutor = () => {
		setNombreNuevoAutor('');
		setNacionalidadNuevoAutor('');
		setMostrarFormularioNuevoAutor(false);
		checkboxFormularioNuevoAutor.current.checked = false;
	};

	const limpiarFormulario = () => {
		document.getElementById('formulario-producto').reset();
		setTipoProducto(''); // fix para que no quede desplegado el formulario de la fotocopia o el libro
	};

	// state nuevo autor
	const [nombreNuevoAutor, setNombreNuevoAutor] = useState();
	const [nacionalidadNuevoAutor, setNacionalidadNuevoAutor] = useState();

	// error en el formulario
	const [error, setError] = useState({ activo: false, mensaje: '' });

	//state producto a cargar
	const [titulo, setTitulo] = useState('');
	const [stock, setStock] = useState(0);
	const [precio, setPrecio] = useState(0);
	const [descuento, setDescuento] = useState('');
	const [tipoProducto, setTipoProducto] = useState('');
	// propio de libro y fotocopia
	const [descripcion, setDescripcion] = useState('');
	// propio de libro exclusivamente
	const [isbn, setIsbn] = useState(0);
	const [idioma, setIdioma] = useState('');
	const [edicion, setEdicion] = useState('');
	const [editorial, setEditorial] = useState('');
	const [autores, setAutores] = useState([]);
	const [categorias, setCategorias] = useState([]);

	const agregarAutor = e => {
		const idAutorSeleccionado = parseInt(e.target.value, 10);
		const autorSeleccionado = todosLosAutores.find(
			autor => autor.id_autor === idAutorSeleccionado
		);

		const autorYaSeleccionado = autores.includes(autorSeleccionado);
		if (!autorYaSeleccionado) setAutores(autores.concat(autorSeleccionado));
	};

	const borrarAutor = idAutorAEliminar => {
		const autoresSinElEliminado = autores.filter(
			autor => autor.id_autor !== idAutorAEliminar
		);
		setAutores(autoresSinElEliminado);
	};

	const leerTipoProducto = e => {
		setTipoProducto(e.target.value);
	};

	const leerDescuento = e => {
		setDescuento(e.target.value);
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

		if (tipoProducto === tipoProductos.FOTOCOPIA) {
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
		} else if (tipoProducto === 'libro') {
			const informacionLibroSeteada =
				descripcion &&
				isbn &&
				idioma &&
				edicion &&
				editorial &&
				autores.length &&
				categorias.length;

			if (!informacionLibroSeteada) {
				setError({
					activo: true,
					mensaje:
						'Debe ingresar la información del libro (descripción, isbn, edición, editorial, autores, categorías)'
				});
				return;
			} else {
				console.log('creando nuevo libro..');
				setError({ activo: false });
				limpiarFormulario();
			}
		}
	};

	let ItemEliminable = ({ titulo, id, borrarElemento }) => {
		return (
			<div className='col-auto'>
				<h5>
					{' '}
					<span className='badge badge-pill badge-primary'>
						{titulo}{' '}
						<a
							className='text-dark'
							style={{ textDecoration: 'none', cursor: 'pointer' }}
							onClick={() => borrarElemento(id)}
						>
							&times;
						</a>
					</span>
				</h5>
			</div>
		);
	};

	let formularioNuevoAutor = () => {
		return (
			<div className='form-row'>
				<legend className='text-center'>Ingresar un nuevo autor</legend>
				<div className='col-lg-4 col-sm-6'>
					<label>Nombre:</label>
					<input
						type='text'
						className='form-control'
						onChange={e => {
							setNombreNuevoAutor(e.target.value);
						}}
					/>
				</div>

				<div className='col-lg-4 col-sm-6'>
					<label>Nacionalidad:</label>
					<input
						type='text'
						className='form-control'
						onChange={e => {
							setNacionalidadNuevoAutor(e.target.value);
						}}
					/>
				</div>

				<div className='col-lg-4 col-sm-12'>
					<label>
						<span style={{ opacity: '0' }}>asd</span>
					</label>
					<button
						type='button'
						className='font-weight-bold text-uppercase btn btn-primary btn-block'
						onClick={() => {
							dispatchAutores(CREATE_AUTOR);
						}}
					>
						Crear nuevo autor
					</button>
				</div>
			</div>
		);
	};

	let formularioRestante = () => {
		// Ambos poseen una descripción, reutilizamos esta porción.
		const inputDescripcion = (
			<div className='form-group'>
				<label>Descripción</label>
				<textarea
					className='form-control'
					rows='3'
					onChange={e => setDescripcion(e.target.value)}
				></textarea>
			</div>
		);

		if (tipoProducto === 'libro') {
			return (
				<Fragment>
					{inputDescripcion}
					<div className='form-row'>
						<div className='col-4'>
							<label>ISBN</label>
							<input
								type='number'
								className='form-control'
								onChange={e => setIsbn(parseInt(e.target.value, 10))}
							/>
						</div>
						<div className='col-4'>
							<label>Idioma</label>
							<input
								type='text'
								className='form-control'
								onChange={e => setIdioma(e.target.value)}
							/>
						</div>
						<div className='col-4'>
							<label>Edición</label>
							<input
								type='text'
								className='form-control'
								onChange={e => setEdicion(e.target.value)}
							/>
						</div>
					</div>

					<div className='form-group'>
						<label>Editorial</label>
						<input
							type='text'
							className='form-control'
							onChange={e => setEditorial(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<hr className='mt-5' />
						<label>Autores</label>{' '}
						<select onChange={e => agregarAutor(e)}>
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
									<option value={autor.id_autor}>{autor.autor}</option>
								))}
						</select>{' '}
						<label>
							<input
								type='checkbox'
								ref={checkboxFormularioNuevoAutor}
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
					{mostrarFormularioNuevoAutor ? formularioNuevoAutor() : null}
					<div className='form-group'>
						<hr className='mt-5' />
						<label>Categorías (separarlas con coma)</label>
						<input
							type='text'
							className='form-control'
							// convertimos el string a array (ejemplo: 'a1, a2, a3' se convierte en ['a1', 'a2, 'a3']
							onChange={e =>
								setCategorias(e.target.value.split(',').map(e => e.trim()))
							}
						/>
					</div>
					<div className='form-group'>
						<hr className='mt-5' />
						<label>Saga (dejar vacío si no pertenece a ninguna)</label>
						<input
							type='text'
							className='form-control'
							onChange={e => setDescripcion(e.target.value)}
						/>
					</div>
				</Fragment>
			);
		} else if (tipoProducto === tipoProductos.FOTOCOPIA)
			return <Fragment>{inputDescripcion}</Fragment>;
		else return null;
	};

	return (
		<div className='col'>
			<h1 className='text-center mt-5'>Dar de alta un producto</h1>
			{error.activo ? <Error mensaje={error.mensaje} /> : null}
			<form onSubmit={agregarProducto} id='formulario-producto'>
				<div className='form-row'>
					<div className='col-6'>
						<label>Titulo</label>
						<input
							type='text'
							className='form-control'
							onChange={e => setTitulo(e.target.value)}
						/>
					</div>
					<div className='col-3'>
						<label>Stock</label>
						<input
							type='number'
							className='form-control'
							onChange={e => setStock(parseInt(e.target.value, 10))}
						/>
					</div>
					<div className='col-3'>
						<label>Precio</label>
						<input
							type='number'
							className='form-control'
							onChange={e => setPrecio(parseFloat(e.target.value))}
						/>
					</div>
				</div>
				<div className='form-group mt-3'>
					<label>Descuento promoción </label>{' '}
					<select onChange={e => leerDescuento(e)} defaultValue={''}>
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

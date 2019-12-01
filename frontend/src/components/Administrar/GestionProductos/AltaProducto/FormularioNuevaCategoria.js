import React, { useState } from 'react';
import Error from '../../../Common/Error';
import { createCategoria } from '../../../../actions/categoriaActions';
import { useDispatch } from 'react-redux';

let FormularioNuevaCategoria = ({ setMostrarAlerta }) => {
	const dispatch = useDispatch();
	const [nuevaCategoria, setNuevaCategoria] = useState({
		nombre_categoria: ''
	});
	const [error, setError] = useState({
		activo: false,
		mensaje: ''
	});

	const crearNuevaCategoria = () => {
		if (nuevaCategoria.nombre_categoria) {
			const nombreCategoriaUpper = nuevaCategoria.nombre_categoria.toUpperCase();
			createCategoria(dispatch, { nombre_categoria: nombreCategoriaUpper }).then(() => {
				setMostrarAlerta(true);
			});
		} else
			setError({
				activo: true,
				mensaje: 'Debe ingresar el nombre de la categoría'
			});
	};

	return (
		<div className='form-row'>
			<div className='col-12'>{error.activo ? <Error mensaje={error.mensaje} /> : null}</div>
			<legend className='text-center'>Ingresar una nueva categoria</legend>
			<div className='col-lg-8 col-sm-6'>
				<label>Nombre:</label>
				<input
					type='text'
					name='nombre_categoria'
					value={nuevaCategoria.nombre_categoria}
					className='form-control'
					onChange={e => {
						setNuevaCategoria({ nombre_categoria: e.target.value });
					}}
				/>
			</div>

			<div className='col-lg-4 col-sm-12'>
				<label>
					{/* Caracteres invisibles para ubicar correctamente el botón */}
					<span style={{ opacity: '0' }}>asd</span>{' '}
				</label>
				<button
					type='button'
					className='font-weight-bold text-uppercase btn btn-primary btn-block'
					onClick={crearNuevaCategoria}
				>
					Crear nueva categoria
				</button>
			</div>
		</div>
	);
};

export default FormularioNuevaCategoria;

import React, { useState } from 'react';
import Error from '../../../Common/Error';
import { createAutor } from '../../../../actions/autorActions';
import { useDispatch } from 'react-redux';

const estadoInicialNuevoAutor = { autor: '', nacionalidad: '' };

let FormularioNuevoAutor = () => {
	const dispatch = useDispatch();
	const [nuevoAutor, setNuevoAutor] = useState(estadoInicialNuevoAutor);
	const [error, setError] = useState({
		activo: false,
		mensaje: ''
	});

	const handleChange = e => {
		const { value, name } = e.target;
		setNuevoAutor(estadoAnterior => ({
			...estadoAnterior,
			[name]: value
		}));
	};
	const crearNuevoAutor = () => {
		if (nuevoAutor.autor && nuevoAutor.nacionalidad) {
			const autorUpper = nuevoAutor.autor.toUpperCase();
			const nacionalidadUpper = nuevoAutor.nacionalidad.toUpperCase();
			const nuevoAutorUpper = {
				autor: autorUpper,
				nacionalidad: nacionalidadUpper
			};
			createAutor(dispatch, nuevoAutorUpper);
		} else {
			if (!nuevoAutor.autor && !nuevoAutor.nacionalidad)
				setError({
					activo: true,
					mensaje: 'Debe ingresar el nombre del autor y su nacionalidad'
				});
			else if (!nuevoAutor.autor)
				setError({
					activo: true,
					mensaje: 'Debe ingresar el nombre del autor'
				});
			else
				setError({
					activo: true,
					mensaje: 'Debe ingresar la nacionalidad del autor'
				});
		}
	};

	return (
		<div className='form-row'>
			<div className='col-12'>
				{error.activo ? <Error mensaje={error.mensaje} /> : null}
			</div>
			<legend className='text-center'>Ingresar un nuevo autor</legend>
			<div className='col-lg-4 col-sm-6'>
				<label>Nombre:</label>
				<input
					type='text'
					name='autor'
					value={nuevoAutor.autor}
					className='form-control'
					onChange={handleChange}
				/>
			</div>

			<div className='col-lg-4 col-sm-6'>
				<label>Nacionalidad:</label>
				<input
					type='text'
					value={nuevoAutor.nacionalidad}
					name='nacionalidad'
					className='form-control'
					onChange={handleChange}
				/>
			</div>

			<div className='col-lg-4 col-sm-12'>
				<label>
					<span style={{ opacity: '0' }}>asd</span>
				</label>
				<button
					type='button'
					className='font-weight-bold text-uppercase btn btn-primary btn-block'
					onClick={crearNuevoAutor}
				>
					Crear nuevo autor
				</button>
			</div>
		</div>
	);
};

export default FormularioNuevoAutor;

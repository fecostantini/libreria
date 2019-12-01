import React, { useState } from 'react';
import Error from '../../../Common/Error';
import { createEditorial } from '../../../../actions/editorialActions';
import { useDispatch } from 'react-redux';

let FormularioNuevaEditorial = ({ setMostrarAlerta }) => {
	const dispatch = useDispatch();
	const [nuevaEditorial, setNuevaEditorial] = useState({
		nombre_editorial: ''
	});
	const [error, setError] = useState({
		activo: false,
		mensaje: ''
	});

	// crea una nueva saga con el stock_saga en 0 por defecto
	const crearNuevaEditorial = () => {
		if (nuevaEditorial.nombre_editorial) {
			const nombreEditorialUpper = nuevaEditorial.nombre_editorial.toUpperCase();
			createEditorial(dispatch, { nombre_editorial: nombreEditorialUpper }).then(() => {
				setMostrarAlerta(true);
			});
		} else
			setError({
				activo: true,
				mensaje: 'Debe ingresar el nombre de la editorial'
			});
	};

	return (
		<div className='form-row'>
			<div className='col-12'>{error.activo ? <Error mensaje={error.mensaje} /> : null}</div>
			<legend className='text-center'>Ingresar una nueva editorial</legend>
			<div className='col-lg-8 col-sm-6'>
				<label>Nombre:</label>
				<input
					type='text'
					name='nombre_editorial'
					value={nuevaEditorial.nombre_editorial}
					className='form-control'
					onChange={e => {
						setNuevaEditorial({ nombre_editorial: e.target.value });
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
					onClick={crearNuevaEditorial}
				>
					Crear nueva editorial
				</button>
			</div>
		</div>
	);
};

export default FormularioNuevaEditorial;

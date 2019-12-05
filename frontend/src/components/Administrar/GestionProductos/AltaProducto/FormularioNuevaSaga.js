import React, { useState } from 'react';
import Error from '../../../Common/Error';
import { createSaga } from '../../../../actions/sagaActions';
import { useDispatch } from 'react-redux';

let FormularioNuevaSaga = ({ setMostrarAlerta }) => {
	const dispatch = useDispatch();
	const [nuevaSaga, setNuevaSaga] = useState({ nombre_saga: '' });
	const [error, setError] = useState({
		activo: false,
		mensaje: ''
	});

	// crea una nueva saga con el stock_saga en 0 por defecto
	const crearNuevaSaga = () => {
		if (nuevaSaga.nombre_saga) {
			const nombreSagaUpper = nuevaSaga.nombre_saga.toUpperCase();
			createSaga(dispatch, { nombre_saga: nombreSagaUpper }).then(() => {
				setMostrarAlerta(true);
			});
		} else
			setError({
				activo: true,
				mensaje: 'Debe ingresar el nombre de la saga'
			});
	};

	return (
		<div className='form-row'>
			<div className='col-12'>{error.activo ? <Error mensaje={error.mensaje} /> : null}</div>
			<legend className='text-center'>Ingresar una nueva saga</legend>
			<div className='col-lg-8 col-sm-6'>
				<label>Nombre:</label>
				<input
					type='text'
					name='nombre_saga'
					value={nuevaSaga.nombre_saga}
					className='form-control'
					onChange={e => {
						setNuevaSaga({ nombre_saga: e.target.value, stock_saga: nuevaSaga.stock_saga });
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
					onClick={crearNuevaSaga}
				>
					Crear nueva saga
				</button>
			</div>
		</div>
	);
};

export default FormularioNuevaSaga;

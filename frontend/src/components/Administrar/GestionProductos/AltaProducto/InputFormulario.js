import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducto } from '../../../../actions/productoActions';

let InputFormulario = ({ titulo, name, type, containterClass }) => {
	const dispatch = useDispatch();
	const producto = useSelector(state => state.producto.productoActual);

	const handleChange = e => {
		e.preventDefault();
		let { name, value, type } = e.target;
		const valorNumerico = type === 'number';

		if (valorNumerico) value = name === 'precio' ? parseFloat(value, 10) : parseInt(value, 10);

		updateProducto(dispatch, { ...producto, [name]: value });
	};

	let decidirQueInputUsar = () => {
		if (type === 'textarea')
			return (
				<textarea
					type={type}
					name={name}
					value={producto[name] ? producto[name] : ''}
					className='form-control'
					rows='3'
					onChange={handleChange}
				></textarea>
			);
		else {
			if (type === 'number')
				return (
					<input
						type={type}
						name={name}
						value={producto[name] ? producto[name] : ''}
						className='form-control'
						onChange={handleChange}
						min='0'
						step={name === 'precio' ? '0.01' : '1'}
					/>
				);
			else
				return (
					<input
						type={type}
						name={name}
						value={producto[name] ? producto[name] : ''}
						className='form-control'
						onChange={handleChange}
					/>
				);
		}
	};
	return (
		<div className={containterClass}>
			<label>{titulo}</label>
			{decidirQueInputUsar()}
		</div>
	);
};

export default InputFormulario;

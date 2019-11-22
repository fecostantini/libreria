import React, { useState, Fragment } from 'react';

const AltaProducto = () => {
	//state
	const [titulo, setTitulo] = useState('');
	const [stock, setStock] = useState(1);
	const [precio, setPrecio] = useState(0);
	const [descuento, setDescuento] = useState('');
	const [tipoProducto, setTipoProducto] = useState('');
	const [isbn, setIsbn] = useState(0);
	const [descripcion, setDescripcion] = useState('');
	const [idioma, setIdioma] = useState('');
	const [edicion, setEdicion] = useState('');
	const [editorial, setEditorial] = useState('');
	const [autores, setAutores] = useState('');
	const [categorias, setCategorias] = useState('');
	const [error, setError] = useState(false);

	// metodo para el button-radio

	const leerTipoProducto = e => {
		setTipoProducto(e.target.value);
	};

	const leerDescuento = e => {
		setDescuento(e.target.value);
	};
	// agregar el producto
	const agregarProducto = e => {
		e.preventDefault();
		/*
		if (tipoTarea === '' || nombre === '' || tipoDesarrollador === '')
			setError(true);
		else {
			setError(false);
    }
    */
	};

	let formularioRestante = () => {
		// Ambos poseen una descripción, reutilizamos esta porción.
		const inputDescripcion = (
			<div className='form-group'>
				<label>Descripción</label>
				<input
					type='text'
					className='form-control'
					onChange={e => setDescripcion(e.target.value)}
				/>
			</div>
		);

		if (tipoProducto === 'libro') {
			console.log('asd');
			return (
				<Fragment>
					{inputDescripcion}
					<div className='form-group'>
						<label>ISBN</label>
						<input
							type='number'
							className='form-control'
							onChange={e => setIsbn(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label>Idioma</label>
						<input
							type='text'
							className='form-control'
							onChange={e => setIdioma(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label>Edición</label>
						<input
							type='text'
							className='form-control'
							onChange={e => setEdicion(e.target.value)}
						/>
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
						<label>Autores (separarlos con coma)</label>
						<input
							type='text'
							className='form-control'
							// convertimos el string a array (ejemplo: 'a1, a2, a3' se convierte en ['a1', 'a2, 'a3']
							onChange={e =>
								setAutores(e.target.value.split(',').map(e => e.trim()))
							}
						/>
					</div>
					<div className='form-group'>
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
						<label>Saga (dejar vacío si no pertenece a ninguna)</label>
						<input
							type='text'
							className='form-control'
							onChange={e => setDescripcion(e.target.value)}
						/>
					</div>
				</Fragment>
			);
		} else if (tipoProducto === 'fotocopia')
			return <Fragment>{inputDescripcion}</Fragment>;
		else return null;
	};

	return (
		<div className='col'>
			<h1 className='text-center mt-5'>Dar de alta un producto</h1>
			{error ? (
				<h1 className='text-center'>TODOS LOS CAMPOS SON OBLIGATORIOS</h1>
			) : null}
			<form onSubmit={agregarProducto}>
				<div className='form-group'>
					<label>Titulo</label>
					<input
						type='text'
						className='form-control'
						onChange={e => setTitulo(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label>Stock</label>
					<input
						type='number'
						className='form-control'
						onChange={e => setStock(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<label>Precio</label>
					<input
						type='number'
						className='form-control'
						onChange={e => setPrecio(e.target.value)}
					/>
				</div>
				<label>Descuento promoción </label>{' '}
				<select onChange={e => leerDescuento(e)} defaultValue={''}>
					<option value=''>0%</option>
					<option value='5'>5%</option>
					<option value='10'>10%</option>
					<option value='15'>15%</option>
					<option value='20'>20%</option>
					<option value='25'>25%</option>
					<option value='30'>30%</option>
					<option value='35'>35%</option>
					<option value='40'>40%</option>
					<option value='45'>45%</option>
					<option value='50'>50%</option>
				</select>
				<legend className='text-center'>Tipo de producto</legend>
				<div className='text-center'>
					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='tipo_producto'
							value='libro'
							onChange={e => leerTipoProducto(e)}
						/>
						<label className='form-check-label'>Libro</label>
					</div>

					<div className='form-check form-check-inline'>
						<input
							className='form-check-input'
							type='radio'
							name='tipo_producto'
							value='fotocopia'
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

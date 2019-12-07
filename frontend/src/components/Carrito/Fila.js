import React, { Fragment } from 'react';

function Fila({ producto }) {
	const mostrarDescuento = producto.precio !== producto.precio_descuento;
	const conDescuento = (
		<Fragment>
			<span style={{ textDecoration: 'line-through' }}>${producto.precio}</span>
			<span> ${producto.precio_descuento}</span>
		</Fragment>
	);
	return (
		<tr>
			<th scope='row' className='border-0'>
				<div className='p-2'>
					<div className='ml-3 d-inline-block '>
						<h5 className='mb-0'>{producto.titulo}</h5>
					</div>
				</div>
			</th>
			<td className='border-0 text-center'>
				<strong>{mostrarDescuento ? conDescuento : `$${producto.precio}`}</strong>
			</td>
			<td className='border-0 text-center'>
				<strong>{producto.cantidad}</strong>
			</td>
			<td className='border-0 text-center'>
				<a className='text-dark'>
					<i className='fa fa-trash'></i>
				</a>
			</td>
		</tr>
	);
}

export default Fila;

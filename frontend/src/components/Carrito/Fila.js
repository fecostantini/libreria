import React from 'react';

function Fila({ producto }) {
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
				<strong>${producto.precio}</strong>
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

import React from 'react';

function Buscador({ type = 'text', titulo, placeholder, setBusqueda }) {
	return (
		<div className='py-3'>
			<form>
				<h5 className='font-weight-light mb-2 font-italic'>{titulo}</h5>
				<div className='input-group'>
					<input
						type={type}
						placeholder={placeholder}
						className='form-control border'
						onChange={e => {
							if (typeof e.target.value === 'number') setBusqueda(e.target.value ? e.target.value : 0);
							else setBusqueda(e.target.value);
						}}
					/>
					<div className='input-group-append'>
						<button disabled className='btn text-primary border' style={{ cursor: 'default' }}>
							<i className='fa fa-search'></i>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default Buscador;

import React from 'react';

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

export default ItemEliminable;

import React from 'react';

let Item = ({ titulo, id = null, name = null, borrarElemento = (a, b) => {}, eliminable = true }) => {
	return (
		<div className='col-auto'>
			<h5>
				{' '}
				<span className='badge badge-pill badge-primary'>
					{titulo}{' '}
					{eliminable ? (
						<a
							className='text-dark'
							style={{ textDecoration: 'none', cursor: 'pointer', fontSize: '20px' }}
							onClick={() => borrarElemento(id, name)}
						>
							&times;
						</a>
					) : null}
				</span>
			</h5>
		</div>
	);
};

export default Item;

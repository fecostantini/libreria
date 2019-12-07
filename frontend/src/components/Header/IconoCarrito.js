import React, { Fragment } from 'react';

let IconoCarrito = ({ cantidadElementos }) => {
	return (
		<Fragment>
			<i className='fa fa-shopping-cart'></i> Carrito <span className='badge badge-light'>{cantidadElementos()}</span>
		</Fragment>
	);
};

export default IconoCarrito;

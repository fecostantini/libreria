import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

//componentes
import Administrar from './components/Administrar';
import EditarPerfil from './components/EditarPerfil';
import Productos from './components/Productos';
import Producto from './components/Productos/Producto';
import Header from './components/Header';
import Carrito from './components/Carrito';
import Error404 from './components/Error404';
import RealizarCheckout from './components/Carrito/RealizarCheckout';

let App = () => {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	const rutaAdministrar = <Route path='/administrar' component={Administrar} />;
	const rutaEditarPerfil = <Route path='/editar_perfil' component={EditarPerfil} key='1' />;
	const rutaCarrito = <Route path='/carrito' component={Carrito} key='2' />;
	const checkout = <Route path='/checkout' component={RealizarCheckout} />;
	return (
		<Fragment>
			<Header />
			<main className='container mt-5'>
				<Switch>
					<Route exact path='/producto/:id_producto' render={props => <Producto props={props} />} />
					{usuarioActual && usuarioActual.rol === 'ADMIN' ? rutaAdministrar : null}
					{usuarioActual ? [rutaEditarPerfil, rutaCarrito] : null}
					<Route exact path={['/', '/productos']} component={Productos} />
					{localStorage.getItem('checkoutID') ? checkout : null /* SOLO DISPONIBLE SI SE REALIZA UNA COMPRA */}
					<Route component={Error404} />
				</Switch>
			</main>
			<p className='mt-4 p2 text-center'>Todos los derechos reservados &copy;</p>
		</Fragment>
	);
};

export default App;

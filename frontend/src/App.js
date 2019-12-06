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

let App = () => {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	const rutaAdministrar = <Route path='/administrar' component={Administrar} />;
	const rutaEditarPerfil = <Route path='/editar_perfil' component={EditarPerfil} key='1' />;
	const rutaCarrito = <Route path='/carrito' component={Carrito} key='2' />;
	return (
		<Fragment>
			<Header />
			<main className='container mt-5'>
				<Switch>
					<Route exact path='/producto/:id_producto' render={props => <Producto props={props} />} />
					{usuarioActual && usuarioActual.rol === 'ADMIN' ? rutaAdministrar : null}
					{usuarioActual ? [rutaEditarPerfil, rutaCarrito] : null}
					<Route exact path='/' component={Productos} />
					<Route render={() => <h1>Error 404. Página no encontrada.</h1>} />
				</Switch>
			</main>
			<p className='mt-4 p2 text-center'>Todos los derechos reservados &copy;</p>
		</Fragment>
	);
};

export default App;

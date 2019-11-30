import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

//componentes
import Administrar from './components/Administrar';
import EditarPerfil from './components/EditarPerfil';
import Productos from './components/Productos';
import Header from './components/Header';

let App = () => {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	const rutaAdministrar = <Route path='/administrar' component={Administrar} />;
	const editarPerfil = <Route path='/editar_perfil' component={EditarPerfil} />;
	return (
		<Fragment>
			<Header />
			<main className='container mt-5'>
				<Switch>
					<Route path='/' component={Productos} />
					{usuarioActual && usuarioActual.rol === 'ADMIN' ? rutaAdministrar : null}
					{usuarioActual ? editarPerfil : null}
					<Route render={() => <h1>Error 404. Página no encontrada.</h1>} />
				</Switch>
			</main>
			<p className='mt-4 p2 text-center'>Todos los derechos reservados &copy;</p>
		</Fragment>
	);
};

export default App;

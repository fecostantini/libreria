import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
//import Zoom from 'react-reveal/Zoom';
//import Flip from 'react-reveal/Flip';

//componentes
import MostrarAutores from './components/MostrarAutores';
import Administrar from './components/Administrar';
import Header from './components/Header';

let App = () => {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const rutaAdministrar = <Route path='/administrar' component={Administrar} />;
	return (
		<Fragment>
			<Header />
			<main className='container mt-5'>
				<Switch>
					<Route exact path='/' component={() => <h1>Home</h1>} />
					{usuarioActual && usuarioActual.rol === 'ADMIN' ? rutaAdministrar : null}
					<Route path='/mostrar_autores' component={MostrarAutores} />
					<Route render={() => <h1>Error 404. Página no encontrada.</h1>} />
				</Switch>
			</main>
			<p className='mt-4 p2 text-center'>Todos los derechos reservados &copy;</p>
		</Fragment>
	);
};

export default App;

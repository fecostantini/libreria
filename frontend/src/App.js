import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store, { history } from './store';

import { ConnectedRouter as Router } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
//import Zoom from 'react-reveal/Zoom';
//import Flip from 'react-reveal/Flip';

//componentes
import MostrarAutores from './components/MostrarAutores';
import Administrar from './components/Administrar';
import Header from './components/Header';

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router history={history}>
					<Header />
					<main className='container mt-5'>
						<Switch>
							<Route exact path='/' component={() => <h1>Home</h1>} />
							<Route path='/administrar' component={Administrar} />
							<Route path='/mostrar_autores' component={MostrarAutores} />
							<Route render={() => <h1>Error 404. Página no encontrada.</h1>} />
						</Switch>
					</main>
					<p className='mt-4 p2 text-center'>
						Todos los derechos reservados &copy;
					</p>
				</Router>
			</Provider>
		);
	}
}

export default App;

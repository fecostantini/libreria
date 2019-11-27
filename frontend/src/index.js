import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store, { history } from './store';
import { ConnectedRouter as Router } from 'connected-react-router';

let Main = () => (
	<Provider store={store}>
		<Router history={history}>
			<App />
		</Router>
	</Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));

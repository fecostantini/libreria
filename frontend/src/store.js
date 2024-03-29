import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createRootReducer from './reducers';

export const history = createBrowserHistory({ forceRefresh: true }); //cada vez que se navega a una ruta se refresca la página

const initialState = {};
const middleware = [routerMiddleware(history), thunk];

const store = createStore(
	createRootReducer(history),
	initialState,
	compose(
		applyMiddleware(...middleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

export default store;

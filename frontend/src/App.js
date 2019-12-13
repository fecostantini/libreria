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
import Compras from './components/Compras';
import Pedidos from './components/Pedidos';
import PagarPedido from './components/Pedidos/PagarPedido';

let App = () => {
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);

	const rutaAdministrar = usuarioActual &&
		(usuarioActual.rol === 'ADMIN' || usuarioActual.rol === 'GESTOR_PEDIDOS') && (
			<Route path='/administrar' component={Administrar} />
		);
	const rutaEditarPerfil = <Route path='/editar_perfil' component={EditarPerfil} key='1' />;
	const rutaCarrito = <Route path='/carrito' component={Carrito} key='2' />;
	const rutaCompras = <Route path='/compras' component={Compras} key='3' />;
	const rutaPedidos = <Route path='/pedidos' component={Pedidos} key='4' />;

	const checkout = <Route path='/checkout' component={RealizarCheckout} />;
	const pagarPedido = <Route path='/pago_pedido' component={PagarPedido} />;
	return (
		<Fragment>
			<Header />
			<main className='container mt-5'>
				<Switch>
					<Route exact path='/producto/:id_producto' render={props => <Producto props={props} />} />
					{rutaAdministrar}
					{usuarioActual ? [rutaEditarPerfil, rutaCarrito, rutaCompras, rutaPedidos] : null}
					<Route exact path={['/', '/productos']} component={Productos} />
					{localStorage.getItem('checkoutID')
						? [checkout, pagarPedido]
						: null /* SOLO DISPONIBLE SI SE REALIZA UNA COMPRA */}
					<Route component={Error404} />
				</Switch>
			</main>
			<p className='mt-4 p2 text-center'>Todos los derechos reservados &copy;</p>
		</Fragment>
	);
};

export default App;

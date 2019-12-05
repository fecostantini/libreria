import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchProducto } from '../../actions/productoActions';
import { fetchPromociones } from '../../actions/promocionActions';
import { fetchCarritoActivo, añadirAlCarrito } from '../../actions/carritoActions';
import { zip, swalConfig, dateToString } from '../Common/utils';
import estados from '../../estados';
import Item from '../Common/Item';
import Swal from 'sweetalert2';

function Producto({ props }) {
	const producto = useSelector(state => state.producto.productoActual);
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const idCarritoActivo = useSelector(state => state.carrito.idCarritoActivo);
	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);
	const promociones = useSelector(state => state.promociones.items);
	const dispatch = useDispatch();

	const [cantidad, setCantidad] = useState(1);
	const [mostrarAlerta, setMostrarAlerta] = useState(false);

	useEffect(() => {
		const idProducto = parseInt(props.match.params.id_producto, 10);
		fetchProducto(dispatch, idProducto);
		fetchPromociones(dispatch);

		if (usuarioActual) fetchCarritoActivo(dispatch, usuarioActual.id_usuario);
	}, []);

	useEffect(() => {
		// solo queremos mostrar el error si mostrarAlerta es verdadero
		if (!mostrarAlerta) return;

		const swalConfigNueva = {
			...swalConfig,
			icon: statusUltimaPeticion === estados.CREADO ? 'success' : 'error'
		};

		if (statusUltimaPeticion === estados.CREADO) {
			swalConfigNueva.title = 'Se añadió el producto al carrito';
		} else if (statusUltimaPeticion === estados.YA_EXISTE)
			swalConfigNueva.title = 'Ya posee este producto en el carrito';
		else if (statusUltimaPeticion === estados.CONEXION_FALLIDA)
			swalConfigNueva.title = 'Falló la conexión a la Base de Datos';

		setMostrarAlerta(false);
		Swal.fire(swalConfigNueva);
	}, [mostrarAlerta]);

	const ProductoCard = ({ producto }) => {
		let promocion = producto.id_promocion
			? promociones.find(promo => promo.id_promocion === producto.id_promocion)
			: null;

		let itemSaga =
			producto.id_saga && producto.id_saga !== -1 ? (
				<Item
					titulo={`${producto.nombre_saga} - PRECIO: $${producto.precio_saga} - STOCK: ${producto.stock_saga}`}
					eliminable={false}
				/>
			) : (
				'no pertenece a ninguna'
			);

		let autores = [];
		let categorias = [];

		for (let [autor, nacionalidad] of zip(producto.autores, producto.nacionalidades))
			autores.push(<Item titulo={`${autor} - ${nacionalidad}`} eliminable={false} key={autor} />);
		producto.categorias.forEach(categoria => {
			categorias.push(<Item titulo={categoria} eliminable={false} key={categoria} />);
		});

		let agregarAlCarrito = () => {
			if (usuarioActual) {
				const infoProducto = {
					id_producto: producto.id_producto,
					id_carrito: idCarritoActivo,
					cantidad
				};

				añadirAlCarrito(dispatch, infoProducto).then(() => setMostrarAlerta(true));
			} else {
				Swal.fire({
					...swalConfig,
					icon: 'warning',
					title: 'Debe estar loggeado para hacer esto'
				});
			}
		};

		const ConjuntoItems = ({ texto, items }) => (
			<Container className='row p-0'>
				<Card.Text className='col-auto'>{texto}: </Card.Text>
				{items}
			</Container>
		);

		const libroCardContent = (
			<Fragment>
				<Card.Text>Idioma: {producto.idioma}</Card.Text>
				<Card.Text>Edicion: {producto.edicion}</Card.Text>
				<Card.Text>Editorial: {producto.nombre_editorial}</Card.Text>
				<ConjuntoItems texto='Categorías' items={categorias} />
				<ConjuntoItems texto='Autores' items={autores} />
				<ConjuntoItems texto='Saga' items={itemSaga} />
				<hr></hr>
			</Fragment>
		);

		return (
			<Card>
				<Card.Header as='h2'>
					<Row>
						<Col sm={9} md={9} lg={9}>
							{producto.titulo}
						</Col>
						<Col className='text-right'>
							<hr className='d-sm-none'></hr>
							<span style={producto.id_promocion ? { textDecoration: 'line-through' } : {}}>${producto.precio}</span>
							{promocion ? <span> ${producto.precio - (producto.precio * promocion.descuento) / 100}</span> : null}
						</Col>
					</Row>
				</Card.Header>

				<Card.Body>
					{promocion ? (
						<Fragment>
							<p className='text-muted font-italic'>
								Descuento vigente hasta el {dateToString(promocion.fecha_vencimiento)}
							</p>
							<hr />
						</Fragment>
					) : null}
					<Card.Title>{producto.descripcion}</Card.Title>
					<hr></hr>

					{producto.isbn ? libroCardContent : null}

					<Card.Title>Stock: {producto.stock}</Card.Title>
					<div className='row mt-3'>
						<div className='col-auto'>
							Cantidad:{' '}
							<input
								type='number'
								value={cantidad}
								onChange={e => setCantidad(e.target.value ? e.target.value : 1)}
								min='1'
								max={producto.stock}
							/>
						</div>
						<div className='col'>
							<Button block variant='primary' onClick={agregarAlCarrito}>
								Añadir al carrito
							</Button>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	};

	return (
		<Container className='justify-content-center'>
			{producto ? <ProductoCard producto={producto} /> : <Spinner animation='border' className='text-center' />}
		</Container>
	);
}

export default Producto;

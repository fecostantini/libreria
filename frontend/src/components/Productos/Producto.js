import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchProducto } from '../../actions/productoActions';
import { zip } from '../Common/utils';
import Item from '../Common/Item';
import Swal from 'sweetalert2';

const tiposProductos = {
	FOTOCOPIA: 'FOTOCOPIA',
	LIBRO: 'LIBRO'
};

function Producto({ props }) {
	const producto = useSelector(state => state.producto.productoActual);
	const usuarioActual = useSelector(state => state.usuario.usuarioActual);
	const dispatch = useDispatch();

	useEffect(() => {
		const idProducto = parseInt(props.match.params.id_producto, 10);
		fetchProducto(dispatch, idProducto);
	}, []);

	const ProductoCard = ({ producto }) => {
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
				console.log('añadiendo al carrito...');
			} else {
				Swal.fire({
					position: 'center',
					showConfirmButton: false,
					timer: 3000,
					icon: 'warning',
					title: 'Debe estar loggeado para hacer esto'
				});
			}
		};
		const botonAñadirAlCarrito = (
			<Button className='mt-3' block variant='primary' onClick={agregarAlCarrito}>
				Añadir al carrito
			</Button>
		);

		const ConjuntoItems = ({ texto, items }) => (
			<Container className='row p-0'>
				<Card.Text className='col-auto'>{texto}: </Card.Text>
				{items}
			</Container>
		);
		// atributo que solo Libro lo tiene
		if (producto.isbn) {
			return (
				<Card>
					<Card.Header as='h2'>
						<Row>
							<Col sm={9} md={9} lg={9}>
								{producto.titulo}
							</Col>
							<Col className='text-right'>${producto.precio}</Col>
						</Row>
					</Card.Header>
					<Card.Body>
						<Card.Title className='col-12'>{producto.descripcion}</Card.Title>
						<hr></hr>
						<Card.Text>Idioma: {producto.idioma}</Card.Text>
						<Card.Text>Edicion: {producto.edicion}</Card.Text>
						<Card.Text>Editorial: {producto.nombre_editorial}</Card.Text>
						<ConjuntoItems texto='Categorías' items={categorias} />
						<ConjuntoItems texto='Autores' items={autores} />
						<ConjuntoItems texto='Saga' items={itemSaga} />
						{botonAñadirAlCarrito}
					</Card.Body>
				</Card>
			);
		} else {
			return (
				<Card>
					<Card.Header as='h2'>
						<Row>
							<Col sm={9} md={9} lg={9}>
								{producto.titulo}
							</Col>
							<Col className='text-right'>${producto.precio}</Col>
						</Row>
					</Card.Header>
					<Card.Body>
						<Card.Title>{producto.descripcion}</Card.Title>
						{botonAñadirAlCarrito}
					</Card.Body>
				</Card>
			);
		}
	};
	return (
		<Container className='justify-content-center'>
			{producto ? <ProductoCard producto={producto} /> : <Spinner animation='border' className='text-center' />}
		</Container>
	);
}

export default Producto;

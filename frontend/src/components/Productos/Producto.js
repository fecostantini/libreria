import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Spinner, Row, Col, Card, Button } from 'react-bootstrap';
import { fetchFotocopias } from '../../actions/fotocopiaActions';
import { fetchLibros } from '../../actions/libroActions';

const tiposProductos = {
	FOTOCOPIA: 'FOTOCOPIA',
	LIBRO: 'LIBRO'
};

function Producto({ props }) {
	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);

	const [tipoProducto, setTipoProducto] = useState('');
	const [producto, setProducto] = useState(null);
	const libros = useSelector(state => state.libros.items);
	const fotocopias = useSelector(state => state.fotocopias.items);
	const dispatch = useDispatch();

	// cargar los autores y las categorias cuando cargue la página
	useEffect(() => {
		const buscarProducto = async () => {
			const id_producto = parseInt(props.match.params.id_producto, 10);

			fetchFotocopias(dispatch).then(() => {
				const libro = libros.find(libro => libro.id_producto === id_producto);
				if (libro) setProducto(libro);
				else {
					fetchLibros(dispatch).then(() => {
						const fotocopia = fotocopias.find(fotocopia => fotocopia.id_producto === id_producto);
						if (fotocopia) {
							setProducto(fotocopia);
						}
					});
				}
			});
		};

		buscarProducto();
	}, [libros.length, fotocopias.length]);

	const ProductoCard = ({ producto }) => {
		console.log(producto);
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
						<Card.Title>{producto.descripcion}</Card.Title>
						<hr></hr>
						<Card.Text>
							<p>Idioma: {producto.idioma}</p>
							<p>Edicion: {producto.edicion}</p>
						</Card.Text>
						<Button block variant='primary'>
							Añadir al carrito
						</Button>
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
						<hr></hr>
						<Card.Text></Card.Text>
						<Button block variant='primary'>
							Añadir al carrito
						</Button>
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

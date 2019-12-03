import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { fetchProductos } from '../../actions/productoActions';

let ProductoIndividual = ({ producto }) => {
	let history = useHistory();

	return (
		<Card
			className='mt-3 clickableCard'
			onClick={() => {
				// Redirecciona a la vista del producto individual
				history.push(`/producto/${producto.id_producto}`);
			}}
		>
			<Card.Body>
				<Card.Title>{producto.titulo}</Card.Title>
				<Card.Text>{producto.descripcion}</Card.Text>
			</Card.Body>
			<Card.Footer>Precio: ${producto.precio}</Card.Footer>
		</Card>
	);
};

function Productos() {
	// const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);
	const productos = useSelector(state => state.producto.items);
	const dispatch = useDispatch();

	// cargar los autores y las categorias cuando cargue la página
	useEffect(() => {
		fetchProductos(dispatch);
	}, []);

	return (
		<Container>
			<Row className=''>
				{productos.map(producto => (
					<Col sm={12} md={6} lg={4} key={producto.id_producto}>
						<ProductoIndividual producto={producto} />
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Productos;

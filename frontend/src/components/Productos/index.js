import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Container, CardDeck, Card, Row, Col } from 'react-bootstrap';
import { fetchProductos } from '../../actions/productoActions';

// import { Button, Modal, Col, Row, Form } from 'react-bootstrap';

let ProductoIndividual = ({ producto }) => {
	let history = useHistory();

	return (
		<Card
			className='mt-3 clickableCard'
			onClick={() => {
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
	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);
	const productos = useSelector(state => state.producto.items);
	const dispatch = useDispatch();

	// cargar los autores y las categorias cuando cargue la página
	useEffect(() => {
		fetchProductos(dispatch);
	}, []);

	let salida = [];
	productos.forEach((producto, indice) => {
		const indiceSalida = Math.floor(indice / 3);

		if (salida[indiceSalida])
			salida[indiceSalida] = salida[indiceSalida].concat([
				<ProductoIndividual key={producto.id_producto} producto={producto} />
			]);
		else salida.push([<ProductoIndividual key={producto.id_producto} producto={producto} />]);
	});

	console.log(salida);
	/**
      <Container>
			{salida.map(conjuntoProductos => (
				<CardDeck className='mt-3'>{conjuntoProductos}</CardDeck>
			))}
		</Container>
    */
	return (
		<Container>
			<Row className=''>
				{productos.map(producto => (
					<Col sm={12} md={6} lg={4}>
						<ProductoIndividual key={producto.id_producto} producto={producto} />
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Productos;

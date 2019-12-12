import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { fetchProductos } from '../../actions/productoActions';

import Buscador from './Buscador';

let ProductoIndividual = ({ producto }) => {
	let history = useHistory();

	return (
		<Card
			className='mt-3 clickableCard'
			onClick={() => {
				// Redirecciona a la vista del producto individual
				history.push(`/producto/${producto.id_producto}`);
			}}
			style={{ height: '240px' }}
		>
			<Card.Body className='text-center pb-0 pt-4'>
				<Card.Title>{producto.titulo}</Card.Title>
			</Card.Body>
			<div className='text-center my-3'>
				<Card.Img variant='top' src={producto.imagen} style={{ width: '120px' }} />
			</div>
			<Card.Footer>
				<div className='row'>
					<div className='col-6'>Precio: ${producto.precio}</div>
					<div className='col-6 text-right'>Stock: {producto.stock}</div>
				</div>
			</Card.Footer>
		</Card>
	);
};

function Productos() {
	// const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);
	const productos = useSelector(state => state.producto.items);
	const dispatch = useDispatch();
	const [busquedaTitulo, setBusquedaTitulo] = useState('');
	const [stockMinimo, setStockMinimo] = useState(0);
	const [stockMaximo, setStockMaximo] = useState(0);
	const [precioMinimo, setPrecioMinimo] = useState(0);
	const [precioMaximo, setPrecioMaximo] = useState(0);
	const [productosFiltrados, setProductosFiltrados] = useState([]);

	// cargar los autores y las categorias cuando cargue la página
	useEffect(() => {
		fetchProductos(dispatch);
	}, []);
	useEffect(() => {
		setProductosFiltrados(productos);
	}, [productos]);

	useEffect(() => {
		let productosAFiltrar = productos;

		if (busquedaTitulo)
			productosAFiltrar = productosAFiltrar.filter(producto =>
				producto.titulo.toUpperCase().includes(busquedaTitulo.toUpperCase())
			);
		if (stockMinimo) productosAFiltrar = productosAFiltrar.filter(producto => producto.stock >= stockMinimo);
		if (stockMaximo) productosAFiltrar = productosAFiltrar.filter(producto => producto.stock <= stockMaximo);
		if (precioMinimo) productosAFiltrar = productosAFiltrar.filter(producto => producto.precio >= precioMinimo);
		if (precioMaximo) productosAFiltrar = productosAFiltrar.filter(producto => producto.precio <= precioMaximo);

		setProductosFiltrados(productosAFiltrar);
	}, [busquedaTitulo, stockMinimo, stockMaximo, precioMinimo, precioMaximo]);

	return (
		<Container>
			<div className='row'>
				<div className='col-12'>
					<Buscador setBusqueda={setBusquedaTitulo} titulo='Buscar por título' placeholder='Ingrese el título' />
				</div>
				<div className='col-md-6 col-12'>
					<hr className='d-md-none mb-0' />
					<Buscador
						setBusqueda={setStockMinimo}
						titulo='Stock mayor o igual que'
						placeholder='Límite inferior'
						type='number'
					/>
				</div>
				<div className='col-md-6 col-12'>
					<Buscador
						setBusqueda={setStockMaximo}
						titulo='Stock menor o igual que'
						placeholder='Límite superior'
						type='number'
					/>
				</div>
				<div className='col-md-6 col-12'>
					<hr className='d-md-none mb-0' />
					<Buscador
						setBusqueda={setPrecioMinimo}
						titulo='Precio mayor o igual que'
						placeholder='Límite inferior'
						type='number'
					/>
				</div>
				<div className='col-md-6 col-12'>
					<Buscador
						setBusqueda={setPrecioMaximo}
						titulo='Precio menor o igual que'
						placeholder='Límite superior'
						type='number'
					/>
				</div>
			</div>

			<Row>
				{productosFiltrados.map(producto => (
					<Col sm={12} md={6} lg={4} key={producto.id_producto}>
						<ProductoIndividual producto={producto} />
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default Productos;

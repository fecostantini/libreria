import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductos } from '../../../actions/productoActions';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function ReporteStock() {
	const dispatch = useDispatch();
	const productos = useSelector(state => state.producto.items);
	const [numeroStock, setNumeroStock] = useState(10);

	useEffect(() => {
		fetchProductos(dispatch);
	}, []);

	const Fila = ({ producto }) => (
		<tr>
			<td>{producto.titulo}</td>
			<td>${producto.precio}</td>
			<td>{producto.stock}</td>
		</tr>
	);
	return (
		<div className='col'>
			<div className='text-center mb-5'>
				<span style={{ fontSize: '40px' }}>Productos con stock menor que </span>
				<input
					type='number'
					size='1'
					style={{ width: '70px', fontSize: '40px' }}
					value={numeroStock}
					onChange={e => setNumeroStock(parseInt(e.target.value, 10))}
				/>
			</div>
			<div className='row'>
				<Table id='tabla-a-excel' className='col' striped bordered hover>
					<thead>
						<tr>
							<th>Título</th>
							<th>Precio</th>
							<th>Stock</th>
						</tr>
					</thead>
					<tbody>
						{productos
							.filter(producto => producto.stock < numeroStock)
							.map(producto => (
								<Fila producto={producto} />
							))}
					</tbody>
				</Table>
			</div>
			<div className='row'>
				<ReactHTMLTableToExcel
					id='test-table-xls-button'
					className='btn btn-primary btn-block'
					table='tabla-a-excel'
					filename='reporte-stock'
					sheet='reporte-stock'
					buttonText='Descargar como Excel'
				/>
			</div>
		</div>
	);
}

export default ReporteStock;

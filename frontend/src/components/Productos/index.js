import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from 'react-bootstrap';

// import { Button, Modal, Col, Row, Form } from 'react-bootstrap';

function Productos() {
	const statusUltimaPeticion = useSelector(state => state.ultimaRequest.status);
	const dispatch = useDispatch();

	let producto = <div></div>;

	return <Container></Container>;
}

export default Productos;

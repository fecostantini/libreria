const pool = require('../database');
const estados = require('./estados');
//Para poder formatear strings
const format = require('string-format');
format.extend(String.prototype, {});

const querys = {
	GET_PEDIDOS_SIN_DECIDIR: 'select * from pedido where aceptado=false and rechazado=false;',
	GET_PEDIDOS_PAGADOS: 'select * from pedido where pagado=true;',
	GET_PEDIDOS_USUARIO: 'select * from pedido where id_usuario={};',
	PAGAR_PEDIDO: 'update pedido set pagado=true where id_pedido={};',
	INSERT: String.raw`INSERT INTO pedido("isbn","cantidad", "id_usuario") VALUES({isbn}, {cantidad}, {id_usuario}) RETURNING id_pedido, fecha_pedido, pagado, aceptado, entregado, fecha_llegada;`,
	ACEPTAR_PEDIDO: String.raw`UPDATE pedido SET aceptado=true WHERE id_pedido={};`,
	RECHAZAR_PEDIDO: String.raw`UPDATE pedido SET rechazado=true WHERE id_pedido={};`
};

let getPedidos = async tipoPedidos => {
	try {
		let response;
		if (tipoPedidos === 'SIN_DECIDIR') response = await pool.query(querys.GET_PEDIDOS_SIN_DECIDIR);
		else if (tipoPedidos === 'PAGADOS') response = await pool.query(querys.GET_PEDIDOS_PAGADOS);
		console.log(response);
		let pedidos = response.rows;
		return {
			status: pedidos ? estados.EXITO : estados.FRACASO,
			pedidos: pedidos
		};
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let pagarPedido = async idPedido => {
	try {
		let response = await pool.query(querys.PAGAR_PEDIDO.format(idPedido));

		let pedidoPagado = response.rowCount > 0;
		return {
			status: pedidoPagado ? estados.ACTUALIZADO : estados.FRACASO
		};
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let getPedidosUsuario = async idUsuario => {
	try {
		let response = await pool.query(querys.GET_PEDIDOS_USUARIO.format(idUsuario));
		const tienePedidos = response.rowCount > 0;
		let pedidos = response.rows;

		return {
			status: tienePedidos ? estados.EXITO : estados.FRACASO,
			pedidos: pedidos
		};
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let createPedido = async nuevoPedido => {
	try {
		console.log(querys.INSERT.format(nuevoPedido));
		let response = await pool.query(querys.INSERT.format(nuevoPedido));
		let filasModificadas = response.rowCount;
		let pedidoCreado = filasModificadas > 0;

		if (pedidoCreado) {
			const infoPedidoCreado = response.rows[0];
			return {
				status: estados.CREADO,
				pedido: { ...nuevoPedido, ...infoPedidoCreado }
			};
		} else return { status: estados.FRACASO };
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case estados.YA_EXISTE:
				return { status: estados.YA_EXISTE };
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

let aceptarORechazarPedido = async (idPedido, decision) => {
	try {
		let response;
		if (decision === 'ACEPTAR') response = await pool.query(querys.ACEPTAR_PEDIDO.format(idPedido));
		else if (decision === 'RECHAZAR') response = await pool.query(querys.RECHAZAR_PEDIDO.format(idPedido));

		let filasModificadas = response.rowCount;
		let pedidoActualizado = filasModificadas > 0;
		return { status: pedidoActualizado ? estados.ACTUALIZADO : estados.FRACASO };
	} catch (error) {
		console.log(error);
		switch (error.code) {
			case estados.YA_EXISTE:
				return { status: estados.YA_EXISTE };
			case estados.CONEXION_FALLIDA:
				return { status: estados.CONEXION_FALLIDA };
			default:
				return { status: estados.ERROR_DESCONOCIDO };
		}
	}
};

module.exports = { getPedidos, createPedido, aceptarORechazarPedido, getPedidosUsuario, pagarPedido };

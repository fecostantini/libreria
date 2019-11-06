import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchAutores } from '../actions/autorActions';

class MostrarAutores extends Component {
	componentDidMount() {
		this.props.fetchAutores();
	}

	render() {
		const autores = this.props.autores.map(autor => (
			<div key={autor.id_autor}>
				<h3>Autor: {autor.autor}</h3>
				<p>Nacionalidad: {autor.nacionalidad}</p>
			</div>
		));
		return (
			<div>
				<h1>Autores</h1>
				{autores}
			</div>
		);
	}
}

MostrarAutores.propTypes = {
	fetchAutores: PropTypes.func.isRequired,
	autores: PropTypes.array.isRequired
};

const mapStateToProps = state => {
	// la palabra autores en state.autores es el nombre que pusimos en index.js en la carpeta reducers.
	// items es el nombre que le asignamos en el reducer de autores.
	return { autores: state.autores.items };
};
export default connect(
	mapStateToProps,
	{ fetchAutores }
)(MostrarAutores);

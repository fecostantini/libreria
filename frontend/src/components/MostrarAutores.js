import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAutores } from '../actions/autorActions';

class MostrarAutores extends Component {
	UNSAFE_componentWillMount() {
		this.props.fetchAutores();
	}

	render() {
		const autores = null; /*this.props.autores.map(autor => (
			<div key={autor.id_autor}>
				<h3>Autor: {autor.autor}</h3>
				<p>Nacionalidad: {autor.nacionalidad}</p>
			</div>
		));*/
		return (
			<div>
				<h1>Autores</h1>
				{autores}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	// la palabra autores en state.autores es el nombre que pusimos en index.js en la carpeta reducers.
	// items es el nombre que le asignamos en el reducer de autores.
	autores: state.autores.items
});
export default connect(
	null,
	{ fetchAutores }
)(MostrarAutores);

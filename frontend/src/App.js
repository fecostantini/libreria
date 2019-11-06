import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';
//import Zoom from 'react-reveal/Zoom';
//import Flip from 'react-reveal/Flip';

//componentes
import MostrarAutores from './components/MostrarAutores';

class App extends Component {
	componentDidMount() {}
	/*
	constructor() {
		super();
		this.state = {
			libro: {
				isbn: 0,
				titulo: '',
				idioma: '',
				edicion: '',
				descripcion: '',
				stock_libro: 0
			},
			libros: []
		};
	}

	async handleSubmit(form) {
		form.preventDefault();

		const {
			isbn,
			titulo,
			idioma,
			edicion,
			descripcion,
			stock_libro
		} = this.state.libro;

		if (
			isbn !== 0 &&
			titulo !== '' &&
			idioma !== '' &&
			edicion !== '' &&
			descripcion !== '' &&
			stock_libro !== 0
		) {
			var url = 'http://localhost:3210/Libro';
			let respuesta = await axios.post(url, {
				isbn,
				titulo,
				idioma,
				edicion,
				descripcion,
				stock_libro
			});
			console.log(respuesta);
			if (respuesta.data.creado) {
				this.setState({
					libros: [...this.state.libros, this.state.libro]
				});
			}
		}
	}

	handleChange = e => {
		this.setState({
			libro: {
				...this.state.libro,
				[e.target.name]: e.target.value
			}
		});
		console.log(this.state.libro);
	};

	getLibros(e) {
		e.preventDefault();
		var url = 'http://localhost:3210/Libro';
		axios.get(url).then(resp => {
			console.log(resp.data);
			this.setState({
				libros: resp.data
			});
		});
	}
  */
	render() {
		/*
		const librosObtenidos = this.state.libros.map((libro, index) => {
			const text = `Titulo: ${libro.titulo} ISBN: ${libro.isbn}`;
			return <p key={index}>{text}</p>;
		});
    */
		return (
			<Provider store={store}>
				<MostrarAutores />
			</Provider>
		);
	}
}

/*
<div className='card mt-5 py-5'>
					<div className='card-body'>
						<h2 className='card-title text-center mb-5'>Crear nuevo Libro</h2>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<div className='form-group row'>
								<label className='col-sm-4 col-lg-2 col-form-label'>ISBN</label>
								<div className='col-sm-8 col-lg-4'>
									<input
										type='number'
										className='form-control'
										name='isbn'
										onChange={this.handleChange}
										value={this.state.libro.isbn}
									/>
								</div>
							</div>

							<div className='form-group row'>
								<label className='col-sm-4 col-lg-2 col-form-label'>
									Titulo
								</label>
								<div className='col-sm-8 col-lg-4'>
									<input
										type='text'
										className='form-control'
										name='titulo'
										onChange={this.handleChange}
										value={this.state.libro.titulo}
									/>
								</div>
							</div>

							<div className='form-group row'>
								<label className='col-sm-4 col-lg-2 col-form-label'>
									Idioma
								</label>
								<div className='col-sm-8 col-lg-4'>
									<input
										type='text'
										className='form-control'
										name='idioma'
										onChange={this.handleChange}
										value={this.state.libro.idioma}
									/>
								</div>
							</div>

							<div className='form-group row'>
								<label className='col-sm-4 col-lg-2 col-form-label'>
									Edicion
								</label>
								<div className='col-sm-8 col-lg-4'>
									<input
										type='text'
										className='form-control'
										name='edicion'
										onChange={this.handleChange}
										value={this.state.libro.edicion}
									/>
								</div>
							</div>

							<div className='form-group row'>
								<label className='col-sm-4 col-lg-2 col-form-label'>
									Descripcion
								</label>
								<div className='col-sm-8 col-lg-4'>
									<textarea
										type='text'
										className='form-control'
										name='descripcion'
										onChange={this.handleChange}
										value={this.state.libro.descripcion}
									/>
								</div>
							</div>

							<div className='form-group row'>
								<label className='col-sm-4 col-lg-2 col-form-label'>
									Stock
								</label>
								<div className='col-sm-8 col-lg-4'>
									<input
										type='number'
										className='form-control'
										name='stock_libro'
										onChange={this.handleChange}
										value={this.state.libro.stock_libro}
									/>
								</div>
							</div>

							<input
								type='submit'
								className='py-3 mt-2 btn btn-success btn-block'
								value='Agregar Libro'
							/>
							<button
								className='py-3 mt-2 btn btn-success btn-block'
								onClick={this.getLibros.bind(this)}
							>
								Get Libros
							</button>
						</form>

						<div>{librosObtenidos}</div>
					</div>
				</div>
*/

export default App;

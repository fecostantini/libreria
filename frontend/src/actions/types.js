// acciones de autores
export const FETCH_AUTORES = 'FETCH_AUTORES';
export const CREATE_AUTOR = 'CREATE_AUTOR';
export const DELETE_AUTOR = 'DELETE_AUTOR';
export const UPDATE_AUTOR = 'DELETE_AUTOR';

// acciones de categoria
export const FETCH_CATEGORIAS = 'FETCH_CATEGORIAS';
export const CREATE_CATEGORIA = 'CREATE_CATEGORIA';

// acciones de saga
export const FETCH_SAGAS = 'FETCH_SAGAS';
export const CREATE_SAGA = 'CREATE_SAGA';

// acciones de editorial
export const FETCH_EDITORIALES = 'FETCH_EDITORIALES';
export const CREATE_EDITORIAL = 'CREATE_EDITORIAL';

// acciones de promocion
export const FETCH_PROMOCIONES = 'FETCH_PROMOCIONES';

// acciones de libro
export const FETCH_LIBROS = 'FETCH_LIBROS';
export const GET_VALORACION_LIBRO = 'GET_VALORACION_LIBRO';
export const VALORAR_LIBRO = 'VALORAR_LIBRO';
export const GET_VALORACION_PROMEDIO_LIBRO = 'GET_VALORACION_PROMEDIO_LIBRO';

// acciones de fotocopia
export const FETCH_FOTOCOPIAS = 'FETCH_FOTOCOPIAS';

// acciones de carrito
export const AÑADIR_AL_CARRITO = 'AÑADIR_AL_CARRITO';
export const ELIMINAR_DEL_CARRITO = 'ELIMINAR_DEL_CARRITO';
export const FETCH_CARRITO_ACTIVO = 'FETCH_CARRITO_ACTIVO';
export const FETCH_ELEMENTOS_CARRITO = 'FETCH_ELEMENTOS_CARRITO';
export const REALIZAR_CHECKOUT = 'REALIZAR_CHECKOUT';
export const FETCH_COMPRAS_USUARIO = 'FETCH_COMPRAS_USUARIO';

// acciones de usuario
export const SET_USUARIO_ACTUAL = 'SET_USUARIO_ACTUAL';
export const UPDATE_USUARIO = 'SET_USUARIO_ACTUAL';

//acciones de pedido
export const FETCH_PEDIDOS = 'FETCH_PEDIDOS';
export const FETCH_PEDIDOS_USUARIO = 'FETCH_PEDIDOS_USUARIO';
export const CREATE_PEDIDO = 'CREATE_PEDIDO';
export const ACEPTAR_PEDIDO = 'ACEPTAR_PEDIDO';
export const RECHAZAR_PEDIDO = 'RECHAZAR_PEDIDO';
export const SET_FECHA_LLEGADA_PEDIDO = 'SET_FECHA_LLEGADA_PEDIDO';

// status global de la ultima request que se realizó al backend
export const UPDATE_LAST_REQUEST_STATUS = 'UPDATE_LAST_REQUEST_STATUS';

export const UPDATE_PRODUCTO_FORMULARIO = 'UPDATE_PRODUCTO_FORMULARIO';
export const UPDATE_PRODUCTO_BBDD = 'UPDATE_PRODUCTO_BBDD';
export const FETCH_PRODUCTOS = 'FETCH_PRODUCTOS';
export const FETCH_PRODUCTO = 'FETCH_PRODUCTO';
export const CREATE_PRODUCTO = 'CREATE_PRODUCTO';
export const RESET_PRODUCTO = 'RESET_PRODUCTO';
export const DELETE_PRODUCTO = 'DELETE_PRODUCTO';

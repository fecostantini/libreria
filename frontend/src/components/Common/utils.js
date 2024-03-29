export const ordenar = (campo, creciente = false) => {
	return (a, b) => {
		if (a[campo] > b[campo]) return creciente ? -1 : 1;
		if (a[campo] < b[campo]) return creciente ? 1 : -1;
		return 0;
	};
};

// Permite recorrer dos arrays del mismo tamaño al mismo tiempo, básicamente un foreach doble.
export var zip = (a, b) => a.map((x, i) => [x, b[i]]);
/*
Ejemplo: 
  for (let [a, b] of zip(lista1, lista2))
     console.log(a + b); 
*/

export let swalConfig = {
	position: 'center',
	showConfirmButton: false,
	timer: 3000
};

export let dateToString = dateStr => {
	const date = new Date(dateStr);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const estados = {
	CREADO: 'CREADO',
	ACTUALIZADO: 'ACTUALIZADO',
	BORRADO: 'BORRADO',
	EXITO: 'EXITO',
	FRACASO: 'FRACASO',
	YA_EXISTE: '23505',
	CONEXION_FALLIDA: 'ECONNREFUSED',
	ERROR_DESCONOCIDO: 'ERROR_DESCONOCIDO',
	CONTRASEÑA_INCORRECTA: 'CONTRASEÑA_INCORRECTA'
};

export function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

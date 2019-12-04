export const ordenar = campo => {
	return (a, b) => {
		if (a[campo] > b[campo]) return 1;
		if (a[campo] < b[campo]) return -1;
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

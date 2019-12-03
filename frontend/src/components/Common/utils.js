export const ordenar = campo => {
	return (a, b) => {
		if (a[campo] > b[campo]) return 1;
		if (a[campo] < b[campo]) return -1;
		return 0;
	};
};

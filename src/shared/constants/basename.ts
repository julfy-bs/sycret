export const basename =
	import.meta.env.MODE === 'development' ? '/' : import.meta.env.BASE_URL;

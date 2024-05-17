import { instance } from '../helpers/axiosInstance';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';


export const useFetchFilms = <T>(searchTerm: string = '', handleFetch?: boolean) => {
	const [data, setData] = useState<T[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [debounce, setDebounce] = useState(searchTerm);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebounce(searchTerm);
		}, 500);
		return () => {
			clearTimeout(timeout);
		};
	}, [searchTerm]);

	  const fetchFilms = useCallback(async () => {
			setLoading(true);
			try {
				// const url = 'https://moviesdatabase.p.rapidapi.com/titles?page=3&limit=15';
				const response = searchTerm
					? await instance.get(`titles/search/title/${searchTerm}?exact=false`)
					: await instance.get('/titles?page=2&limit=15');
				setData(response.data.results);
			} catch (error) {
				if (error instanceof AxiosError) {
					setError(error.message);
				}
			} finally {
				setLoading(false);
			}
		}, [searchTerm]);

		useEffect(() => {
			if (handleFetch) {
				fetchFilms();
			}
		}, [fetchFilms, handleFetch]);

	useEffect(() => {
		fetchFilms();
	}, [debounce]);

	return { data, error, loading, fetchFilms };
};
// export const useFetchFilms = <T>(url: string, method: 'GET') => {
// 	const [data, setData] = useState<T[] | T>([]);
// 	const [error, setError] = useState<string>('');
// 	const [loading, setLoading] = useState<boolean>(false);

// 	const fetchData = async () => {
// 		try {
// 			setLoading(true);
// 			const res = await instance.get(url, {
// 				method,
// 			});
// 			setData(res.data.results);
// 		} catch (error) {
// 			if (error instanceof AxiosError) {
// 				setError(error.message);
// 				setLoading(false);
// 			}
// 		} finally {
// 			setLoading(() => false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchData();
// 	}, []);

// 	return { data, error, loading };
// };

export const useFetchFilmById = <T>(url: string, method: 'GET') => {
	const [data, setData] = useState<T>();
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const fetchData = async () => {
		try {
			setLoading(true);
			const res = await instance.get(url, {
				method,
			});
			setData(res.data.results);
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.message);
				setLoading(false);
			}
		} finally {
			setLoading(() => false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, error, loading };
};

export const useFetchFilmByName = <T>(url: string, method: 'GET') => {
	const [data, setData] = useState<T>();
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const fetchData = async () => {
		try {
			setLoading(true);
			const res = await instance.get(url, {
				method,
			});
			setData(res.data.results);
		} catch (error) {
			if (error instanceof AxiosError) {
				setError(error.message);
				setLoading(false);
			}
		} finally {
			setLoading(() => false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, error, loading };
};

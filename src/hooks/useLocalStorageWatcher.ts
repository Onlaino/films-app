import { useState, useEffect } from 'react';

export const useLocalStorageWatcher = (key: string) => {
	const [storageChange, setStorageChange] = useState(localStorage.getItem(key));

	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key) {
				setStorageChange(localStorage.getItem(key));
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => window.removeEventListener('storage', handleStorageChange);
	}, [key]);

	return storageChange;
};


const getFilmsFromLocalStorage = (key: string) => {
	const films = localStorage.getItem(key);
	return films ? JSON.parse(films) : null;
};

export function useLocalStorageFilms(key: string) {
	const [films, setFilms] = useState(() => getFilmsFromLocalStorage(key));

	useEffect(() => {
		const handleStorageChange = () => {
			setFilms(getFilmsFromLocalStorage(key));
		};

		window.addEventListener('storage', handleStorageChange);

		const unsubscribe = () => {
			window.removeEventListener('storage', handleStorageChange);
		};

		return unsubscribe;
	}, [key]);

	return [films, setFilms];
}

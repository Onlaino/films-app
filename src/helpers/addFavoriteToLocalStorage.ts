import { IFilm } from "../interfaces/film.interface";

export const addFavoriteToLocalStorage = (film: IFilm, name: string): void => {
	const films = JSON.parse(localStorage.getItem(name) || '[]');
	const addedFilm = films.find((f: IFilm) => f.id === film.id);
	if (!addedFilm) {
		films.push(film);
		localStorage.setItem(name, JSON.stringify(films));
	}
};
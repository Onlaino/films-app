import { IFilm } from "../../interfaces/film.interface";

export interface FilmListProps {
	filteredFilms?: IFilm[];
	findFilm: string;
}

export interface RenderedItems {
	id: string;
	imgId: string;
	title: string;
	rating: string;
}
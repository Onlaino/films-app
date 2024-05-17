import { IFilm } from "../../interfaces/film.interface";

export interface IAddFilm {
	id?: string | undefined;
	title?: string | undefined;
	imgId?: string | undefined;
	releaseDate?: string | undefined;
	releaseYear?: string | undefined;
	isAdded?: boolean;
}
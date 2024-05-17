import { IFilm } from "../../interfaces/film.interface";

export interface FilmItemProps {
	id: string;
	propIsAdded?: boolean;
	onRemove?: (id: string) => IFilm[];
	imgId: string;
	title: string;
	rating: string;
	releaseDate?: object;
	releaseYear?: {
		endYear: null | number;
		year: number;
		__typename: string;
	};
}
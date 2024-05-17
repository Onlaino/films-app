import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilm } from "../interfaces/film.interface";

interface FilmState {
	filmsByUser: Record<string, IFilm[]>;
}

const initialState: FilmState = {
	filmsByUser: {},
};

const filmSlice = createSlice({
	name: 'films',
	initialState,
	reducers: {
		addFilmForUser: (
			state,
			action: PayloadAction<{ userId: string; film: IFilm }>
		) => {
			const { userId, film } = action.payload;
			if (!state.filmsByUser[userId]) {
				state.filmsByUser[userId] = [];
			}
			state.filmsByUser[userId].push(film);
		},
		removeFilmForUser: (
			state,
			action: PayloadAction<{ userId: string; filmId: string }>
		) => {
			const { userId, filmId } = action.payload;
			const userFilms = state.filmsByUser[userId];
			if (userFilms) {
				state.filmsByUser[userId] = userFilms.filter(
					(film) => film.id !== filmId
				);
			}
		},
	},
});

export const filmActions = filmSlice.actions;
export default filmSlice.reducer;

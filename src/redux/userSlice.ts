import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFilm } from "../interfaces/film.interface";

interface IUserState {
	name: string;
	isLogined: boolean;
	jwt: string;
	favoriteFilms: IFilm[];
}

const initialState: IUserState = {
	name: '',
	isLogined: false,
	jwt: '',
	favoriteFilms: []
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.name = action.payload.name;
			state.isLogined = true;
			state.jwt = 'auth';
			state.favoriteFilms = [];
		},
		logout: (state) => {
			state.name = '';
			state.isLogined = false;
			state.jwt = ''
		},
		addFavoriteFilm: (state, action: PayloadAction<IFilm>) => {
			state.favoriteFilms.push(action.payload);
		},
		removeFromFavorites: (state, action: PayloadAction<string>) => {
			state.favoriteFilms = state.favoriteFilms.filter(
				(fl) => fl.id !== action.payload
			);
		},
	},
});



export default userSlice.reducer;
export const userActions = userSlice.actions;
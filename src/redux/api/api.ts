import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const filmsApi = createApi({
	reducerPath: 'filmsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://moviesdatabase.p.rapidapi.com',
		prepareHeaders: (headers) => {
			headers.set('X-RapidAPI-Key', 'a990caa5d1msh553b1cc7736967ap1fb16ejsnfd7c2d8ab4b6')
			headers.set('X-RapidAPI-Host', 'moviesdatabase.p.rapidapi.com')
			return headers;
		}
	}),
	endpoints: (build) => ({
		getFilms: build.query({
			query: () => `/titles?page=10&limit=15`,
		}),
		getFilmsById: build.query({
			query: (id: string) => `/titles/${id}`,
		}),
		findFilmsByName: build.query({
			query: (findName: string) => `titles/search/title/${findName}?exact=false`,
		}),
	}),
});

export const {
	useGetFilmsQuery,
	useGetFilmsByIdQuery,
	useFindFilmsByNameQuery,
} = filmsApi;

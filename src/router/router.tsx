import { createBrowserRouter, defer } from 'react-router-dom';
import { Layout } from '../layout/Layout/Layout';
import { MainPage } from '../pages/MainPage/MainPage';
import { FavoritesFilms } from '../pages/FavoritesFilms/FavoritesFilms';
import { Film } from '../pages/Film/Film';
import { Login } from '../pages/Login/Login';
import { AxiosError } from 'axios';
import { RequireAuth } from '../helpers/RequireAuth';
import { instance } from '../helpers/axiosInstance';

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: '/favorites',
				element: <FavoritesFilms />,
			},
			{
				path: '/film/:id',
				element: <Film />,
				loader: async ({ params }) => {
					try {
						const response = await instance.get(`/titles/${params.id}`);
						return defer({ data: response.data.results });
					} catch (e) {
						if (e instanceof AxiosError) {
							throw new Error(e.message);
						}
					}
				},
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

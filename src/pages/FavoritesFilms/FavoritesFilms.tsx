import cl from './FavoritesFilms.module.css';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Heading } from '../../components/Heading/Heading';
import { FilmListItem } from '../../components/FilmItem/FilmItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export const FavoritesFilms: FC = () => {
	const [favoriteFilms, setFavoriteFilms] = useState<any[] | ReactNode>([]);
	const persistedUser = useSelector((s: RootState) => s.user);
	const persistFilms = useSelector((s: RootState) => s.film.filmsByUser);
	const noFavoriteFilms = (
		<div className={cl.noFavorite}>
			<h3>Вы еще не добавили фильмы в избранное!</h3>
		</div>
	);

	useEffect(() => {
		if (persistFilms && persistFilms[`${persistedUser.name}`]) {
			setFavoriteFilms(persistFilms[`${persistedUser.name}`]);
		} else {
			setFavoriteFilms(noFavoriteFilms);
		}
	}, [persistFilms, persistedUser]);

	return (
		<>
			<Heading>Избранное</Heading>
			<div className={cl.filmList}>
				{Array.isArray(favoriteFilms) && favoriteFilms.length > 0
					? favoriteFilms.map((fl) => (
							<FilmListItem
								id={fl.id}
								rating='300'
								title={fl.title}
								key={fl.id}
								imgId={fl.imgId}
								propIsAdded={fl.isAdded}
							/>
					  ))
					: noFavoriteFilms}
			</div>
		</>
	);
};

import cl from './FilmItem.module.css';
import { FC, useState } from 'react';
import { Paragraph } from '../Paragraph/Paragraph';
import { RatingBlock } from '../RatingBlock/RatingBlock';
import { InSelect } from '../InSelect/InSelect';
import { FilmImage } from '../FilmImage/FilmImage';
import { FilmItemProps } from './filmItem.props';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { filmActions } from '../../redux/filmSlice';
import { IFilm } from '../../interfaces/film.interface';
import { userActions } from '../../redux/userSlice';
import { addFavoriteToLocalStorage } from '../../helpers/addFavoriteToLocalStorage';

export const FilmListItem: FC<FilmItemProps> = ({
	imgId,
	title,
	rating,
	id,
	releaseYear,
	releaseDate,
	propIsAdded,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isAdded, setIsAdded] = useState(propIsAdded);
	const userPersistName = useSelector((s: RootState) => s.user.name);
	const persistUser = useSelector((s: RootState) => s.user);



	const addFavorite = (id: string) => {
		const addFilm = {
			id,
			title,
			imgId,
			releaseDate,
			releaseYear,
			isAdded: true,
		};
		addFavoriteToLocalStorage(addFilm, userPersistName);
		dispatch(
			filmActions.addFilmForUser({ userId: userPersistName, film: addFilm })
		);
		setIsAdded(true);
	};

	const removeFavorite = (id: string) => {
		setIsAdded(false);
		dispatch(userActions.removeFromFavorites(id));
		dispatch(filmActions.removeFilmForUser({ userId: persistUser.name, filmId: id}));
		setIsAdded(false);
	};

	return (
		<div className={cl.filmListItems}>
			<div className={cl.filmListItem}>
				<RatingBlock rating={rating} />
				<Link to={`/film/${id}`}>
					<FilmImage clazz={cl.filmImage} imgId={imgId} title={title} />
				</Link>
				<Paragraph clazz={cl.filmItemParagraphTitle}>{title}</Paragraph>
				<InSelect
					isAdded={isAdded}
					onClick={() => (isAdded ? removeFavorite(id) : addFavorite(id))}
				/>
			</div>
		</div>
	);
};

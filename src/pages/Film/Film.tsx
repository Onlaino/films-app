import cl from './Film.module.css';
import { useParams } from 'react-router-dom';
import { Heading } from '../../components/Heading/Heading';
import { Paragraph } from '../../components/Paragraph/Paragraph';
import { LoadingComponent } from '../../components/LoadingComponent/LoadingComponent';
import { useEffect, useState } from 'react';
import { useGetFilmsByIdQuery } from '../../redux/api/api';
import { RatingBlock } from '../../components/RatingBlock/RatingBlock';
import { InSelect } from '../../components/InSelect/InSelect';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { userActions } from '../../redux/userSlice';
import { filmActions } from '../../redux/filmSlice';
import { addFavoriteToLocalStorage } from '../../helpers/addFavoriteToLocalStorage';

export const Film = () => {
	const dispatch = useDispatch<AppDispatch>();
	const persistUser = useSelector((s: RootState) => s.user);
	const params = useParams();
	const filmId = params.id ?? '';
	const [filmById, setFilmById] = useState<any>();
	const {
		data: fetchedFilmById,
		isError,
		isLoading,
		isSuccess,
	} = useGetFilmsByIdQuery(filmId);
	const [isAdded, setIsAdded] = useState<boolean>(false);

	const addFavorite = () => {
		const addFilm = {
			id: filmById?.id,
			title: filmById?.originalTitleText?.text,
			imgId: filmById?.primaryImage?.url,
			releaseDate: filmById?.releaseDate,
			releaseYear: filmById?.releaseYear?.year,
			isAdded: true,
		};
		addFavoriteToLocalStorage(addFilm, persistUser.name);
		dispatch(
			filmActions.addFilmForUser({ userId: persistUser.name, film: addFilm })
		);
		setIsAdded(true);
	};

	const removeFavorite = (id: string) => {
		setIsAdded(false);
		dispatch(userActions.removeFromFavorites(id));
		dispatch(
			filmActions.removeFilmForUser({ userId: persistUser.name, filmId: id })
		);
		setIsAdded(false);
	};

	useEffect(() => {
		if (isSuccess && fetchedFilmById) {
			setFilmById(fetchedFilmById.results);
		}
	}, [fetchedFilmById]);
	console.log(filmById);

	return (
		<>
			{isLoading && <LoadingComponent />}
			{isError && <h3>Произошла ошибка при загрузке фильма...</h3>}
			<div className={cl.film}>
				<div className={cl.head}>
					<Paragraph clazz={cl.paragraph}>Поиск фильмов</Paragraph>
					<Heading clazz={cl.heading}>
						{filmById?.originalTitleText?.text}
					</Heading>
				</div>
				<div className={cl.filmInfo}>
					<div className={cl.filmImage}>
						<img src={filmById?.primaryImage?.url} alt='Film Poster' />
					</div>
					<div className={cl.filmInfoText}>
						<div className={cl.filmText}>
							<Paragraph>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Consectetur suscipit numquam ducimus pariatur facere. Dolorem
								libero molestias earum laudantium error! Consectetur architecto
								autem aliquid aspernatur eveniet, ex aut adipisci explicabo.
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
								facilis corporis quae, consequatur quidem id sequi officia nam
								voluptatem esse assumenda ipsa dolor aliquid et, molestiae
								ratione perspiciatis neque nisi.
							</Paragraph>
							<div className={cl.rating}>
								<RatingBlock clazz={cl.ratingBlock} rating='300' />
								<InSelect
									isAdded={isAdded}
									onClick={() =>
										isAdded ? removeFavorite(filmById?.id) : addFavorite()
									}
								/>
							</div>
							<Paragraph clazz={cl.p}>
								Тип: <span>Movie</span>
							</Paragraph>
							<Paragraph clazz={cl.p}>
								Дата выхода: <span>{filmById?.releaseYear?.year}</span>
							</Paragraph>
							<Paragraph clazz={cl.p}>
								Длительность: <span>180 минут</span>
							</Paragraph>
						</div>
					</div>
				</div>
				<div className={cl.feedBack}></div>
				<Paragraph style={{ marginLeft: 10, marginBottom: 15 }}>
					Отзывы
				</Paragraph>
				<div className={cl.head}>
					<div className={cl.feedBackText}>
						<div className={cl.feedBackTitle}>
							Not as good as infinity war..
						</div>
						<Paragraph>
							But its a pretty good film. A bit of a mess in some parts, lacking
							the cohesive and effortless feel infinity war somehow managed to
							accomplish. Some silly plot holes and characters that
							could&apos;ve been cut (Ahem, captain marvel and thanos). The use
							of Captain marvel in this film was just ridiculous. Shes there at
							the start, bails for some reason? And then pops up at the end to
							serve no purpose but deux ex machina a space ship...
						</Paragraph>
					</div>
				</div>
			</div>
		</>
	);
};

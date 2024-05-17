import cl from './FilmList.module.css';
import { useEffect, useState } from 'react';
import { IFilm } from '../../interfaces/film.interface';
import { FilmListItem } from '../FilmItem/FilmItem';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { FilmListProps } from './filmList.types';
import { Heading } from '../Heading/Heading';
import { Paragraph } from '../Paragraph/Paragraph';
import { useFindFilmsByNameQuery, useGetFilmsQuery } from '../../redux/api/api';

export const FilmList = ({ findFilm }: FilmListProps) => {
	const [films, setFilms] = useState<IFilm[]>([]);
	const { data: allData, isLoading, isError } = useGetFilmsQuery('');
	const { data: filteredData } = useFindFilmsByNameQuery(findFilm, {
		skip: !findFilm.length,
	});

	useEffect(() => {
		if (findFilm?.length && filteredData) {
			setFilms(filteredData.results || []);
		}
	}, [filteredData, findFilm]);

	useEffect(() => {
		if ((!findFilm || !findFilm.length) && allData) {
			setFilms(allData.results || []);
		}
	}, [allData, findFilm]);

	return (
		<>
			{isLoading && <LoadingComponent />}
			{isError && <h3>Произошла ошибка при загрузке фильмов</h3>}
			{!isLoading && !films.length && (
				<div className={cl.oops}>
					<Heading clazz={cl.heading}>
						Упс... Ничего не найдено
						<Paragraph clazz={cl.paragraph}>
							Попробуйте изменить запрос или ввести более точное <br /> название
							фильма
						</Paragraph>
					</Heading>
				</div>
			)}
			{films.length > 0 && (
				<div className={cl.filmList}>
					{films.map((item) => (
						<FilmListItem
							id={item.id}
							key={item.id}
							title={item.titleText?.text ? item.titleText?.text : ''}
							releaseYear={item.releaseYear}
							releaseDate={item.releaseDate}
							imgId={
								item.primaryImage?.url
									? item.primaryImage?.url
									: 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
							}
							rating={'300'}
						/>
					))}
				</div>
			)}
		</>
	);
};

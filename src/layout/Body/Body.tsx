import cl from './Body.module.css';
import { Heading } from '../../components/Heading/Heading';
import { Button } from '../../components/Button/Button';
import { Search } from '../../components/Search/Search';
import { Paragraph } from '../../components/Paragraph/Paragraph';
import { FilmList } from '../../components/FilmList/FilmList';
import { memo, useState } from 'react';

export const Body = memo(() => {
	const [findFilm, setFindFilm] = useState<string>('');

	const handleChangeFetch = () => {
		setFindFilm(findFilm.trim());
	};

	return (
		<div className={cl.body}>
			<div className={cl.bodyHeader}>
				<Heading>Поиск</Heading>
				<Paragraph clazz={cl.bodyParagraph}>
					Введите название фильма, сериала или мультфильма для поиска и
					добавления в избранное.
				</Paragraph>
			</div>
			<div className={cl.bodyInput}>
				<Search
					required
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleChangeFetch();
						}
					}}
					value={findFilm}
					onChange={(e) => setFindFilm(e.target.value)}
					placeholder={'Введите название'}
				>
					<img src='/search.svg' alt='Иконка пользователя' />
					{findFilm.length > 0 ? (
						<button className={cl.clearInput} onClick={() => setFindFilm('')}>
							&#10006;
						</button>
					) : null}
				</Search>
				<Button onClick={handleChangeFetch}>Искать</Button>
			</div>
			<FilmList findFilm={findFilm} />
		</div>
	);
});

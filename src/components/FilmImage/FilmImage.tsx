import { FC } from 'react';
import './FilmImage.css';
import { FilmImageProps } from './filmImage.props';

export const FilmImage: FC<FilmImageProps> = ({imgId, title, clazz}) => {
	return (
		<img className={clazz} src={imgId} alt={title} />
	)
}
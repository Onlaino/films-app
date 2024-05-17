import cl from './RatingBlock.module.css';

import { Paragraph } from '../Paragraph/Paragraph';
import { FC } from 'react';
import { RatingBlockProps } from './ratingBlock.props';

export const RatingBlock: FC<RatingBlockProps> = ({ rating, clazz }) => {
	return (
		<div className={clazz ? clazz : cl.ratingBlock}>
			<img src='/rating.svg' alt='rating' />
			<Paragraph clazz={cl.ratingBlockParagraph}>{rating}</Paragraph>
		</div>
	);
};

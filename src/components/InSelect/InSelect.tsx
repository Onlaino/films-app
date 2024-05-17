import cl from './InSelect.module.css';
import cn from 'classnames';
import { Paragraph } from '../Paragraph/Paragraph';
import { IInSelectProps } from './inSelect.props';

export const InSelect = ({ onClick, isAdded, ...props }: IInSelectProps) => {
	return (
		<div
			{...props}
			className={cn(cl.select, {
				[cl.added]: isAdded,
			})}
			onClick={onClick}
		>
			{isAdded ? (
				<img src='/inFavorites.svg' alt='inFavorites' />
			) : (
				<img src='/like.svg' alt='like' />
			)}
			<Paragraph
				clazz={cn(cl.selectParargaph, {
					[cl.added]: isAdded,
				})}
			>
				{isAdded ? 'В избранном' : 'В избранное'}
			</Paragraph>
		</div>
	);
};

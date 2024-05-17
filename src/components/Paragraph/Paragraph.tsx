import cl from './Paragraph.module.css';
import cn from 'classnames'
import { FC } from 'react';
import { ParagraphProps } from './paragraph.props';

export const Paragraph: FC<ParagraphProps> = ({clazz, children, ...props}) => {
	return (
		<p {...props} className={clazz ? `${clazz} ${cl.paragraph}` : cl.paragraph}>
			{children}
		</p>
	);
};
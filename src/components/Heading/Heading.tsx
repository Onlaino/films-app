import { FC } from 'react';
import cl from './Heading.module.css';
import { HeadingProps } from './heading.props';

export const Heading: FC<HeadingProps> = ({ clazz, children }) => {
	return <h1 className={clazz ? clazz : cl.heading}>{children}</h1>;
};

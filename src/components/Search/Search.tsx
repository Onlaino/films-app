import cl from './Search.module.css';
import { forwardRef } from 'react';
import { SearchProps } from './search.props';

export const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
	{ children, placeholder, value, onChange, ...props },
	ref
) {
	return (
		<div className={cl.search}>
			{children}
			<input
				{...props}
				value={value}
				onChange={onChange}
				className={cl.searchInput}
				type='text'
				placeholder={placeholder}
				ref={ref}
			/>
		</div>
	);
});

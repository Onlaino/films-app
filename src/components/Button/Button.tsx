import cl from './Button.module.css';
import cn from 'classnames';
import { forwardRef } from 'react';
import { ButtonProps } from './button.props';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ children, onClick, variant },
	ref
) {
	return (
		<button
			className={cn(cl.button, {
				[cl.buttonTransparent]: variant === 'transparent',
				[cl.buttonPrimary] : variant === 'primary',
			})}
			onClick={onClick}
			ref={ref}
		>
			{children}
		</button>
	);
});

import cl from './Login.module.css';
import { FC, useEffect } from 'react';
import { SingInForm } from '../../components/SignInForm/SingInForm';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
	const navigate = useNavigate();
	const jwt = localStorage.getItem('jwt');

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	});	

	return (
		<div className={cl.login}>
			<SingInForm />
		</div>
	);
};

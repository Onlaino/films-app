import { ChangeEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../interfaces/user.types';
import { AppDispatch } from '../../redux/store';
import { userActions } from '../../redux/userSlice';
import { Button } from '../Button/Button.js';
import { Heading } from '../Heading/Heading.js';
import { Search } from '../Search/Search.js';
import cl from './SingInForm.module.css';

export const SingInForm = () => {
	const [userForm, setUserForm] = useState<IUser>({
		name: '',
		isLogined: false,
	});
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const handleSignIn = (e: MouseEvent) => {
		e.preventDefault();
		const newUser = {
			name: userForm.name,
			isLogined: true,
			jwt: 'auth',
		};
		setUserForm({ ...userForm, name: '' });
		dispatch(userActions.login(newUser));
		localStorage.setItem(newUser.name, JSON.stringify([]));
		navigate('/');
	};

	const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
		setUserForm({
			...userForm,
			name: e.target.value,
		});
	};
	return (
		<form className={cl.form}>
			<Heading>Вход</Heading>
			<Search
				required
				onChange={handleChangeForm}
				value={userForm.name}
				placeholder='Ваше имя'
			/>
			<Button variant='primary' onClick={handleSignIn}>
				Войти в профиль
			</Button>
		</form>
	);
};

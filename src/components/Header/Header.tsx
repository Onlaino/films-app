import cl from './Header.module.css';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { userActions } from '../../redux/userSlice';

export const Header: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const persistUser = useSelector((s: RootState) => s.user);
	const persistFilmsByUser = useSelector((s: RootState) => s.film.filmsByUser);
	const films = persistFilmsByUser[`${persistUser.name}`];

	
	useEffect(() => {
		  function handleClickOutside(this: Document, event: MouseEvent): void {
				const target = event.target as Node | null;
				const popupElement = document.querySelector(`${cl.popupNavigate}`);
				if (popupElement && !popupElement.contains(target)) {
					setIsOpen(false);
				}
			}
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSingOut = () => {
		dispatch(userActions.logout());
		navigate('/login');
	};

	return (
		<header className={cl.header}>
			<nav className={cl.headerNav}>
				<Link to={'/'}>
					<img src='/logo.svg' alt='logotype' />
				</Link>

				<div className={cl.headerRight}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							cn(cl.headerRightItem, {
								[cl.active]: isActive,
							})
						}
					>
						Поиск фильмов
					</NavLink>
					{persistUser.jwt ? (
						<NavLink
							to={'/favorites'}
							className={({ isActive }) =>
								cn(cl.headerRightItem, {
									[cl.active]: isActive,
								})
							}
						>
							Мои фильмы
							{films && films.length > 0 && (
								<div
									className={cn(cl.favorite, {
										[cl.hasFilms]: films.length > 0,
									})}
								>
									{films?.length}
								</div>
							)}
						</NavLink>
					) : (
						<div className={cl.headerRightItem}>
							<div
								className={cl.popupNavigate}
								onClick={() => setIsOpen(!isOpen)}
							>
								Поиск фильмов
							</div>
							<div
								className={cn(cl.openedPopupNavigate, {
									[cl.openedPopupNavigateOpened]: isOpen,
								})}
							>
								Авторизируйтесь для просмотра избранных фильмов.
							</div>
						</div>
					)}

					{persistUser.name ? (
						<>
							<div
								className={`${cl.headerRightItem} ${cl.headerRightItemUser}`}
							>
								{persistUser.name}
								<img src='/user_icon.svg' alt='Иконка пользователя' />
							</div>
							<div className={cl.headerRightItem} onClick={handleSingOut}>
								Выйти <img src='/signIn.svg' alt='войти в систему' />
							</div>
						</>
					) : (
						<NavLink
							to='/login'
							className={({ isActive }) =>
								cn(cl.headerRightItem, {
									[cl.active]: isActive,
								})
							}
						>
							Войти <img src='/signIn.svg' alt='войти в систему' />
						</NavLink>
					)}
				</div>
			</nav>
		</header>
	);
};

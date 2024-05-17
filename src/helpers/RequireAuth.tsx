import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';

interface IRequireAuthProps {
	children: ReactNode;
}

export const RequireAuth = ({ children }: IRequireAuthProps) => {
	const userJwt = useSelector((s: RootState) => s.user.jwt);

	if (!userJwt) {
		return <Navigate to={'/login'} replace />;
	}

	return <div>{children}</div>;
};

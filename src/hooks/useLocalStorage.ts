import { useEffect, useState } from 'react';
import { IUser } from '../interfaces/user.types';

export const useLocalStorage = (
	key: string
): [IUser | undefined, (newData: IUser) => void] => {
	const [data, setData] = useState<IUser>();

	useEffect(() => {
		const item = localStorage.getItem(key);
		const res = item ? JSON.parse(item) : undefined;
		if (res) {
			setData(res);
		}
	}, [key]);

	const saveData = (newData: IUser): void => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
};

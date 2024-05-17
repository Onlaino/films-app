import { configureStore } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import filmSlice from './filmSlice';
import userSlice from './userSlice';
import { filmsApi } from './api/api';

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['favoriteFilms'],
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);
const persistedFilmReducer = persistReducer(persistConfig, filmSlice)

export const store = configureStore({
	reducer: {
		[filmsApi.reducerPath]: filmsApi.reducer,
		film: persistedFilmReducer,
		user: persistedUserReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(filmsApi.middleware),
});

export const persistor = persistStore(store);
 // для очистки persistor
// persistor.purge() 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

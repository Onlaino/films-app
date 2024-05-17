import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { LoadingComponent } from './components/LoadingComponent/LoadingComponent';

export const App = () => {
	return (
		<div className='container'>
			<Provider store={store}>
				<PersistGate loading={<LoadingComponent />} persistor={persistor}>
					<RouterProvider router={router} />
				</PersistGate>
			</Provider>
		</div>
	);
};

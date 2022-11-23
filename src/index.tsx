import React, { version } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import * as db from './db/getData';
import { init } from './features/tasks/tasksSlice';
import { PlannerData } from './types';

const container = document.getElementById('root')!;
const root = createRoot(container);

db.readPlannerData().then((data: PlannerData) => {
    store.dispatch(init(data))

    root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
});

// reportWebVitals();

import { Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';

import { TasksList } from './features/tasks/TasksList';
import { TaskForm } from './features/tasks/TaskForm';
import { TasksCalendar } from './features/days/TasksCalendar';
import { DayTasks } from './features/days/DayTasks';

import {
	ContentWrapper,
	FooterWrapper,
	GlobalStyle,
	PageWrapper,
} from './App.style';

function App() {
	return (
		<div className='App'>
			<GlobalStyle />
			<PageWrapper>
				<ContentWrapper>
					<Routes>
						<Route path='/tasks' element={<TasksList />} />
						<Route path='/task/new' element={<TaskForm />} />
						<Route path='/task/:id' element={<TaskForm />} />
						<Route path='/calendar' element={<TasksCalendar />} />
						<Route path='/day/:moment' element={<DayTasks />} />
					</Routes>
				</ContentWrapper>

				<FooterWrapper>
					<Footer></Footer>
				</FooterWrapper>
			</PageWrapper>
		</div>
	);
}

export default App;

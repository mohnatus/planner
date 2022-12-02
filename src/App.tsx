import { Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';

import { RoutinesList } from './features/routines/RoutinesList';
import { RoutineForm } from './features/routines/RoutineForm';
import { TasksCalendar } from './features/tasks/TasksCalendar';
import { DayTasks } from './features/tasks/DayTasks';

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
						<Route path='/routines' element={<RoutinesList />} />
						<Route path='/routine/new' element={<RoutineForm />} />
						<Route path='/routine/:id' element={<RoutineForm />} />
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

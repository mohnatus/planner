
import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';

import { TasksList } from './features/tasks/TasksList';
import './App.css';
import { TaskForm } from './features/tasks/TaskForm';
import { useState } from 'react';
import { Modal } from './components/Modal';

function App() {
  const [show, setShow] = useState(false);

	return (
		<div className='App'>
			<Routes>
				<Route path='/tasks' element={<TasksList />} />
        <Route path="/task/new" element={<TaskForm />} />
        <Route path="/task/:id" element={<TaskForm />} />
			</Routes>

      <button onClick={() => setShow(true)}>Open modal</button>

      <Modal show={show} onClose={() => setShow(false)} title={<i>Modal title</i>}>
        Modal content
      </Modal>

      <Footer></Footer>
		</div>
	);
}

export default App;

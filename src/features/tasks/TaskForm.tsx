import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, selectTask } from './tasksSlice';

export function TaskForm() {
	const dispatch = useAppDispatch();

	const { id: taskId } = useParams();

	const task = useAppSelector(selectTask(taskId || ''));
	console.log({ task, taskId });

	const [name, setName] = useState('');

	const updateValue = (e: FormEvent<HTMLInputElement>) => {
		const id = e.currentTarget.id;
		const value = e.currentTarget.value;

		if (id === 'task-name') {
			setName(value);
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!taskId) {
			dispatch(addTask({ name }));
		} else {
     
    }
	};

	useEffect(() => {
		setName(task?.name || '');
	}, [task]);

	return (
		<form onSubmit={handleSubmit}>
			<h1>{taskId ? 'Редактировать' : 'Новая задача'}</h1>

      { taskId && !task && `Задача с id ${taskId} не существует`}

			<label htmlFor='task-name'>Название</label>
			<input
				type='text'
				id='task-name'
				value={name}
				onChange={updateValue}
			/>
			<button type='submit'>Сохранить</button>
		</form>
	);
}

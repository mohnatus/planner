import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, editTask, selectTask } from './tasksSlice';
import { FormGroup } from '../../components/FormGroup';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Toggler } from '../../components/Toggler';
import { RepeatTypes } from '../../domain/types';

const NO_REPEAT = 'no-repeat';
const REPEAT = 'repeat';

const REPEAT_OPTIONS = [
	{
		id: NO_REPEAT,
		name: 'Не повторять',
	},
	{
		id: REPEAT,
		name: 'Повторять',
	},
];

export function TaskForm() {
	const dispatch = useAppDispatch();

	const { id: taskId } = useParams();

	const task = useAppSelector(selectTask(taskId || ''));

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [repeat, setRepeat] = useState(NO_REPEAT);

	const updateValue = (
		e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const id = e.currentTarget.id;
		const value = e.currentTarget.value;

		switch (id) {
			case 'task-name':
				setName(value);
				break;
			case 'task-description':
				setDescription(value);
				break;
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const taskParams = {
			name,
			description,
      repeat: repeat === REPEAT
		};

		if (!taskId) {
			dispatch(addTask(taskParams));
		} else {
			dispatch(
				editTask({
					taskId,
					data: taskParams,
				})
			);
		}
	};

	useEffect(() => {
		setName(task?.name || '');
		setDescription(task?.description || '');
    setRepeat(task?.repeat ? REPEAT : NO_REPEAT);
	}, [task]);

	return (
		<form onSubmit={handleSubmit}>
			<h1>{taskId ? 'Редактировать' : 'Новая задача'}</h1>

			{taskId && !task && `Задача с id ${taskId} не существует`}

			<FormGroup id='task-name' label='Название'>
				<Input
					id='task-name'
					value={name}
					onChange={updateValue}
				></Input>
			</FormGroup>

			<FormGroup id='task-description' label='Описание'>
				<Textarea
					id='task-description'
					value={description}
					onChange={updateValue}
				></Textarea>
			</FormGroup>

			<Toggler
				options={REPEAT_OPTIONS}
				value={repeat}
				onChange={setRepeat}
			></Toggler>

			<button type='submit'>Сохранить</button>
		</form>
	);
}

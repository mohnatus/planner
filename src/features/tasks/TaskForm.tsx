import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTask, editTask, selectTask } from './tasksSlice';
import { FormGroup } from '../../components/FormGroup';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Toggler } from '../../components/Toggler';

import { RepeatTypes } from '../../domain/types';
import { DateInput } from '../../components/DateInput';
import { getTodayMoment } from '../../utils/date';
import { Moment } from '../../types';
import { Checkbox } from '../../components/Checkbox';

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
	const [startMoment, setStartMoment] = useState(getTodayMoment());
	const [resheduleToNextDay, setResheduleToNextDay] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const taskParams = {
			name: name,
			description: description,
			repeat: repeat === REPEAT,
			startMoment,
			resheduleToNextDay,
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
		console.log({ task });
		setName(task?.name || '');
		setDescription(task?.description || '');
		setRepeat(task?.repeat ? REPEAT : NO_REPEAT);
		setStartMoment(task?.startMoment ? task.startMoment : getTodayMoment());
		setResheduleToNextDay(task?.resheduleToNextDay || false);
	}, [task]);

	return (
		<form onSubmit={handleSubmit}>
			<h1>{taskId ? 'Редактировать' : 'Новая задача'}</h1>

			{taskId && !task && `Задача с id ${taskId} не существует`}

			<FormGroup id='task-name' label='Название'>
				<Input id='task-name' value={name} onChange={setName}></Input>
			</FormGroup>

			<FormGroup id='task-description' label='Описание'>
				<Textarea
					id='task-description'
					value={description}
					onChange={setDescription}
				></Textarea>
			</FormGroup>

			<Toggler
				options={REPEAT_OPTIONS}
				value={repeat}
				onChange={setRepeat}
			></Toggler>

			{repeat === NO_REPEAT && (
				<div>
					<div>
						Начиная с{' '}
						<DateInput
							value={startMoment}
							onChange={setStartMoment}
						></DateInput>
					</div>

					<Checkbox
						label='Переносить на следующий день'
						checked={resheduleToNextDay}
						onChange={setResheduleToNextDay}
					/>
				</div>
			)}

			{repeat === REPEAT && <div></div>}

			<button type='submit'>Сохранить</button>
		</form>
	);
}

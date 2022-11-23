import React, { ReactNode, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeTask, selectTasks } from './tasksSlice';
import styles from './Tasks.module.css';
import { RepeatTypes, Task } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { WEEK_DAYS } from '../../texts/Date';
import { formatTime } from '../../utils/date/time';

export interface TaskProps {
	task: Task;
}

export function TaskPreview({ task }: TaskProps) {
	let repeatBlock: ReactNode = null;
	let excludeBlock: ReactNode = null;
	const dispatch = useAppDispatch();

	if (task.repeat) {
		let days = '';

		if (task.repeatType === RepeatTypes.WeekDays) {
			days = task.weekDays.map((d) => WEEK_DAYS[d]).join(', ');
		} else if (task.repeatType === RepeatTypes.MonthDays) {
			days = task.monthDays.join(', ') + ' числам месяца';
		} else {
			days = `Раз в ${task.periodValue} ${task.periodUnit}`;
		}

		repeatBlock = <div>Повторять: {days}</div>;
	} else {
		repeatBlock = <div>Не повторять</div>;
	}

	const { weekDays, monthDays } = task.exclude;
	if (weekDays.length || monthDays.length) {
		excludeBlock = (
			<div>
				Кроме:
				<div>{weekDays.map((d) => WEEK_DAYS[d]).join(', ')}</div>
				<div>{monthDays.join(', ')}</div>
			</div>
		);
	}

	const onRemove = () => {
		dispatch(removeTask(task));
	};

	return (
		<div>
			<div>{task.name}</div>
			<div>{task.description}</div>
			<div>{repeatBlock}</div>
			<div>{excludeBlock}</div>
			<div>
				Время:{' '}
				{task.defaultTime.map((time) => formatTime(time)).join(', ')}
			</div>
			<Link to={`/task/${task.id}`}>Редактировать</Link>
			<div>
				<button onClick={onRemove}>Удалить</button>
			</div>
			<hr />
		</div>
	);
}

export function TasksList() {
	const tasks = useAppSelector(selectTasks);
	const dispatch = useAppDispatch();

	return (
		<div>
			<h1>Список задач</h1>

			{tasks.map((task: Task) => (
				<TaskPreview key={task.id} task={task} />
			))}
		</div>
	);
}

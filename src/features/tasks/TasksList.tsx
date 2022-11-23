import { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { removeTask, selectTasks } from './tasksSlice';
import { RepeatTypes, Task } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { WEEK_DAYS } from '../../texts/Date';
import { formatTime } from '../../utils/date/time';
import { PageHeader } from '../../components/PageHeader';
import { Container } from '../../containers/Container';
import { Card, CardContent, CardTitle } from '../../containers/Card';
import { SPACING_LG } from '../../style/spacing';

export interface TaskProps {
	task: Task;
}

const TaskCard = styled(Card)`
  &:not(:last-child) {
    margin-bottom: ${SPACING_LG}px;
  }
`

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
		<TaskCard>
			<div>
				<CardTitle>{task.name}</CardTitle>
			</div>

			<CardContent bordered>
				<div>{task.description}</div>
				<div>{repeatBlock}</div>
				<div>{excludeBlock}</div>
				<div>
					Время:{' '}
					{task.defaultTime
						.map((time) => formatTime(time))
						.join(', ')}
				</div>
				<Link to={`/task/${task.id}`}>Редактировать</Link>
				<div>
					<button onClick={onRemove}>Удалить</button>
				</div>
			</CardContent>
		</TaskCard>
	);
}

export function TasksList() {
	const tasks = useAppSelector(selectTasks);
	const dispatch = useAppDispatch();

	return (
		<div>
			<PageHeader title='Список задач'></PageHeader>

			<Container>
				{tasks.map((task: Task) => (
					<TaskPreview key={task.id} task={task} />
				))}
			</Container>
		</div>
	);
}

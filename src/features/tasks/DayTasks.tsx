import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DateBlock } from '../../components/DateBlock';
import { PageHeader } from '../../components/PageHeader';
import { Container } from '../../containers/Container';
import { Moment, Task } from '../../types';
import { MS_IN_DAY } from '../../utils/date/constants';
import { getTodayMoment } from '../../utils/date/today';
import { getTaskId } from '../../utils/task/getTaskId';
import { selectRoutines } from '../routines/routinesSlice';
import {
	isTaskChecked,
	moveTask,
	selectDayTasks,
	toggleTaskChecked,
} from './tasksSlice';

export interface DayTasksProps {}

export interface TaskItemProps {
	task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
	const dispatch = useAppDispatch();
	const routines = useAppSelector(selectRoutines);
	const checked = useAppSelector(isTaskChecked(task));
	const routine = routines.find((r) => r.id === task.routineId);

	const toggleStatus = useCallback(() => {
		dispatch(toggleTaskChecked(task));
	}, [dispatch, task]);

	const moveToTomorrow = useCallback(() => {
		dispatch(moveTask(task, getTodayMoment() + MS_IN_DAY));
	}, [dispatch, task]);

	if (!routine) return null;

	const { name, description } = routine;

	return (
		<div>
			<input type='checkbox' checked={checked} onChange={toggleStatus} />
			<div>{name}</div>
			<div>{description}</div>
			<Link to={`/routine/${task.routineId}`}>К рутине</Link>
			<div>
				<button type='button' onClick={moveToTomorrow}>
					Перенести на завтра
				</button>
			</div>
			<hr />
		</div>
	);
}

export function DayTasks() {
	const { moment = '' } = useParams();
	const [year, month, dayOfMonth] = moment.split('-');
	const date = new Date(+year, +month - 1, +dayOfMonth);
	const dayMoment: Moment = +date;
	const dayTasks = useAppSelector(selectDayTasks(dayMoment));

	return (
		<div>
			<PageHeader>
				<DateBlock moment={dayMoment} />
			</PageHeader>
			<Container>
				{dayTasks.map((task) => (
					<TaskItem key={getTaskId(task)} task={task} />
				))}
			</Container>
		</div>
	);
}

import { useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { DateBlock } from '../../components/DateBlock';
import { PageHeader } from '../../components/PageHeader';
import { Container } from '../../containers/Container';
import { ServiceText } from '../../containers/ServiceText';
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
import { getDateString } from './utils';

export interface DayTasksProps {}

export interface TaskItemProps {
	task: Task;
	day: Moment;
}

export function TaskItem({ task, day }: TaskItemProps) {
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

	const moveToNextDay = useCallback(() => {
		dispatch(moveTask(task,  day + MS_IN_DAY));
	}, [dispatch, task, day]);

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
				<button type='button' onClick={moveToNextDay}>
					Перенести на след. день
				</button>
			</div>
			<hr />
		</div>
	);
}

export function DayTasks() {
	const navigate = useNavigate();
	const { moment = '' } = useParams();
	const [year, month, dayOfMonth] = moment.split('-');
	const date = new Date(+year, +month - 1, +dayOfMonth);
	const dayMoment: Moment = +date;
	const dayTasks = useAppSelector(selectDayTasks(dayMoment));

	const toPrevDay = useCallback(() => {
		const prevDayMoment = dayMoment - MS_IN_DAY;
		const date = getDateString(prevDayMoment);
		navigate(`/day/${date}`);
	}, [navigate, dayMoment]);

	const toNextDay = useCallback(() => {
		const prevDayMoment = dayMoment + MS_IN_DAY;
		const date = getDateString(prevDayMoment);
		navigate(`/day/${date}`);
	}, [navigate, dayMoment]);

	return (
		<div>
			<PageHeader>
				<button type='button' onClick={toPrevDay}>
					Back
				</button>
				<DateBlock moment={dayMoment} />
				<button type='button' onClick={toNextDay}>
					Forward
				</button>
			</PageHeader>
			<Container>
				{dayTasks.length === 0 && <ServiceText>Ничего не запланировано</ServiceText>}

				{dayTasks.map((task) => (
					<TaskItem key={getTaskId(task)} task={task} day={dayMoment} />
				))}
			</Container>
		</div>
	);
}

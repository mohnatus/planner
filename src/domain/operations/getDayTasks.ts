import { DayModel } from '../models/Day';
import {
	Moment,
	TasksList,
	Task,
	Day,
	RoutinesList,
	Routine,
	PlannerData,
	TaskChangesList,
	TaskChange,
	TaskChecksList,
} from '../../types';
import { TaskModel } from '../models/Task';
import { getTodayMoment } from '../../utils/date/today';

export function getActiveRoutines(routines: RoutinesList): RoutinesList {
	return routines.filter((routine: Routine) => {
		return routine.active;
	});
}

function getTaskChange(
	task: Task,
	changes: TaskChangesList
): TaskChange | undefined {
	return changes.find((change) => change.id === task.id);
}

function getTaskPeriod(task: Task, change: TaskChange | undefined): [Moment | null, Moment | null] {
	const [from, to] = task.period;
	let _from: Moment | null = from;
	if (change) {
		_from = change.to;
	}
	return [_from, to];
}

function getTaskCheck(task: Task, checks: TasksList) {}

function getRoutineDayTasks(
	routine: Routine,
	day: Day,
	checks: TaskChecksList,
	changes: TaskChangesList
): Array<Task> {
	const tasks: TasksList = [];

	const { subRoutines = [] } = routine;

	const todayMoment = getTodayMoment();

	subRoutines.forEach((subRoutine) => {
		const task = TaskModel(routine, subRoutine, day, checks);
		console.log({task})

		const taskChange = getTaskChange(task, changes);
		if (!taskChange) {
			// нет изменений, не показывать до старта рутины
			if (routine.startMoment > day.moment) return;
		}

		const [from, to] = getTaskPeriod(task, taskChange);

		if (!from) return;

		// таск начинается после выбранного дня
		if (from > day.moment) return;

		// таск закончился до выбранного дня
		if (to && to <= day.moment) return;

		// таск начинается в будущем
		if (from > todayMoment) {
			// показывать в день старта таска
			if (day.moment === from) tasks.push(task);
			return;
		}

		const check = checks.find((check) => {
			return (
				check.id === task.id &&
				(!to || check.moment < to) &&
				check.moment <= todayMoment &&
				check.moment >= from
			);
		});

		// таск был выполнен
		if (check) {
			// показывать в день выполнения
			if (check.moment === day.moment) tasks.push(task);
			return;
		}

		// перепланирование на след. день включено
		if (routine.resheduleToNextDay) {
			// показывать сегодня
			if (todayMoment === day.moment) tasks.push(task);
			return;
		}

		// показывать в день планирования
		if (from === day.moment) tasks.push(task);
	});

	return tasks;
}

export function getDayTasks(
	dayMoment: Moment,
	plannerData: PlannerData
): TasksList {
	const day = DayModel(dayMoment);

	const { routines, checks, changes } = plannerData;

	const activeRoutines = getActiveRoutines(routines);

	let tasks: Array<Task> = [];

	activeRoutines.forEach((routine: Routine) => {
		tasks = [
			...tasks,
			...getRoutineDayTasks(routine, day, checks, changes),
		];
	});

	return tasks;
}

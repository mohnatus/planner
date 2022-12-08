import {
	Day,
	Moment,
	Routine,
	RoutineData,
	SubRoutine,
	Task,
	TaskMomentId,
	TaskMomentsList,
	TasksList,
} from '../../types';
import { getTodayMoment } from '../../utils/date/today';

import { TaskModel } from '../models/Task';

export function getNoRepeatTaskMomentId(task: Task): TaskMomentId {
	return task.subRoutineId;
}

export function getNoRepeatTaskStartMoment(
	routine: Routine,
	task: Task,
	moments: TaskMomentsList
): Moment | null {
	const taskMomentId = getNoRepeatTaskMomentId(task);
	const taskMoment = moments.find(moment => moment.id === taskMomentId);

	if (taskMoment) return taskMoment.to;

	return routine.startMoment;
}

export function getNoRepeatRoutineTasks(
	routine: Routine,
	day: Day,
	routineData: RoutineData
): Array<Task> {
	const { checks, moments } = routineData;

	const todayMoment = getTodayMoment();

	// для каждого времени - свой таск
	const { subRoutines = [] } = routine;

	const tasks: TasksList = [];

	subRoutines.forEach((subRoutine: SubRoutine) => {
		const task = TaskModel(routine, subRoutine, day);

		const taskStartMoment = getNoRepeatTaskStartMoment(
			routine,
			task,
			moments
		);

		if (!taskStartMoment) return;

		// таск начинается после выбранного дня
		if (taskStartMoment > day.moment) return;

		// таск начинается в будущем
		if (taskStartMoment > todayMoment) {
			// показывать в день старта таска
			if (day.moment === taskStartMoment) tasks.push(task);
			return;
		}

		const check = checks.find((check) => {
			return (
				check.subRoutineId === subRoutine.id &&
				check.moment <= todayMoment &&
				check.moment >= taskStartMoment
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
		if (taskStartMoment === day.moment) tasks.push(task);
	});

	return tasks;
}

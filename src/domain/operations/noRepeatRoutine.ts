import { Day, Routine, SubRoutine, Task, TasksList, Time } from '../../types';
import { getTodayMoment } from '../../utils/date/today';
import { isSameTask } from '../../utils/task/isSameTask';

import { TaskModel } from '../models/Task';

export function getNoRepeatRoutineTasks(
	routine: Routine,
	day: Day,
	checks: TasksList
): Array<Task> {
	// ничего, если рутина началась позже указанного дня
	if (day.moment < routine.startMoment) return [];

	const todayMoment = getTodayMoment();

	console.log({
		day: new Date(day.moment),
		routine,
	});

	// для каждого времени - свой таск
	const { subRoutines = [] } = routine;

	const tasks: TasksList = [];

	subRoutines.forEach((subRoutine: SubRoutine) => {
		const task = TaskModel(routine, subRoutine, day);

		let isTaskVisible = false;

		const check = checks.find((check) => {
			return (
				check.subRoutineId === subRoutine.id &&
				check.moment <= todayMoment
			);
		});

		if (day.moment > todayMoment) {
			// день после сегодня, показывать в день планирования
			isTaskVisible = day.moment === routine.startMoment;
		} else if (check) {
			// таск был выполнен, показывать в день выполнения
			isTaskVisible = check.moment === day.moment;
		} else if (routine.resheduleToNextDay) {
			// при перепланировании, показывать сегодня
			isTaskVisible = todayMoment === day.moment;
		} else {
			// показывать в день планирования
			isTaskVisible = routine.startMoment === day.moment;
		}

		if (isTaskVisible) tasks.push(task);
	});

	return tasks;
}

import { Day, Routine, SubRoutine, Task, TasksList, Time } from '../../types';
import { getTodayMoment } from '../../utils/date/today';
import { isSameTask } from '../../utils/task/isSameTask';

import { TaskModel } from '../models/Task';

export function getNoRepeatRoutineTasks(
	routine: Routine,
	day: Day,
	checks: TasksList
): Array<Task> {
	// рутина началась позже указанного дня
	if (day.moment !== routine.startMoment) return [];

	// для каждого времени - свой таск
	const { subRoutines = [] } = routine;

	const tasks: TasksList = [];

	// сегодня
	const todayMoment = getTodayMoment();

	// если указанный день позже сегодня
	if (day.moment > todayMoment) return [];

	subRoutines.forEach((subRoutine: SubRoutine) => {
		// был ли выполнен таск с конкретным временем
		const check = checks.find((check) => {
			return (
				check.subRoutineId === subRoutine.id &&
				check.moment <= todayMoment
			);
		});

		if (check && check.moment === day.moment) {
			tasks.push(TaskModel(routine, subRoutine, day));
		}
		return TaskModel(routine, subRoutine, day);
	});

	return tasks;
}

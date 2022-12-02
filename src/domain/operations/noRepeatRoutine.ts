import { Day, Routine,  Task, TasksList, Time } from '../../types';

import { TaskModel } from '../models/Task';


export function getNoRepeatRoutineTasks(
	routine: Routine,
	day: Day,
	checks: TasksList
): Array<Task> {
	if (day.moment !== routine.startMoment) return [];


	let times: Array<Time|null> = routine.defaultTime;
	if (!times.length) {
		times = [null];
	}

	return times.map(time => {
		return TaskModel(routine, day, time)
	});
}

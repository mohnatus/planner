import { Day, Task } from '../types';

export function removeDayTask(task: Task, day: Day) {
	task.include.moments = task.include.moments.filter(
		(moment) => moment !== day.moment
	);
	task.exclude.moments = [...task.exclude.moments, day.moment];
}

export function addDayTask(task: Task, day: Day) {
	task.exclude.moments = task.exclude.moments.filter(
		(moment) => moment !== day.moment
	);
	task.include.moments = [...task.include.moments, day.moment];
}

export function toggleDayTask(task: Task, day: Day) {
	if (task.repeat) {
		if (task.checkedMoments.includes(day.moment)) {
			task.checkedMoments = task.checkedMoments.filter(
				(moment) => moment !== day.moment
			);
		} else {
			task.checkedMoments = [...task.checkedMoments, day.moment];
		}
	} else {
		task.checkedMoment = day.moment;
	}
}

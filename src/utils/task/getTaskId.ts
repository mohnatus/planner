import { Task } from '../../types';

export function getTaskId(task: Task) {
	const { routineId, moment, time } = task;
	return `${routineId}__${moment}__${time}`;
}

export function isSameTask(task1: Task, task2: Task) {
  const fields: Array<keyof Task> = ['routineId', 'moment', 'time'];
	return fields.every(
		(field) => task1[field] === task2[field]
	);
}

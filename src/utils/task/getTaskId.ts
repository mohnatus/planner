import { Task } from '../../types';

export function getTaskId(task: Task) {
	const { routineId, moment, subRoutineId } = task;
	return `${routineId}__${moment}__${subRoutineId}`;
}



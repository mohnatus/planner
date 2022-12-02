import { Task } from "../../types";

export function isSameTask(task1: Task, task2: Task) {
  const fields: Array<keyof Task> = ['routineId', 'moment', 'subRoutineId'];
	return fields.every(
		(field) => task1[field] === task2[field]
	);
}
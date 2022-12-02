
import { Task, Routine, Day, Time } from '../../types';

export function TaskModel(
	routine: Routine,
	day: Day,
	time: Time | null,
): Task {
	const { id } = routine;

	return {
		routineId: id,
		moment: day.moment,
		time: time === undefined ? null : time,
	};
}

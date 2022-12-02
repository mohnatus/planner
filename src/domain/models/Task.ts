
import { Task, Routine, Day, Time, SubRoutine } from '../../types';

export function TaskModel(
	routine: Routine,
	subRoutine: SubRoutine,
	day: Day,
): Task {
	const { id } = routine;

	return {
		routineId: id,
		subRoutineId: subRoutine.id,
		moment: day.moment,
	};
}

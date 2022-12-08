import { Moment, Routine, Task, TaskMoment } from '../../types';
import { getNoRepeatTaskMomentId } from './noRepeatRoutine';

export function getTaskMoment(
	task: Task,
	to: Moment,
	routine: Routine
): TaskMoment {
	if (!routine.repeat) {
		return {
			id: getNoRepeatTaskMomentId(task),
			subRoutineId: task.subRoutineId,
			to,
		};
	}

	return {
		id: task.subRoutineId,
		subRoutineId: task.subRoutineId,
		to,
	};
}

import { Moment, RepeatTypes, Routine, Task, TaskMoment } from '../../types';
import { getNoRepeatTaskMomentId } from './noRepeatRoutine';
import { getWeekDaysTaskMomentId } from './weekDaysRoutine';

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

	if (routine.repeatType === RepeatTypes.WeekDays) {
		return {
			id: getWeekDaysTaskMomentId(routine, task, to),
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

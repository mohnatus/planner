import {
	Task,
	Routine,
	Day,
	SubRoutine,
	TaskChecksList,
} from '../../types';
import { getTaskMomentData } from '../operations/taskMoments';

export function TaskModel(
	routine: Routine,
	subRoutine: SubRoutine,
	day: Day,
	checks: TaskChecksList
): Task {
	const { id, period } = getTaskMomentData(routine, subRoutine, day.moment, checks);

	return {
		id,
		period,

		routineId: routine.id,
		subRoutineId: subRoutine.id,
		moment: day.moment,
	};
}

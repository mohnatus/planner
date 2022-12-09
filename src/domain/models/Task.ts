import {
	Task,
	Routine,
	Day,
	SubRoutine,
} from '../../types';
import { getTaskMomentData } from '../utils/taskMoments';

export function TaskModel(
	routine: Routine,
	subRoutine: SubRoutine,
	day: Day
): Task {
	const { id, period } = getTaskMomentData(routine, subRoutine, day.moment);

	return {
		id,
		period,

		routineId: routine.id,
		subRoutineId: subRoutine.id,
		moment: day.moment,
	};
}

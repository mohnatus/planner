import {
	Task,
	Routine,
	Day,
	SubRoutine,
	TaskChecksList,
} from '../../types';
import { getTaskMomentData } from '../utils/taskMoments';

export function TaskModel(
	routine: Routine,
	subRoutine: SubRoutine,
	day: Day,
	checks: TaskChecksList
): Task {
	const { id, period } = getTaskMomentData(routine, subRoutine, day.moment, checks);

	console.log('TASK', { subRoutine, day, checks, id, period })

	return {
		id,
		period,

		routineId: routine.id,
		subRoutineId: subRoutine.id,
		moment: day.moment,
	};
}

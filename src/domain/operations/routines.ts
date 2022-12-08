import { RoutineId, RoutinesList, SubRoutineId } from '../../types';

export function getRoutineById(routineId: RoutineId, routines: RoutinesList) {
	return routines.find((routine) => routine.id === routineId);
}

export function getRoutineBySubRoutineId(
	subRoutineId: SubRoutineId,
	routines: RoutinesList
) {
	return routines.find((routine) => {
		const { subRoutines } = routine;
		return subRoutines.some((subRoutine) => subRoutine.id === subRoutineId);
	});
}

import { DayModel } from '../models/Day';
import {
	Moment,
	TasksList,
	Task,
	Day,
	RoutinesList,
	Routine,
	RepeatTypes,
	DaysList,
	TaskMomentsList,
	PlannerData,
	RoutineData,
} from '../../types';
import { getNoRepeatRoutineTasks } from './noRepeatRoutine';
import { getWeekDaysRoutineTasks } from './weekDaysRoutine';
import { getMonthDaysRoutineTasks } from './monthDaysRoutine';
import { getPeriodRoutineTasks } from './periodRoutine';

export function getActiveRoutines(routines: RoutinesList): RoutinesList {
	return routines.filter((routine: Routine) => {
		return routine.active;
	});
}

function getRoutineTasks(
	routine: Routine,
	day: Day,
	routineData: RoutineData
): Array<Task> {
	if (routine.repeat) {
		switch (routine.repeatType) {
			case RepeatTypes.WeekDays:
				return getWeekDaysRoutineTasks(routine, day, routineData);
			case RepeatTypes.MonthDays:
				return getMonthDaysRoutineTasks(routine, day, routineData);
			default:
				return getPeriodRoutineTasks(routine, day, routineData);
		}
	}

	return getNoRepeatRoutineTasks(routine, day, routineData);
}

export function getDayTasks(
	dayMoment: Moment,
	plannerData: PlannerData
): TasksList {
	const day = DayModel(dayMoment);

	const { routines, checks, moments } = plannerData;

	const activeRoutines = getActiveRoutines(routines);

	let tasks: Array<Task> = [];

	activeRoutines.forEach((routine: Routine) => {
		const { subRoutines } = routine;
		const subRoutinesIds = subRoutines.map((subRoutine) => subRoutine.id);
		const routineChecks = checks.filter(
			(check) => check.routineId === routine.id
		);
		const routineMoments = moments.filter((moment) => {
			return subRoutinesIds.includes(moment.subRoutineId);
		});
		tasks = [
			...tasks,
			...getRoutineTasks(routine, day, {
				checks: routineChecks,
				moments: routineMoments,
			}),
		];
	});

	return tasks;
}

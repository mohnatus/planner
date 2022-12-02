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
	checks: TasksList
): Array<Task> {
	if (routine.repeat) {
		switch(routine.repeatType) {
			case RepeatTypes.WeekDays:
				return getWeekDaysRoutineTasks(routine, day, checks);
			case RepeatTypes.MonthDays:
				return getMonthDaysRoutineTasks(routine, day, checks);
			default:
				return getPeriodRoutineTasks(routine, day, checks);
		}
	}

	return getNoRepeatRoutineTasks(routine, day, checks);
}

export function getDayTasks(
	routines: RoutinesList,
	dayMoment: Moment,
	checks: TasksList
): TasksList {
	const day = DayModel(dayMoment);

	const activeRoutines = getActiveRoutines(routines);

	let tasks: Array<Task> = [];

	activeRoutines.forEach((routine: Routine) => {
		const routineChecks = checks.filter(check => check.routineId === routine.id)
		tasks = [...tasks, ...getRoutineTasks(routine, day, routineChecks)];
	});

	return tasks;
}

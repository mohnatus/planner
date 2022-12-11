import {
	Moment,
	PeriodUnits,
	RepeatTypes,
	Routine,
	SubRoutine,
	TaskChecksList,
	TaskMoment,
} from '../../types';
import {
	getDate,
	getDayOfMonth,
	getDayOfWeek,
	getMoment,
} from '../../utils/date';
import { MS_IN_DAY } from '../../utils/date/constants';
import { getNextMonthDay, getPrevMonthDay } from '../../utils/date/month';
import { getNextWeekDay, getPrevWeekDay } from '../../utils/date/week';

function getWeekDaysRoutinePeriodStart(
	routine: Routine,
	dayMoment: Moment
): Moment {
	const { weekDays } = routine;
	const date = getPrevWeekDay(dayMoment, weekDays);
	return getMoment(date);
}

function getWeekDaysRoutinePeriodEnd(
	routine: Routine,
	dayMoment: Moment
): Moment {
	const { weekDays } = routine;

	const weekDay = getDayOfWeek(dayMoment);
	if (weekDays.includes(weekDay)) {
		dayMoment = dayMoment + MS_IN_DAY;
	}

	const date = getNextWeekDay(dayMoment, weekDays);
	return getMoment(date);
}

function getMonthDaysRoutinePeriodStart(
	routine: Routine,
	dayMoment: Moment
): Moment {
	const { monthDays } = routine;
	const date = getPrevMonthDay(dayMoment, monthDays);
	return getMoment(date);
}

function getMonthDaysRoutinePeriodEnd(
	routine: Routine,
	dayMoment: Moment
): Moment {
	const { monthDays } = routine;

	const monthDay = getDayOfMonth(dayMoment);
	if (monthDays.includes(monthDay)) {
		dayMoment = dayMoment + MS_IN_DAY;
	}

	const date = getNextMonthDay(dayMoment, monthDays);
	return getMoment(date);
}

function getPeriodRoutinePeriodStart(
	routine: Routine,
	subRoutine: SubRoutine,
	dayMoment: Moment,
	checks: TaskChecksList
): Moment {
	const subRoutineChecks = checks.filter((check) =>
		check.id.includes(subRoutine.id)
	);
	subRoutineChecks.sort((a, b) => a.moment - b.moment);
	let lastCheckIndex = -1;
	while (lastCheckIndex < subRoutineChecks.length - 1) {
		const check = subRoutineChecks[lastCheckIndex + 1];
		if (!check || check.moment >= dayMoment) break;
		lastCheckIndex++;
	}
	const lastCheck = subRoutineChecks[lastCheckIndex];
	if (!lastCheck) return routine.startMoment;

	const { periodUnit, periodValue } = routine;
	let startMoment = lastCheck.moment;

	if (periodUnit === PeriodUnits.Days) {
		startMoment += MS_IN_DAY * periodValue;
	} else {
		const date = getDate(startMoment);
		date.setMonth(date.getMonth() + periodValue);
		startMoment = getMoment(date);
	}

	return startMoment;
}

function getPeriodRoutinePeriodEnd(
	routine: Routine,
	subRoutine: SubRoutine,
	dayMoment: Moment,
	checks: TaskChecksList
): Moment | null {
	const subRoutineChecks = checks.filter((check) =>
		check.id.includes(subRoutine.id)
	);
	subRoutineChecks.sort((a, b) => a.moment - b.moment);

	console.log('checks', subRoutineChecks.map(m => new Date(m.moment)))

	let nextCheckIndex = 0;
	while (nextCheckIndex < subRoutineChecks.length) {
		const check = subRoutineChecks[nextCheckIndex];
		if (check.moment === dayMoment) break;
		nextCheckIndex++;
		if (check.moment > dayMoment) break;
	}
	const nextCheck = subRoutineChecks[nextCheckIndex];
	if (!nextCheck) return null;

	return nextCheck.moment + MS_IN_DAY;
}

export function getTaskMomentData(
	routine: Routine,
	subRoutine: SubRoutine,
	moment: Moment,
	checks: TaskChecksList
): TaskMoment {
	if (!routine.repeat) {
		return {
			id: subRoutine.id,
			period: [routine.startMoment, null],
		};
	}

	let from = routine.startMoment;
	let to = null;

	if (routine.repeatType === RepeatTypes.WeekDays) {
		from = getWeekDaysRoutinePeriodStart(routine, moment);
		to = getWeekDaysRoutinePeriodEnd(routine, moment);
	}

	if (routine.repeatType === RepeatTypes.MonthDays) {
		from = getMonthDaysRoutinePeriodStart(routine, moment);
		to = getMonthDaysRoutinePeriodEnd(routine, moment);
	}

	if (routine.repeatType === RepeatTypes.Period) {
		from = getPeriodRoutinePeriodStart(routine, subRoutine, moment, checks);
		to = getPeriodRoutinePeriodEnd(routine, subRoutine, moment, checks);

		console.log({ moment: new Date(moment), from, fromDate: new Date(from), to,  toDate: to && new Date(to)});
	}

	const id = `${subRoutine.id}__${from}`;

	return {
		id,
		period: [from, to],
	};
}

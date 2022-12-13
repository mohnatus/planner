import {
	Moment,
	PeriodUnits,
	Routine,
	SubRoutine,
	TaskChecksList,
} from '../../types';
import { cloneDate, getDate, getMoment } from '../../utils/date';
import { MS_IN_DAY } from '../../utils/date/constants';
import { getDiffInDays, getDiffInMonths } from '../../utils/date/diff';
import { addDays, subtractDays } from '../../utils/date/manipulations';

function getStablePeriodTaskPeriod(
	routine: Routine,
	dayMoment: Moment
): [Moment, Moment] {
	const { periodUnit, periodValue } = routine;
	let startDate, endDate;

	if (periodUnit === PeriodUnits.Days) {
		const diff = getDiffInDays(routine.startMoment, dayMoment);
		const startOffset = diff % periodValue;
		startDate = subtractDays(dayMoment, startOffset);
		const endOffset = periodValue - (diff % periodValue);
		endDate = addDays(dayMoment, endOffset);
	} else {
		const diff = getDiffInMonths(routine.startMoment, dayMoment);
		const _date1 = getDate(routine.startMoment);
		const _date2 = getDate(dayMoment);
		const preciseDate = cloneDate(_date1);
		preciseDate.setMonth(preciseDate.getMonth() + diff);
		if (preciseDate > _date2) {
			startDate = cloneDate(preciseDate);
      startDate.setMonth(startDate.getMonth() - 1);
      endDate = preciseDate;
		} else {
			startDate = preciseDate;
      endDate = cloneDate(preciseDate);
      endDate.setMonth(endDate.getMonth() + 1);
		}
	}

	return [getMoment(startDate), getMoment(endDate)];
}

function getUnstablePeriodTaskPeriod(
	routine: Routine,
	subRoutine: SubRoutine,
	dayMoment: Moment,
	checks: TaskChecksList
): [Moment, Moment | null] {
	let startMoment, endMoment;

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
	if (!lastCheck) {
		startMoment = routine.startMoment;
	} else {
		startMoment = lastCheck.moment;

		const { periodUnit, periodValue } = routine;

		if (periodUnit === PeriodUnits.Days) {
			startMoment += MS_IN_DAY * periodValue;
		} else {
			const date = getDate(startMoment);
			date.setMonth(date.getMonth() + periodValue);
			startMoment = getMoment(date);
		}
	}

	let nextCheckIndex = 0;
	while (nextCheckIndex < subRoutineChecks.length) {
		const check = subRoutineChecks[nextCheckIndex];
		if (check.moment === dayMoment) break;
		nextCheckIndex++;
		if (check.moment > dayMoment) break;
	}
	const nextCheck = subRoutineChecks[nextCheckIndex];
	if (!nextCheck) {
		endMoment = null;
	} else {
		endMoment = nextCheck.moment + MS_IN_DAY;
	}

	return [startMoment, endMoment];
}

export function getPeriodTaskPeriod(
	routine: Routine,
	subRoutine: SubRoutine,
	dayMoment: Moment,
	checks: TaskChecksList
): [Moment, Moment | null] {
	return routine.resheduleToNextDay
		? getUnstablePeriodTaskPeriod(routine, subRoutine, dayMoment, checks)
		: getStablePeriodTaskPeriod(routine, dayMoment);
}

import {
	Moment,
	RepeatTypes,
	Routine,
	SubRoutine,
	TaskMoment,
} from '../../types';
import { getDayOfWeek, getMoment } from '../../utils/date';
import { MS_IN_DAY } from '../../utils/date/constants';
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

export function getTaskMomentData(
	routine: Routine,
	subRoutine: SubRoutine,
	moment: Moment
): TaskMoment {
	if (!routine.repeat) {
		return {
			id: subRoutine.id,
			period: [routine.startMoment, null],
		};
	}

	if (routine.repeatType === RepeatTypes.WeekDays) {
		const from = getWeekDaysRoutinePeriodStart(routine, moment);
		const to = getWeekDaysRoutinePeriodEnd(routine, moment);
		return {
			id: `${subRoutine.id}__${from}`,
			period: [from, to],
		};
	}

	return {
		id: subRoutine.id,
		period: [routine.startMoment, null],
	};
}

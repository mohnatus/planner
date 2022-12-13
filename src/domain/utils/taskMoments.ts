import {
	Moment,
	RepeatTypes,
	Routine,
	SubRoutine,
	TaskChecksList,
	TaskMoment,
} from '../../types';

import { getMonthDaysTaskPeriod } from './monthDaysTaskPeriod';
import { getPeriodTaskPeriod } from './periodTaskPeriod';
import { getWeekDaysTaskPeriod } from './weekDaysTaskPeriod';
import { getYearDaysTaskPeriod } from './yearDaysTaskPeriod';

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
		const [_from, _to] = getWeekDaysTaskPeriod(routine, moment);
		from = _from;
		to = _to;
	} else if (routine.repeatType === RepeatTypes.MonthDays) {
		const [_from, _to] = getMonthDaysTaskPeriod(routine, moment);
		from = _from;
		to = _to;
	} else if (routine.repeatType === RepeatTypes.YearDays) {
		const [_from, _to] = getYearDaysTaskPeriod(routine, moment);
		from = _from;
		to = _to;
	} else {
		const [_from, _to] = getPeriodTaskPeriod(
			routine,
			subRoutine,
			moment,
			checks
		);
		from = _from;
		to = _to;
	}

	const id = `${subRoutine.id}__${from}`;

	return {
		id,
		period: [from, to],
	};
}

import { Moment, Routine, TaskChangesList } from "../../types";
import { getDayOfWeek, getMoment } from "../../utils/date";
import { MS_IN_DAY } from "../../utils/date/constants";
import { getNextWeekDay, getPrevWeekDay } from "../../utils/date/week";

export function getWeekDaysRoutineFirstTask(routine: Routine, changes: TaskChangesList): Moment {
	const { startMoment, weekDays } = routine;
	const firstTaskMoment = getNextWeekDay(startMoment, weekDays);
	return getMoment(firstTaskMoment);
}

export function getWeekDaysTaskPeriod(routine: Routine, dayMoment: Moment): [Moment, Moment] {
	const { weekDays } = routine;

	let _moment = dayMoment;
	const startDate = getPrevWeekDay(_moment, weekDays);

	const weekDay = getDayOfWeek(_moment);
	if (weekDays.includes(weekDay)) {
		_moment = _moment + MS_IN_DAY;
	}

	const endDate = getNextWeekDay(_moment, weekDays);

	return [getMoment(startDate), getMoment(endDate)];
}
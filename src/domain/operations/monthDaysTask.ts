import { Moment, Routine } from "../../types";
import { getDayOfMonth, getMoment } from "../../utils/date";
import { MS_IN_DAY } from "../../utils/date/constants";
import { getNextMonthDay, getPrevMonthDay } from "../../utils/date/month";

export function getMonthDaysTaskPeriod(routine: Routine,
	dayMoment: Moment): [Moment, Moment] {

const { monthDays } = routine;
	const startDate = getPrevMonthDay(dayMoment, monthDays);

  const monthDay = getDayOfMonth(dayMoment);
	if (monthDays.includes(monthDay)) {
		dayMoment = dayMoment + MS_IN_DAY;
	}

	const endDate = getNextMonthDay(dayMoment, monthDays);

	return [getMoment(startDate), getMoment(endDate)];
}
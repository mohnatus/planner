import { Moment, Routine } from '../../types';
import { getDayOfYear, getMoment } from '../../utils/date';
import { MS_IN_DAY } from '../../utils/date/constants';
import { getNextYearDay, getPrevYearDay } from '../../utils/date/year';

export function getYearDaysTaskPeriod(
	routine: Routine,
	dayMoment: Moment
): [Moment, Moment] {
	const { yearDays } = routine;
  console.log({ yearDays })
	const startDate = getPrevYearDay(dayMoment, yearDays);
  console.log({ startDate })
	const dayOfYear = getDayOfYear(dayMoment);
	if (yearDays.includes(dayOfYear)) {
		dayMoment = dayMoment + MS_IN_DAY;
	}


	const endDate = getNextYearDay(dayMoment, yearDays);
  console.log({ endDate })

	return [getMoment(startDate), getMoment(endDate)];
}

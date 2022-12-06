import { getDayOfMonth, getDayOfWeek, getDayStart, getMoment } from '../../utils/date';
import { Moment, Day } from '../../types';

export function DayModel(moment: Moment): Day {
	const dayStart = getDayStart(moment);
	const weekDay = getDayOfWeek(dayStart);
	const monthDay = getDayOfMonth(dayStart);

	return {
		moment: getMoment(dayStart),
		weekDay,
		monthDay,
	};
}

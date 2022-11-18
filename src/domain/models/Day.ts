import { Day, Moment } from '../types';
import { getDate, getDayOfMonth, getDayOfWeek } from '../utils';

export function DayModel(day: Moment): Day {
	const date = getDate(day);
	const weekDay = getDayOfWeek(date);
	const monthDay = getDayOfMonth(date);

	return {
		moment: day,
		weekDay,
		monthDay,
	};
}

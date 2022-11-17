import { Day } from '../types';
import { getDate, getDayOfMonth, getDayOfWeek } from '../utils';

export function DayModel(day: number): Day {
	const date = getDate(day);
	const weekDay = getDayOfWeek(date);
	const monthDay = getDayOfMonth(date);

	return {
		id: day,
		moment: day,
		weekDay,
		monthDay,
	};
}

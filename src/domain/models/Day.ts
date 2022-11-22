import { getDayOfMonth, getDayOfWeek } from '../../utils/date';
import { Moment, Day } from '../../types';

export function DayModel(moment: Moment): Day {
	const weekDay = getDayOfWeek(moment);
	const monthDay = getDayOfMonth(moment);

	return {
		moment,
		weekDay,
		monthDay,
	};
}

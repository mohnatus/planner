import { Day } from '../types';
import { getDayOfMonth, getDayOfWeek } from '../../utils/date';
import { Moment } from '../../types';

export function DayModel(moment: Moment): Day {

	const weekDay = getDayOfWeek(moment);
	const monthDay = getDayOfMonth(moment);

	return {
		moment,
		weekDay,
		monthDay,
	};
}

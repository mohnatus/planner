import { Moment } from '../../types';
import { getDateComponents } from '../../utils/date/format';

export function getDateString(moment: Moment) {
	const { dayOfMonth, month, year } = getDateComponents(moment);
	return `${year}-${month}-${dayOfMonth}`;
}

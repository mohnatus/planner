import { WeekDays } from '../../types';
import { getDayOfWeek, getDayStart, getMoment } from '.';
import { DateVariants } from './date.types';
import { addDays, subtractDays } from './manipulations';

export function getWeekStart(date: DateVariants): Date {
	const clone = getDayStart(date);
	const dayOfWeek = getDayOfWeek(clone);

	if (dayOfWeek === WeekDays.Monday) return clone;
	if (dayOfWeek === WeekDays.Sunday) return subtractDays(clone, 6);
	return subtractDays(clone, dayOfWeek - 1);
}

export function getWeekEnd(date: DateVariants): Date {
	const clone = getDayStart(date);
	const dayOfWeek = getDayOfWeek(clone);
	if (dayOfWeek === WeekDays.Sunday) return clone;
	return addDays(clone, 7 - dayOfWeek);
}

export function getPrevWeekDay(
	date: DateVariants,
	daysOfWeek: Array<WeekDays>
): Date {
	let _date = getDayStart(date);

	while (true) {
		const dayOfWeek = getDayOfWeek(_date);
		if (daysOfWeek.includes(dayOfWeek)) break;
		_date = subtractDays(_date, 1);
	}

	return _date;
}

export function getNextWeekDay(
	date: DateVariants,
	daysOfWeek: Array<WeekDays>,
	include: boolean = true
): Date {
	let _date = getDayStart(date);
	while (true) {
		const dayOfWeek = getDayOfWeek(_date);
		if (daysOfWeek.includes(dayOfWeek)) break;
		_date = addDays(_date, 1);
	}
	return _date;
}

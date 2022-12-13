import {
	DayOfYear,
	Moment,
	MonthDay,
	Months,
	WeekDays,
} from '../../types';
import { daysOfWeek } from './constants';
import { DateVariants } from './date.types';

/** Base */

export function getDate(date: DateVariants) {
	if (date instanceof Date) return date;
	return new Date(date);
}

export function getMoment(date: DateVariants): Moment {
	return +getDate(date);
}

export function cloneDate(date: DateVariants) {
	return new Date(+getDate(date));
}

/** Day props */

export function getDayStart(date: DateVariants): Date {
	const _clone = cloneDate(getDate(date));
	_clone.setHours(0, 0, 0, 0);
	return _clone;
}

export function getDayOfWeek(date: DateVariants): WeekDays {
	const dayOfWeek = getDate(date).getDay();
	return daysOfWeek[dayOfWeek];
}

export function isWeekend(date: DateVariants): boolean {
	const weekDay = getDate(date).getDay();
	return weekDay === WeekDays.Saturday || weekDay === WeekDays.Sunday;
}

export function getDayOfMonth(date: DateVariants): MonthDay {
	return getDate(date).getDate();
}

export function getMonth(date: DateVariants): Months {
	return getDate(date).getMonth();
}

export function getYear(date: DateVariants): number {
	return getDate(date).getFullYear();
}

export function getDayOfYear(date: DateVariants): DayOfYear {
	const _date = getDate(date);
	return `${_date.getDate()}-${getMonth(_date)}`;
}
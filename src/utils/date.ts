import { DateComponents, Moment, MonthDay, Months, WeekDays } from '../types';

type DateVariants = Moment | Date | string;

export const MS_IN_SEC = 1000;
export const MS_IN_MIN = MS_IN_SEC * 60;
export const MS_IN_HOUR = MS_IN_MIN * 60;
export const MS_IN_DAY = MS_IN_HOUR * 24;

export const daysOfWeek = [
	WeekDays.Sunday,
	WeekDays.Monday,
	WeekDays.Tuesday,
	WeekDays.Wednesday,
	WeekDays.Thursday,
	WeekDays.Friday,
	WeekDays.Saturday,
];

export const week = [WeekDays.Monday, WeekDays];

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

export function getDateComponents(date: DateVariants): DateComponents {
	const _date = getDate(date);
	const _dayOfMonth = _date.getDate();
	const _month = _date.getMonth();
	const _year = _date.getFullYear();

	return {
		_dayOfMonth,
		_month,
		_year,

		dayOfMonth: `${_dayOfMonth}`.padStart(2, '0'),
		month: `${_month + 1}`.padStart(2, '0'),
		year: `${_year}`,
	};
}

export function formatDate(date: DateVariants): string {
	const { dayOfMonth, month, year } = getDateComponents(date);
	return `${dayOfMonth}.${month}.${year}`;
}

/** Today */

export function getToday(): Date {
	return getDayStart(new Date());
}

export function getTodayMoment(): Moment {
	return getMoment(getToday());
}

export function isToday(date: DateVariants): boolean {
	return getToday() === getDayStart(date);
}

/** Diff */

export function getDiffInDays(
	date1: DateVariants,
	date2: DateVariants
): number {
	const diff = +getDate(date2) - +getDate(date1);
	return diff / MS_IN_DAY;
}

export function getDiffInMonths(
	date1: DateVariants,
	date2: DateVariants
): number {
	const _date1 = getDate(date1);
	const _date2 = getDate(date2);
	let months = (_date2.getFullYear() - _date1.getFullYear()) * 12;
	months -= _date1.getMonth();
	months += _date2.getMonth();
	return months;
}

/** Math */

export function addDays(date: DateVariants, count: number = 1): Date {
	const _date = cloneDate(date);
	_date.setDate(_date.getDate() + count);
	return getDayStart(_date);
}

export function subtractDays(date: DateVariants, count: number = 1): Date {
	const _date = cloneDate(date);
	_date.setDate(_date.getDate() - count);
	return getDayStart(_date);
}

/** Month */

export function getMonthStart(date: DateVariants): Date {
	const monthStart = getDayStart(date);
	monthStart.setDate(1);
	return monthStart;
}

export function getMonthEnd(date: DateVariants): Date {
	const monthEnd = getDayStart(date);
	monthEnd.setMonth(monthEnd.getMonth() + 1);
	monthEnd.setDate(1);
	return subtractDays(monthEnd, 1);
}

/** Week */

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

/** Periods */

export function getPeriodDays(
	from: DateVariants,
	to: DateVariants
): Array<Date> {
	const days = [];

	const fromDate = getDayStart(from);
	const toDate = getDayStart(to);

	let currentDate = fromDate;

	while (currentDate <= toDate) {
		days.push(cloneDate(currentDate));
		currentDate = addDays(currentDate, 1);
	}

	return days;
}

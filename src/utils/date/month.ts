import { cloneDate, getDate, getDayStart } from '.';
import { DateVariants } from './date.types';
import { subtractDays } from './manipulations';

function isDayOfMonth(date: number) {
	return date >= 1 && date <= 31;
}

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

export function hasDateInMonth(date: number, monthDate: DateVariants) {
	const startOfMonth = getMonthStart(monthDate);
	const _date = cloneDate(startOfMonth);
	_date.setDate(date);
	return startOfMonth.getMonth() === _date.getMonth();
}

export function getPrevMonthDay(
	date: DateVariants,
	daysOfMonth: Array<number>
): Date {
	const sortedDays = daysOfMonth.filter(isDayOfMonth);
	if (!sortedDays.length) throw new Error('Не указаны валидные дни месяца')

	sortedDays.sort((a, b) => a - b);
	const reversedDays = [...sortedDays].reverse();

	const originalDate = getDate(date);
	const originalDayOfMonth = originalDate.getDate();

	if (sortedDays.includes(originalDayOfMonth)) return originalDate;

	if (originalDayOfMonth > sortedDays[0]) {
		// искомая дата в текущем месяце
		const prevDayOfMonth = reversedDays.find(
			(day) => day < originalDayOfMonth
		) as number;
		const prevDay = cloneDate(originalDate);
		prevDay.setDate(prevDayOfMonth);
		return prevDay;
	}

	// предыдущий месяц
	const prevMonth = getMonthStart(originalDate);
	prevMonth.setMonth(prevMonth.getMonth() - 1);

	while (true) {
		const dateOfMonth = reversedDays.find((day) =>
			hasDateInMonth(day, prevMonth)
		);
		if (dateOfMonth) {
			const day = cloneDate(prevMonth);
			day.setDate(dateOfMonth);
			return day;
		}
		prevMonth.setMonth(prevMonth.getMonth() - 1);
	}
}

export function getNextMonthDay(
	date: DateVariants,
	daysOfMonth: Array<number>
): Date {
	const sortedDays = daysOfMonth.filter(isDayOfMonth);
	if (!sortedDays.length) throw new Error('Не указаны валидные дни месяца')

	sortedDays.sort((a, b) => a - b);
	const reversedDays = [...sortedDays].reverse();

	const originalDate = getDate(date);
	const originalDayOfMonth = originalDate.getDate();

	if (sortedDays.includes(originalDayOfMonth)) return originalDate;

	if (originalDayOfMonth < reversedDays[0]) {
		// искомая дата в текущем месяце
		const _prevDayOfMonth = sortedDays.find(
			(day) => day > originalDayOfMonth
		) as number;
		const nextDay = cloneDate(originalDate);
		nextDay.setDate(_prevDayOfMonth);
		return nextDay;
	}

	// следующий месяц
	const nextMonth = getMonthStart(originalDate);
	nextMonth.setMonth(nextMonth.getMonth() + 1);

	while (true) {
		const dateOfMonth = sortedDays.find((day) =>
			hasDateInMonth(day, nextMonth)
		);

		if (dateOfMonth) {
			const day = cloneDate(nextMonth);
			day.setDate(dateOfMonth);
			return day;
		}
		nextMonth.setMonth(nextMonth.getMonth() + 1);
	}
}

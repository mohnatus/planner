import { getDate, getDayOfYear } from '.';
import { DayOfYear } from '../../types';
import { DateVariants } from './date.types';
import { getDateComponents, getDayOfYearComponents } from './format';

function daysOfYearComparer(dayOfYear1: DayOfYear, dayOfYear2: DayOfYear) {
	const day1 = getDayOfYearComponents(dayOfYear1);
	const day2 = getDayOfYearComponents(dayOfYear2);

	if (day1[1] === day2[1]) return day1[0] - day2[0];
	return day1[1] - day2[1];
}

export function getPrevYearDay(
	day: DateVariants,
	daysOfYear: Array<DayOfYear>
): Date {
	const dayOfYear = getDayOfYear(day);
	if (daysOfYear.includes(dayOfYear)) return getDate(day);

	const list = [...daysOfYear];
	list.sort(daysOfYearComparer);

	let index = -1;
	while (index < list.length - 1) {
		const _day = list[index + 1];
		if (daysOfYearComparer(_day, dayOfYear) === 1) break;
		index++;
	}

	const date = getDate(day);

	if (index > -1) {
		const prevDayOfYear = list[index];
		const [dayOfMonth, month] = getDayOfYearComponents(prevDayOfYear);
		return new Date(date.getFullYear(), month, dayOfMonth);
	}

	const prevDayOfYear = list[list.length - 1];
	const [dayOfMonth, month] = getDayOfYearComponents(prevDayOfYear);
	return new Date(date.getFullYear() - 1, month, dayOfMonth);
}

export function getNextYearDay(
	day: DateVariants,
	daysOfYear: Array<DayOfYear>
): Date {
	const dayOfYear = getDayOfYear(day);
	if (daysOfYear.includes(dayOfYear)) return getDate(day);


	const list = [...daysOfYear];
	list.sort(daysOfYearComparer);

	let index = 0;
	while (index < list.length) {
		const _day = list[index];
		if (daysOfYearComparer(_day, dayOfYear) === -1) break;
		index++;
	}

	const date = getDate(day);

	if (index > list.length - 1) {
		const nextDayOfYear = list[0];
		const [dayOfMonth, month] = getDayOfYearComponents(nextDayOfYear);
		return new Date(date.getFullYear() + 1, month, dayOfMonth);
	}

	const nextDayOfYear = list[index];
	const [dayOfMonth, month] = getDayOfYearComponents(nextDayOfYear);
	return new Date(date.getFullYear(), month, dayOfMonth);
}

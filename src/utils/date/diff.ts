import { MS_IN_DAY } from './constants';
import { getDate } from '.';
import { DateVariants } from './date.types';

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


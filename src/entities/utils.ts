import { WeekDays } from './types';

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

export function getDate(date: number) {
	return new Date(date);
}

export function cloneDate(date: Date) {
	return new Date(+date);
}

export function getDayStart(date: Date): number {
	const _clone = cloneDate(date);
	_clone.setHours(0, 0, 0, 0);
	return +_clone;
}

export function getDayOfWeek(date: Date): WeekDays {
	const dayOfWeek = date.getDay();
	return daysOfWeek[dayOfWeek];
}

export function getDayOfMonth(date: Date): number {
  return date.getDate();
}

export function getToday(): number {
	return getDayStart(new Date());
}

export function getDiffInDays(date1: Date, date2: Date): number {
  const diff = (+date1) - (+date2);
  return diff / MS_IN_DAY;
}

export function getDiffInMonths(date1: Date, date2: Date): number {
    let months  = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months
}
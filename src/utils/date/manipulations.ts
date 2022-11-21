import { cloneDate, getDayStart } from ".";
import { DateVariants } from "./date.types";

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
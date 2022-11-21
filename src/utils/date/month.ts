import { getDayStart, } from ".";
import { DateVariants } from "./date.types";
import { subtractDays } from "./manipulations";

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
import {  cloneDate,  getDayStart } from ".";
import { DateVariants } from "./date.types";
import { addDays } from "./manipulations";

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
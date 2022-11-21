import { WeekDays } from "../../types";
import {  getDayOfWeek, getDayStart } from ".";
import { DateVariants } from "./date.types";
import { addDays, subtractDays } from "./manipulations";

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
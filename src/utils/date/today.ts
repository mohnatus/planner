import { Moment } from "../../types";
import { getDayStart, getMoment } from ".";
import { DateVariants } from "./date.types";

export function getToday(): Date {
	return getDayStart(new Date());
}

export function getTodayMoment(): Moment {
	return getMoment(getToday());
}

export function isToday(date: DateVariants): boolean {
	return getToday() === getDayStart(date);
}
import { DateComponents } from "../../types";
import { getDate } from ".";
import { DateVariants } from "./date.types";

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
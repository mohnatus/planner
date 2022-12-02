import { WeekDays } from '../../types';
import {
	getNextWeekDay,
	getPrevWeekDay,
	getWeekEnd,
	getWeekStart,
} from './week';

test('Get week start & end', () => {
	const weekStart = new Date(2022, 4, 16);
	const weekEnd = new Date(2022, 4, 22);

	const date1 = new Date(2022, 4, 16, 22);
	const date2 = new Date(2022, 4, 18, 22);
	const date3 = new Date(2022, 4, 22, 22);

	expect(+getWeekStart(weekStart)).toBe(+weekStart);
	expect(+getWeekStart(date1)).toBe(+weekStart);
	expect(+getWeekStart(date2)).toBe(+weekStart);
	expect(+getWeekStart(date3)).toBe(+weekStart);

	expect(+getWeekEnd(weekEnd)).toBe(+weekEnd);
	expect(+getWeekEnd(date1)).toBe(+weekEnd);
	expect(+getWeekEnd(date2)).toBe(+weekEnd);
	expect(+getWeekEnd(date3)).toBe(+weekEnd);
});

test('Get prev week day', () => {
	const monday = new Date(2022, 4, 2);
	const wednesday = new Date(2022, 4, 4);
	const friday = new Date(2022, 4, 6);

	expect(+getPrevWeekDay(friday, [WeekDays.Wednesday, WeekDays.Monday])).toBe(
		+wednesday
	);
	expect(+getPrevWeekDay(friday, [WeekDays.Monday])).toBe(+monday);
});

test('Get next week day', () => {
	const monday = new Date(2022, 4, 2);
	const wednesday = new Date(2022, 4, 4);
	const friday = new Date(2022, 4, 6);

	expect(+getNextWeekDay(monday, [WeekDays.Wednesday, WeekDays.Friday])).toBe(
		+wednesday
	);
	expect(+getNextWeekDay(monday, [WeekDays.Friday])).toBe(+friday);
});

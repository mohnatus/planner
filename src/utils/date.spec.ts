import { addDays, cloneDate, getDayStart, getDiffInMonths, getMonthEnd, getMonthStart, getWeekEnd, getWeekStart, subtractDays } from './date';

test('Clone date', () => {
	const date = new Date(2022, 4, 16);
	const clone = cloneDate(date);

	expect(+clone).toBe(+date);
});

test('Get day start', () => {
	const date = new Date(2022, 4, 16, 10, 23, 34);
	const startDate = new Date(2022, 4, 16, 0, 0, 0, 0);

	expect(+getDayStart(date)).toBe(+startDate);
});

test('Get diff in months', () => {
	const date1 = new Date(2022, 4, 16);
	const date2 = new Date(2022, 6, 16);

	expect(getDiffInMonths(date1, date2)).toBe(2);
	expect(getDiffInMonths(date1, date1)).toBe(0);
});

test('Add & subtract days', () => {
	const date1 = new Date(2022, 4, 29);
	const date2 = new Date(2022, 4, 30);
	const date3 = new Date(2022, 5, 1);

	expect(+addDays(date1, 1)).toBe(+date2);
	expect(+addDays(date1, 3)).toBe(+date3);

	expect(+subtractDays(date2, 1)).toBe(+date1);
	expect(+subtractDays(date3, 3)).toBe(+date1);
});

test('Get month start & end', () => {
	const monthStart = new Date(2022, 5, 1);
	const monthEnd = new Date(2022, 5, 30);

	const date1 = new Date(2022, 5, 1, 22);
	const date2 = new Date(2022, 5, 10, 22);
	const date3 = new Date(2022, 5, 30, 22);

	expect(+getMonthStart(monthStart)).toBe(+monthStart);
	expect(+getMonthStart(date1)).toBe(+monthStart);
	expect(+getMonthStart(date2)).toBe(+monthStart);
	expect(+getMonthStart(date3)).toBe(+monthStart);

	expect(+getMonthEnd(monthEnd)).toBe(+monthEnd);
	expect(+getMonthEnd(date1)).toBe(+monthEnd);
	expect(+getMonthEnd(date2)).toBe(+monthEnd);
	expect(+getMonthEnd(date3)).toBe(+monthEnd);
})

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
})
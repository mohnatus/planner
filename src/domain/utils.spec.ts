import { cloneDate, getDayStart, getDiffInMonths } from './utils';

test('Clone date', () => {
	const date = new Date(2022, 4, 16);
	const clone = cloneDate(date);

	expect(+clone).toBe(+date);
});

test('Get day start', () => {
	const date = new Date(2022, 4, 16, 10, 23, 34);
	const startDate = new Date(2022, 4, 16, 0, 0, 0, 0);

	expect(getDayStart(date)).toBe(+startDate);
});

test('Get diff in months', () => {
	const date1 = new Date(2022, 4, 16);
	const date2 = new Date(2022, 6, 16);

	expect(getDiffInMonths(date1, date2)).toBe(2);
	expect(getDiffInMonths(date1, date1)).toBe(0);
});

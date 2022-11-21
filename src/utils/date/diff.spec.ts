import { getDiffInMonths } from './diff';

test('Get diff in months', () => {
	const date1 = new Date(2022, 4, 16);
	const date2 = new Date(2022, 6, 16);

	expect(getDiffInMonths(date1, date2)).toBe(2);
	expect(getDiffInMonths(date1, date1)).toBe(0);
});

import { cloneDate, getDayStart } from '.';

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

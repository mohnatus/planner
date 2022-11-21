import { getMonthEnd, getMonthStart } from "./month";

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
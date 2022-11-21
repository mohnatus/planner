import { getWeekEnd, getWeekStart } from "./week";

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
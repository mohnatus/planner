import { addDays, subtractDays } from "./manipulations";

test('Add & subtract days', () => {
	const date1 = new Date(2022, 4, 29);
	const date2 = new Date(2022, 4, 30);
	const date3 = new Date(2022, 5, 1);

	expect(+addDays(date1, 1)).toBe(+date2);
	expect(+addDays(date1, 3)).toBe(+date3);

	expect(+subtractDays(date2, 1)).toBe(+date1);
	expect(+subtractDays(date3, 3)).toBe(+date1);
});
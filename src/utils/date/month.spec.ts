import {
	getMonthEnd,
	getMonthStart,
	getNextMonthDay,
	getPrevMonthDay,
} from './month';

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
});

describe('Get prev month day', () => {
	const day = new Date(2022, 4, 15);
	const prevTenth = new Date(2022, 4, 10);
	const prevTwenty = new Date(2022, 3, 20);
	const prevThirtyOne = new Date(2022, 2, 31);

	test('Находит ближайшее предыдущее число в этом же месяце', () => {
		expect(+getPrevMonthDay(day, [10])).toBe(+prevTenth);
		expect(+getPrevMonthDay(day, [5, 10])).toBe(+prevTenth);
	});

	test('Если текущее число указано в массивее, возвращает его', () => {
		expect(+getPrevMonthDay(day, [15])).toBe(+day);
	});

	test('Находит ближайшее предыдущее число в предыдущем месяце', () => {
		expect(+getPrevMonthDay(day, [19, 20])).toBe(+prevTwenty);
	});

	test('Если в предыдущем месяце нет указанного числа, ищет ближайший предыдущий месяц', () => {
		expect(+getPrevMonthDay(day, [31])).toBe(+prevThirtyOne);
	});
});

describe('Get next month day', () => {
	const day = new Date(2022, 4, 25);
	const nextTwentySixth = new Date(2022, 4, 26);
	const nextFifth = new Date(2022, 5, 5);

	test('Находит ближайшее следующее число в этом же месяце', () => {
		expect(+getNextMonthDay(day, [26])).toBe(+nextTwentySixth);
	});

	test('Если текущее число указано в массивее, возвращает его', () => {
		expect(+getNextMonthDay(day, [25])).toBe(+day);
	});

	test('Находит ближайшее следующее число в следующем месяце', () => {
		expect(+getNextMonthDay(day, [5, 10])).toBe(+nextFifth);
	});
});

import { DayModel } from '../models/Day';
import {
	isPeriodTaskVisibleOnDay,
} from './getDayTasks';
import { TaskModel } from '../models/Task';
import {
	PeriodUnits,
	RepeatTypes,
	WeekDays,
} from '../../types';
import { cloneDate } from '../../utils/date';
import { MS_IN_DAY } from '../../utils/date/constants';



describe('Повторение по дням недели', () => {
	const createdDate = new Date(2022, 3, 10);
	const mondayDate = new Date(2022, 4, 2);
	const fridayDate = new Date(2022, 4, 6);
	const sundayDate = new Date(2022, 4, 8);

	const monday = DayModel(+mondayDate);
	const friday = DayModel(+fridayDate);
	const sunday = DayModel(+sundayDate);

	const fridayMondayTask = TaskModel({
		repeat: true,
		repeatType: RepeatTypes.WeekDays,
		weekDays: [WeekDays.Friday, WeekDays.Monday],
		createdMoment: +createdDate,
		resheduleToNextDay: false
	});

	const fridayMondayResheduledTask = TaskModel({
		repeat: true,
		repeatType: RepeatTypes.WeekDays,
		weekDays: [WeekDays.Friday, WeekDays.Monday],
		createdMoment: +createdDate,
		resheduleToNextDay: true
	});

	describe('В прошлом', () => {
		test('Задача видна в указанные дни, если была в них отмечена', () => {});

		test('Задача не видна в указанные дни, если не была в них отмечена', () => {});
		test('Задача видна в неуказанные дни, если была в них отмечена', () => {});

		test('Задача не видна в неуказанные дни, если не была в них отмечена', () => {});
	});

	describe('В будущем', () => {
		test('Задача видна в указанные дни в будущем', () => {});
		test('Задача не видна в неуказанные дни в будущем', () => {});
	});

	describe('Если последняя запланированная задача не выполнена', () => {
		test('С опцией переносить на следующий день, задача видна сегодня', () => {});
		test('Без опции переносить на следующий день, задача не видна сегодня', () => {});
	});

	// test('Задача видна в указанные дни', () => {
	// 	expect(isWeekDaysTaskVisibleOnDay(fridayMondayTask, friday)).toBe(true);
	// 	expect(isWeekDaysTaskVisibleOnDay(fridayMondayTask, monday)).toBe(true);
	// });

	// test('Задача не видна в другие дни', () => {
	// 	expect(isWeekDaysTaskVisibleOnDay(fridayMondayTask, friday)).toBe(true);
	// 	expect(isWeekDaysTaskVisibleOnDay(fridayMondayTask, monday)).toBe(true);
	// 	expect(isWeekDaysTaskVisibleOnDay(fridayMondayTask, sunday)).toBe(
	// 		false
	// 	);
	// });
});

describe('Повторение по дням месяца', () => {
	const createdDate = new Date(2022, 4, 1);
	const secondDayDate = new Date(2022, 4, 2);
	const secondDayDate2 = new Date(2022, 6, 2);
	const thirdDayDate = new Date(2022, 5, 3);
	const eleventhDayDate = new Date(2022, 6, 11);

	const secondDay = DayModel(+secondDayDate);
	const secondDay2 = DayModel(+secondDayDate2);
	const thirdDay = DayModel(+thirdDayDate);
	const eleventhDay = DayModel(+eleventhDayDate);

	const secondEleventhDayTask = TaskModel({
		repeat: true,
		repeatType: RepeatTypes.MonthDays,
		monthDays: [2, 11],
		createdMoment: +createdDate,
		resheduleToNextDay: false
	});

	const secondEleventhDayResheduledTask = TaskModel({
		repeat: true,
		repeatType: RepeatTypes.MonthDays,
		monthDays: [2, 11],
		createdMoment: +createdDate,
		resheduleToNextDay: true
	});

	describe('В прошлом', () => {
		test('Задача видна в указанные дни, если была в них отмечена', () => {});

		test('Задача не видна в указанные дни, если не была в них отмечена', () => {});
		test('Задача видна в неуказанные дни, если была в них отмечена', () => {});

		test('Задача не видна в неуказанные дни, если не была в них отмечена', () => {});
	});

	describe('В настоящем и будущем', () => {
		test('Задача видна в указанные дни в будущем', () => {});
		test('Задача не видна в неуказанные дни в будущем', () => {});
		test('Если последняя запланированная задача не выполнена, задача видна сегодня', () => {});
	});

	describe('Если последняя запланированная задача не выполнена', () => {
		test('С опцией переносить на следующий день, задача видна сегодня', () => {});
		test('Без опции переносить на следующий день, задача не видна сегодня', () => {});
	});



	// test('2th & 11th task is visible only on 2th & 11th dates', () => {
	// 	const secondEleventhDayTask = TaskModel({
	// 		repeat: true,
	// 		repeatType: RepeatTypes.MonthDays,
	// 		monthDays: [2, 11],
	// 		createdMoment: +createdDate,
	// 	});

	// 	expect(
	// 		isMonthDaysTaskVisibleOnDay(secondEleventhDayTask, secondDay2)
	// 	).toBe(true);
	// 	expect(
	// 		isMonthDaysTaskVisibleOnDay(secondEleventhDayTask, eleventhDay)
	// 	).toBe(true);
	// 	expect(
	// 		isMonthDaysTaskVisibleOnDay(secondEleventhDayTask, thirdDay)
	// 	).toBe(false);
	// });
});

describe('Повторение через период', () => {
	test('Period task is not visible if startMoment is after date', () => {
		const startDate = new Date(2022, 4, 8);

		const date = new Date(2022, 5, 8);

		const periodTask = TaskModel({
			repeat: true,
			repeatType: RepeatTypes.Period,
			periodUnit: PeriodUnits.Days,
			periodValue: 10,
			startMoment: +startDate,
			createdMoment: +startDate,
		});

		const day = DayModel(+date);

		expect(isPeriodTaskVisibleOnDay(periodTask, day)).toBe(false);
	});

	test('10 days period task is visible after 0, 10, 50 days', () => {
		const startDate = new Date(2022, 4, 8);
		const startMoment = +startDate;

		const periodTask = TaskModel({
			repeat: true,
			repeatType: RepeatTypes.Period,
			periodUnit: PeriodUnits.Days,
			periodValue: 10,
			startMoment: startMoment,
			createdMoment: startMoment,
		});

		const day1 = DayModel(startMoment);
		const day2 = DayModel(startMoment + 10 * MS_IN_DAY);
		const day3 = DayModel(startMoment + 11 * MS_IN_DAY);
		const day4 = DayModel(startMoment + 50 * MS_IN_DAY);

		expect(isPeriodTaskVisibleOnDay(periodTask, day1)).toBe(true);
		expect(isPeriodTaskVisibleOnDay(periodTask, day2)).toBe(true);
		expect(isPeriodTaskVisibleOnDay(periodTask, day3)).toBe(false);
		expect(isPeriodTaskVisibleOnDay(periodTask, day4)).toBe(true);
	});

	test('2 months period task is visible after 0, 2, 12 months', () => {
		const startDate = new Date(2022, 4, 8);
		const startMoment = +startDate;

		const periodTask = TaskModel({
			repeat: true,
			repeatType: RepeatTypes.Period,
			periodUnit: PeriodUnits.Months,
			periodValue: 2,
			startMoment,
			createdMoment: startMoment,
		});

		const date2 = cloneDate(startDate);
		date2.setMonth(startDate.getMonth() + 2);

		const date3 = cloneDate(startDate);
		date3.setMonth(startDate.getMonth() + 12);

		const date4 = cloneDate(startDate);
		date4.setMonth(startDate.getMonth() + 1);

		const day1 = DayModel(startMoment);
		const day2 = DayModel(+date2);
		const day3 = DayModel(+date3);
		const day4 = DayModel(+date4);

		expect(isPeriodTaskVisibleOnDay(periodTask, day1)).toBe(true);
		expect(isPeriodTaskVisibleOnDay(periodTask, day2)).toBe(true);
		expect(isPeriodTaskVisibleOnDay(periodTask, day3)).toBe(true);
		expect(isPeriodTaskVisibleOnDay(periodTask, day4)).toBe(false);
	});

	test('months period task is visible only in the same dates', () => {
		const startDate = new Date(2022, 4, 8);
		const startMoment = +startDate;
		const date2 = new Date(2022, 6, 9);
		const day2 = DayModel(+date2);

		const periodTask = TaskModel({
			repeat: true,
			repeatType: RepeatTypes.Period,
			periodUnit: PeriodUnits.Months,
			periodValue: 2,
			startMoment,
			createdMoment: startMoment,
		});

		expect(isPeriodTaskVisibleOnDay(periodTask, day2)).toBe(false);
	});
});

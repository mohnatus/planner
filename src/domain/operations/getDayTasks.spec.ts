import { DayModel } from '../models/Day';
import {
	isMonthDaysTaskVisibleOnDay,
	isNoRepeatTaskVisibleOnDay,
	isPeriodTaskVisibleOnDay,
	isWeekDaysTaskVisibleOnDay,
} from './getDayTasks';
import { TaskModel } from '../models/Task';
import { Day, PeriodUnits, RepeatTypes, Task, WeekDays } from '../types';
import { cloneDate, getToday, MS_IN_DAY } from '../utils';

const todayMoment = getToday();
const yesterdayMoment = todayMoment - MS_IN_DAY;
const tomorrowMoment = todayMoment + MS_IN_DAY;

describe('Check noRepeat task', () => {
	const today: Day = DayModel(todayMoment);
	const yesterday: Day = DayModel(yesterdayMoment);
	const tomorrow: Day = DayModel(tomorrowMoment);

	test('Task without resheduling is visible only on the day of creation', () => {
		const yesterdayTask: Task = TaskModel({
			createdMoment: yesterdayMoment,
		});
		const todayTask: Task = TaskModel({});

		expect(isNoRepeatTaskVisibleOnDay(yesterdayTask, yesterday)).toBe(true);
		expect(isNoRepeatTaskVisibleOnDay(yesterdayTask, today)).toBe(false);
		expect(isNoRepeatTaskVisibleOnDay(todayTask, today)).toBe(true);
		expect(isNoRepeatTaskVisibleOnDay(todayTask, tomorrow)).toBe(false);
		expect(isNoRepeatTaskVisibleOnDay(todayTask, yesterday)).toBe(false);
	});

	test('Resheduled task is visible only today', () => {
		const yesterdayTask: Task = TaskModel({
			createdMoment: yesterdayMoment,
			resheduleToNextDay: true,
		});
		const todayTask: Task = TaskModel({
			resheduleToNextDay: true,
		});

		expect(isNoRepeatTaskVisibleOnDay(yesterdayTask, today)).toBe(true);
		expect(isNoRepeatTaskVisibleOnDay(todayTask, today)).toBe(true);
		expect(isNoRepeatTaskVisibleOnDay(todayTask, tomorrow)).toBe(false);
	});

	test('Checked task is visible only on the day of check', () => {
		const yesterdayTask: Task = TaskModel({
			createdMoment: yesterdayMoment,
			checkedMoment: yesterdayMoment,
		});

		const yesterdayResheduledTask: Task = TaskModel({
			resheduleToNextDay: true,
			createdMoment: yesterdayMoment,
			checkedMoment: todayMoment,
		});

		expect(isNoRepeatTaskVisibleOnDay(yesterdayTask, yesterday)).toBe(true);
		expect(isNoRepeatTaskVisibleOnDay(yesterdayTask, today)).toBe(false);
		expect(isNoRepeatTaskVisibleOnDay(yesterdayTask, tomorrow)).toBe(false);

		expect(
			isNoRepeatTaskVisibleOnDay(yesterdayResheduledTask, yesterday)
		).toBe(false);
		expect(isNoRepeatTaskVisibleOnDay(yesterdayResheduledTask, today)).toBe(
			true
		);
		expect(
			isNoRepeatTaskVisibleOnDay(yesterdayResheduledTask, tomorrow)
		).toBe(false);
	});
});

describe('Check weekDays task', () => {
	const createdDate = new Date(2022, 3, 10);
	const mondayDate = new Date(2022, 4, 2);
	const fridayDate = new Date(2022, 4, 6);
	const sundayDate = new Date(2022, 4, 8);

	const monday = DayModel(+mondayDate);
	const friday = DayModel(+fridayDate);
	const sunday = DayModel(+sundayDate);

	test('Friday task is visible only on Fridays', () => {
		const fridayTask = TaskModel({
			repeat: true,
			repeatType: RepeatTypes.WeekDays,
			weekDays: [WeekDays.Friday],
			createdMoment: +createdDate,
		});

		expect(isWeekDaysTaskVisibleOnDay(fridayTask, friday)).toBe(true);
		expect(isWeekDaysTaskVisibleOnDay(fridayTask, monday)).toBe(false);
	});

	test('Friday & monday task is visible only on Fridays and Mondays', () => {
		const fridayMondayTask = TaskModel({
			repeat: true,
			repeatType: RepeatTypes.WeekDays,
			weekDays: [WeekDays.Friday, WeekDays.Monday],
			createdMoment: +createdDate,
		});

		expect(isWeekDaysTaskVisibleOnDay(fridayMondayTask, friday)).toBe(true);
		expect(isWeekDaysTaskVisibleOnDay(fridayMondayTask, monday)).toBe(true);
		expect(isWeekDaysTaskVisibleOnDay(fridayMondayTask, sunday)).toBe(
			false
		);
	});
});

describe('Check monthDays task', () => {
	const createdDate = new Date(2022, 4, 1);
	const secondDayDate = new Date(2022, 4, 2);
	const secondDayDate2 = new Date(2022, 6, 2);
	const thirdDayDate = new Date(2022, 5, 3);
	const eleventhDayDate = new Date(2022, 6, 11);

	const secondDay = DayModel(+secondDayDate);
	const secondDay2 = DayModel(+secondDayDate2);
	const thirdDay = DayModel(+thirdDayDate);
	const eleventhDay = DayModel(+eleventhDayDate);

	test('2th day task is visible only on 2th dates', () => {
		const secondDayTask = TaskModel({
			repeat: true,
			repeatType: RepeatTypes.MonthDays,
			monthDays: [2],
			createdMoment: +createdDate,
		});

		expect(isMonthDaysTaskVisibleOnDay(secondDayTask, secondDay)).toBe(
			true
		);
		expect(isMonthDaysTaskVisibleOnDay(secondDayTask, secondDay2)).toBe(
			true
		);
		expect(isMonthDaysTaskVisibleOnDay(secondDayTask, thirdDay)).toBe(
			false
		);
	});

	test('2th & 11th task is visible only on 2th & 11th dates', () => {
		const secondEleventDayTask = TaskModel({
			repeat: true,
			repeatType: RepeatTypes.MonthDays,
			monthDays: [2, 11],
			createdMoment: +createdDate,
		});

		expect(
			isMonthDaysTaskVisibleOnDay(secondEleventDayTask, secondDay2)
		).toBe(true);
		expect(
			isMonthDaysTaskVisibleOnDay(secondEleventDayTask, eleventhDay)
		).toBe(true);
		expect(
			isMonthDaysTaskVisibleOnDay(secondEleventDayTask, thirdDay)
		).toBe(false);
	});
});

describe('Check period task', () => {
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

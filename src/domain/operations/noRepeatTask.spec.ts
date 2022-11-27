import { Day, Moment, Task, TaskMomentsList } from '../../types';
import { MS_IN_DAY } from '../../utils/date/constants';
import { getTodayMoment } from '../../utils/date/today';
import { DayModel } from '../models/Day';
import { TaskModel } from '../models/Task';
import { TaskMomentsModel } from '../models/TaskMoments';
import { isNoRepeatTaskVisibleOnDay } from './noRepeatTask';

const todayMoment: Moment = getTodayMoment();
const yesterdayMoment: Moment = todayMoment - MS_IN_DAY;
const tomorrowMoment: Moment = todayMoment + MS_IN_DAY;

const today: Day = DayModel(todayMoment);
const yesterday: Day = DayModel(yesterdayMoment);
const tomorrow: Day = DayModel(tomorrowMoment);

describe('Без переноса на следующий день', () => {
	const yesterdayTask: Task = TaskModel({
		startMoment: yesterdayMoment,
		resheduleToNextDay: false,
	});
	const todayTask: Task = TaskModel({
		resheduleToNextDay: false,
	});

	describe('Невыполненная задача', () => {
		const taskMomentsList: TaskMomentsList = {};

		test('Задача видна в день начала отсчета', () => {
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayTask,
					yesterday,
					taskMomentsList
				)
			).toBe(true);

			expect(
				isNoRepeatTaskVisibleOnDay(todayTask, today, taskMomentsList)
			).toBe(true);
		});

		test('Задача не видна в другие дни', () => {
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayTask,
					today,
					taskMomentsList
				)
			).toBe(false);
			expect(
				isNoRepeatTaskVisibleOnDay(todayTask, tomorrow, taskMomentsList)
			).toBe(false);
			expect(
				isNoRepeatTaskVisibleOnDay(
					todayTask,
					yesterday,
					taskMomentsList
				)
			).toBe(false);
		});
	});

	describe('Выполненная задача', () => {
		const taskMomentsList: TaskMomentsList = {
			[yesterdayTask.id]: TaskMomentsModel(yesterdayTask.id, {
				checks: [{ moment: yesterdayMoment }],
			}),
		};

		test('Задача видна в день начала отсчета', () => {
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayTask,
					yesterday,
					taskMomentsList
				)
			).toBe(true);
		});

		test('Задача не видна в другие дни', () => {
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayTask,
					today,
					taskMomentsList
				)
			).toBe(false);
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayTask,
					tomorrow,
					taskMomentsList
				)
			).toBe(false);
		});
	});
});

describe('С переносом на следующий день', () => {
	const yesterdayResheduledTask: Task = TaskModel({
		createdMoment: yesterdayMoment,
		resheduleToNextDay: true,
	});
	const todayResheduledTask: Task = TaskModel({
		resheduleToNextDay: true,
	});

	describe('Невыполненная задача', () => {
		const taskMomentsList = {};

		test('Задача видна сегодня', () => {
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayResheduledTask,
					today,
					taskMomentsList
				)
			).toBe(true);
			expect(
				isNoRepeatTaskVisibleOnDay(
					todayResheduledTask,
					today,
					taskMomentsList
				)
			).toBe(true);
		});

		test('Задача не видна в другие дни', () => {
			expect(
				isNoRepeatTaskVisibleOnDay(
					todayResheduledTask,
					tomorrow,
					taskMomentsList
				)
			).toBe(false);
		});
	});

	describe('Выполненная задача', () => {
		const taskMomentsList: TaskMomentsList = {
			[yesterdayResheduledTask.id]: TaskMomentsModel(
				yesterdayResheduledTask.id,
				{
					checks: [{ moment: todayMoment }],
				}
			),
		};

		test('Задача видна в день выполнения', () => {
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayResheduledTask,
					today,
					taskMomentsList
				)
			).toBe(true);
		});

		test('Задача не видна в другие дни', () => {
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayResheduledTask,
					yesterday,
					taskMomentsList
				)
			).toBe(false);
			expect(
				isNoRepeatTaskVisibleOnDay(
					yesterdayResheduledTask,
					tomorrow,
					taskMomentsList
				)
			).toBe(false);
		});
	});

	describe('Старт в будущем', () => {
		const tomorrowTask: Task = TaskModel({
			resheduleToNextDay: false,
			startMoment: tomorrowMoment,
      createdMoment: yesterdayMoment
		});

    test('Задача видна в день старта', () => {
      const taskMomentsList = {};

      expect(
				isNoRepeatTaskVisibleOnDay(
					tomorrowTask,
					tomorrow,
					taskMomentsList
				)
			).toBe(true);
    })
	});
});

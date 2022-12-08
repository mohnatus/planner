import { PlannerData, TasksList } from '../../types';
import { MS_IN_DAY } from '../../utils/date/constants';
import { getTodayMoment } from '../../utils/date/today';
import { DayModel } from '../models/Day';
import { RoutineModel } from '../models/Routine';
import { TaskModel } from '../models/Task';
import { getNoRepeatRoutineTasks } from './noRepeatRoutine';

type DateParams = [
	year: number,
	month: number,
	day: number,
	hours?: number,
	minutes?: number
];

/** UTILS */

const getMoment = (...dateParams: DateParams) => {
	const date = new Date(...dateParams);
	return +date;
};

const getRoutineData = (params?: Partial<PlannerData>) => {
	return {
		checks: [],
		moments: [],
		...(params || {}),
	};
};

/** TEST DATA */

const todayMoment = getTodayMoment();
const tomorrowMoment = todayMoment + MS_IN_DAY;

const startMoment = getMoment(2022, 5, 15);
const prevDayMoment = getMoment(2022, 5, 14);
const nextDayMoment = getMoment(2022, 5, 16);

/** Неповторяющиеся задачи (все) */

describe('Неповторяющися задачи (все)', () => {
	const routine = RoutineModel({
		startMoment,
		repeat: false,
		resheduleToNextDay: false,
	});

	const routineData = getRoutineData();

	test('Не показывать раньше старта задачи', () => {
		const day = DayModel(prevDayMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, routineData);
		expect(tasksList.length).toBe(0);
	});

	test('Не показывать после сегодня', () => {
		const day = DayModel(tomorrowMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, routineData);
		expect(tasksList.length).toBe(0);
	});

	test('Будущую рутину показывать в день старта', () => {
		const futureRoutine = RoutineModel({
			startMoment: tomorrowMoment,
			repeat: false,
			resheduleToNextDay: false,
		});
		const subRoutineId = futureRoutine.subRoutines[0].id;
		const day = DayModel(tomorrowMoment);
		const tasksList = getNoRepeatRoutineTasks(
			futureRoutine,
			day,
			routineData
		);
		expect(tasksList.length).toBe(1);
		expect(tasksList[0].subRoutineId).toBe(subRoutineId);
	});
});

/** Неповторяющиеся задачи без перепланирования */

describe('Без перепланирования', () => {
	const routine = RoutineModel({
		startMoment,
		repeat: false,
		resheduleToNextDay: false,
	});

	const subRoutine = routine.subRoutines[0];
	const subRoutineId = subRoutine.id;

	const routineData = getRoutineData();

	test('Показывать в день старта задачи', () => {
		const day = DayModel(startMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, routineData);
		expect(tasksList.length).toBe(1);
		expect(tasksList[0].subRoutineId).toBe(subRoutineId);
	});

	test('Не показывать на следующий день после старта задачи', () => {
		const day = DayModel(nextDayMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, routineData);
		expect(tasksList.length).toBe(0);
	});

	test('Не показывать сегодня', () => {
		const day = DayModel(todayMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, routineData);
		expect(tasksList.length).toBe(0);
	});

	describe('Выполненные', () => {
		const checkMoment = getMoment(2022, 5, 18);
		const checkDay = DayModel(checkMoment);

		const checks: TasksList = [TaskModel(routine, subRoutine, checkDay)];
		const routineData = getRoutineData({ checks });

		test('Не показывать в день старта задачи', () => {
			const day = DayModel(startMoment);
			const tasksList = getNoRepeatRoutineTasks(
				routine,
				day,
				routineData
			);
			expect(tasksList.length).toBe(0);
		});

		test('Показывать в день выполнения', () => {
			const tasksList = getNoRepeatRoutineTasks(
				routine,
				checkDay,
				routineData
			);
			expect(tasksList.length).toBe(1);
			expect(tasksList[0].subRoutineId).toBe(subRoutineId);
		});
	});
});

/** Неповторяющиеся задачи с перепланированием */

describe('С перепланированием', () => {
	const routine = RoutineModel({
		startMoment,
		repeat: false,
		resheduleToNextDay: true,
	});

	const subRoutine = routine.subRoutines[0];
	const subRoutineId = subRoutine.id;

	test('Не показывать в день старта задачи', () => {
		const day = DayModel(startMoment);
		const tasksList = getNoRepeatRoutineTasks(
			routine,
			day,
			getRoutineData()
		);
		expect(tasksList.length).toBe(0);
	});

	test('Показывать сегодня', () => {
		const day = DayModel(todayMoment);
		const tasksList = getNoRepeatRoutineTasks(
			routine,
			day,
			getRoutineData()
		);
		expect(tasksList.length).toBe(1);
		expect(tasksList[0].subRoutineId).toBe(subRoutineId);
	});

	describe('Выполненные', () => {
		const checkMoment = getMoment(2022, 5, 18);
		const checkDay = DayModel(checkMoment);

		const checks: TasksList = [TaskModel(routine, subRoutine, checkDay)];

		test('Не показывать в день старта задачи', () => {
			const day = DayModel(startMoment);
			const tasksList = getNoRepeatRoutineTasks(
				routine,
				day,
				getRoutineData({
					checks,
				})
			);
			expect(tasksList.length).toBe(0);
		});

		test('Показывать в день выполнения', () => {
			const tasksList = getNoRepeatRoutineTasks(
				routine,
				checkDay,
				getRoutineData({
					checks,
				})
			);
			expect(tasksList.length).toBe(1);
			expect(tasksList[0].subRoutineId).toBe(subRoutineId);
		});

		test('Не показывать сегодня', () => {
			const day = DayModel(todayMoment);
			const tasksList = getNoRepeatRoutineTasks(
				routine,
				day,
				getRoutineData({
					checks,
				})
			);
			expect(tasksList.length).toBe(0);
		});
	});
});

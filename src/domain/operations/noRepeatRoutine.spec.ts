import { TasksList } from '../../types';
import { MS_IN_DAY } from '../../utils/date/constants';
import { getTodayMoment } from '../../utils/date/today';
import { DayModel } from '../models/Day';
import { RoutineModel } from '../models/Routine';
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

/** TEST DATA */

const emptyChecks: TasksList = [];

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

	test('Не показывать раньше старта задачи', () => {
		const day = DayModel(prevDayMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, emptyChecks);
		expect(tasksList.length).toBe(0);
	});

  test('Не показывать после сегодня', () => {
		const day = DayModel(tomorrowMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, emptyChecks);
		expect(tasksList.length).toBe(0);
	});
});

/** Неповторяющиеся задачи без перепланирования */

describe('Без перепланирования', () => {
	const routine = RoutineModel({
		startMoment,
		repeat: false,
		resheduleToNextDay: false,
	});

	const subRoutineId = routine.subRoutines[0].id;

	test('Показывать в день старта задачи', () => {
		const day = DayModel(startMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, emptyChecks);
		expect(tasksList.length).toBe(1);
		expect(tasksList[0].subRoutineId).toBe(subRoutineId);
	});

	test('Не показывать на следующий день после старта задачи', () => {
		const day = DayModel(nextDayMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, emptyChecks);
		expect(tasksList.length).toBe(0);
	});

	test('Не показывать сегодня', () => {
		const day = DayModel(todayMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, emptyChecks);
		expect(tasksList.length).toBe(0);
	});
});

/** Неповторяющиеся задачи с перепланированием */

describe('С перепланированием', () => {
	const routine = RoutineModel({
		startMoment,
		repeat: false,
		resheduleToNextDay: true,
	});

	const subRoutineId = routine.subRoutines[0].id;

  test('Не показывать в день старта задачи', () => {
		const day = DayModel(startMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, emptyChecks);
		expect(tasksList.length).toBe(0);
	});

  test('Показывать сегодня', () => {
		const day = DayModel(todayMoment);
		const tasksList = getNoRepeatRoutineTasks(routine, day, emptyChecks);
		expect(tasksList.length).toBe(1);
    expect(tasksList[0].subRoutineId).toBe(subRoutineId);
	});
});

import {
	Day,
	Moment,
	PlannerData,
	Routine,
	RoutineData,
	SubRoutine,
	Task,
	TaskMomentId,
	TaskMomentsList,
	TasksList,
} from '../../types';
import { getDayOfWeek, getMoment } from '../../utils/date';
import { MS_IN_DAY } from '../../utils/date/constants';
import { addDays } from '../../utils/date/manipulations';
import { getTodayMoment } from '../../utils/date/today';
import { getNextWeekDay, getPrevWeekDay } from '../../utils/date/week';
import { TaskModel } from '../models/Task';

function getWeekDaysRoutinePeriodStart(routine: Routine, dayMoment: Moment): Moment {
	const { weekDays } = routine;
	const date = getPrevWeekDay(dayMoment, weekDays);
	return getMoment(date);
}

function getWeekDaysRoutinePeriodEnd(routine: Routine, dayMoment: Moment): Moment {
	const { weekDays } = routine;

	const weekDay = getDayOfWeek(dayMoment);
	if (weekDays.includes(weekDay)) {
		dayMoment = dayMoment + MS_IN_DAY;
	}

	const date = getNextWeekDay(dayMoment, weekDays);
	return getMoment(date);
}

export function getWeekDaysTaskMomentId(
	routine: Routine,
	task: Task,
	day: Moment
): TaskMomentId {
	const periodStart = getWeekDaysRoutinePeriodStart(routine, day);
	return `${task.subRoutineId}__${periodStart}`;
}

export function getWeekDaysTaskStartMoment(
	routine: Routine,
	task: Task,
	day: Moment,
	moments: TaskMomentsList
): Moment | null {
	const taskMomentId = getWeekDaysTaskMomentId(routine, task, day);

	const taskMoment = moments.find((moment) => moment.id === taskMomentId);
	console.log({ taskMomentId, taskMoment, moments });
	if (taskMoment) return taskMoment.to;

	return getWeekDaysRoutinePeriodStart(routine, day);
}

export function getWeekDaysRoutineTasks(
	routine: Routine,
	day: Day,
	routineData: RoutineData
): Array<Task> {
	const tasks: TasksList = [];

	if (routine.startMoment > day.moment) return tasks;

	const { checks, moments } = routineData;

	const todayMoment = getTodayMoment();

	// для каждого времени - свой таск
	const { subRoutines = [] } = routine;

	subRoutines.forEach((subRoutine: SubRoutine) => {
		const task = TaskModel(routine, subRoutine, day);

		const taskStartMoment = getWeekDaysTaskStartMoment(
			routine,
			task,
			day.moment,
			moments
		);

		console.log({ task, day, taskStartMoment });

		if (!taskStartMoment) return;

		// таск начинается после выбранного дня
		if (taskStartMoment > day.moment) return;

		const taskPeriodEnd = getWeekDaysRoutinePeriodEnd(routine, day.moment);

		// таск закончился до выбранного дня
		if (taskPeriodEnd <= day.moment) return;

		// таск начинается в будущем
		if (taskStartMoment > todayMoment) {
			// показывать в день старта таска
			if (day.moment === taskStartMoment) tasks.push(task);
			return;
		}

		const check = checks.find((check) => {
			return (
				check.subRoutineId === subRoutine.id &&
				check.moment < taskPeriodEnd &&
				check.moment <= todayMoment &&
				check.moment >= taskStartMoment
			);
		});

		// таск был выполнен
		if (check) {
			// показывать в день выполнения
			if (check.moment === day.moment) tasks.push(task);
			return;
		}

		// перепланирование на след. день включено
		if (routine.resheduleToNextDay) {
			// показывать сегодня
			if (todayMoment === day.moment) tasks.push(task);
			return;
		}

		// показывать в день планирования
		if (taskStartMoment === day.moment) tasks.push(task);
	});

	return tasks;
}

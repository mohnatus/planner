import { DayTaskModel } from '../models/DayTask';
import {
	TasksList,
	Task,
	DayTasksList,
	Day,
	RepeatTypes,
	PeriodUnits,
	IRepeatTask,
	TaskMomentsList,
} from '../types';
import {
	getDate,
	getDayOfMonth,
	getDiffInDays,
	getDiffInMonths,
	getToday,
} from '../utils';

export function getActiveTasks(tasks: TasksList): TasksList {
	return tasks.filter((task: Task) => {
		return task.active;
	});
}

export function isNoRepeatTaskVisibleOnDay(
	task: Task,
	day: Day,
	moments: TaskMomentsList
): boolean {
	if (!task.resheduleToNextDay) {
		return task.createdMoment === day.moment;
	}

	const taskMoments = moments[task.id];
	if (taskMoments) {
		const [checkMoment] = taskMoments.checks;
		if (checkMoment) {
			return checkMoment === day.moment;
		}
	}

	const today = getToday();

	return today === day.moment;
}

export function isWeekDaysTaskVisibleOnDay(task: Task, day: Day): boolean {
	return task.weekDays.includes(day.weekDay);
}

export function isMonthDaysTaskVisibleOnDay(task: Task, day: Day): boolean {
	return task.monthDays.includes(day.monthDay);
}

export function isPeriodTaskVisibleOnDay(task: IRepeatTask, day: Day): boolean {
	const startMoment = task.startMoment;
	if (startMoment > day.moment) return false;

	const dayDate = new Date(day.moment);
	const startDate = new Date(startMoment);

	if (task.periodUnit === PeriodUnits.Months) {
		const startDate = getDate(startMoment);
		const startDateMonthDay = getDayOfMonth(startDate);

		if (startDateMonthDay !== day.monthDay) {
			return false;
		}

		const diffInMonths = getDiffInMonths(startDate, dayDate);

		if (diffInMonths % task.periodValue === 0) return true;
	}

	const diffInDays = getDiffInDays(dayDate, startDate);

	if (diffInDays % task.periodValue === 0) return true;

	return false;
}

export function isTaskVisibleOnDay(
	task: Task,
	day: Day,
	moments: TaskMomentsList
): boolean {
	// task was created later
	if (task.createdMoment > day.moment) return false;

	// if task has custom moments
	const taskMoments = moments[task.id];

	if (taskMoments) {
		const { include, exclude } = taskMoments;
		// includes
		if (include.includes(day.moment)) return true;

		// excludes
		if (exclude.includes(day.moment)) return false;
	}

	// base exclude settings
	const { exclude, repeat, repeatType } = task;

	if (exclude.weekDays.includes(day.weekDay)) return false;
	if (exclude.monthDays.includes(day.monthDay)) return false;

	// repeat settings
	if (!repeat) {
		return isNoRepeatTaskVisibleOnDay(task, day, moments);
	}
	if (repeatType === RepeatTypes.WeekDays) {
		return isWeekDaysTaskVisibleOnDay(task, day);
	}
	if (repeatType === RepeatTypes.MonthDays) {
		return isMonthDaysTaskVisibleOnDay(task, day);
	}
	return isPeriodTaskVisibleOnDay(task, day);
}

export function getDayTasks(
	tasks: TasksList,
	day: Day,
	moments: TaskMomentsList
): DayTasksList {
	const activeTasks = getActiveTasks(tasks);

	const dayTasks = activeTasks.filter((task: Task) => {
		return isTaskVisibleOnDay(task, day, moments);
	});

	const dayTasksList: DayTasksList = [];

	dayTasks.forEach((task: Task) => {
		let timeList: Array<number | null> = [...task.defaultTime];

		const taskMoments = moments[task.id];

		if (taskMoments) {
			if (taskMoments.time[day.moment]) {
				timeList = taskMoments.time[day.moment];
			}
		}

		if (!timeList.length) {
			timeList.push(null);
		}

		timeList.forEach((time: number | null) => {
			const dayTask = DayTaskModel(task, time);
			dayTasksList.push(dayTask);
		});
	});

	return dayTasksList;
}

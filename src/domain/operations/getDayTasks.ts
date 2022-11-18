import { DayTaskModel } from '../entities/DayTask';
import {
	TasksList,
	Task,
	DayTasksList,
	Day,
	RepeatTypes,
	PeriodUnits,
	IRepeatTask,
	TaskExceptionsList,
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

export function isNoRepeatTaskVisibleOnDay(task: Task, day: Day): boolean {
	if (!task.resheduleToNextDay) {
		return task.createdMoment === day.moment;
	}

	if (task.checkedMoment) {
		return task.checkedMoment === day.moment;
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
	exceptions: TaskExceptionsList
): boolean {
	const taskExceptions = exceptions[task.id];

	if (taskExceptions) {
		const { include, exclude } = taskExceptions;
		// includes
		if (include.moments.includes(day.id)) return true;

		// excludes
		if (exclude.moments.includes(day.id)) return false;
		if (exclude.weekDays.includes(day.weekDay)) return false;
		if (exclude.monthDays.includes(day.monthDay)) return false;
	}

	// no-repeat
	if (!task.repeat) {
		return isNoRepeatTaskVisibleOnDay(task, day);
	}

	// repeat
	if (task.repeatType === RepeatTypes.WeekDays) {
		return isWeekDaysTaskVisibleOnDay(task, day);
	}
	if (task.repeatType === RepeatTypes.MonthDays) {
		return isMonthDaysTaskVisibleOnDay(task, day);
	}
	return isPeriodTaskVisibleOnDay(task, day);
}

export function getDayTasks(
	tasks: TasksList,
	day: Day,
	exceptions: TaskExceptionsList
): DayTasksList {
	const activeTasks = getActiveTasks(tasks);

	const dayTasks = activeTasks.filter((task: Task) => {
		return isTaskVisibleOnDay(task, day, exceptions);
	});

	const dayTasksList: DayTasksList = [];

	dayTasks.forEach((task: Task) => {
		let timeList: Array<number | null> = [...task.defaultTime];

		const taskExceptions = exceptions[task.id];

		if (taskExceptions) {
			if (taskExceptions.time[day.id]) {
				timeList = taskExceptions.time[day.id];
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

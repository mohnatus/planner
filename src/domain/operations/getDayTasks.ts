import { DayModel } from '../models/Day';
import { DayTaskModel } from '../models/DayTask';
import {
	Moment,
	TasksList,
	Task,
	DayTasksList,
	Day,
	RepeatTypes,
	PeriodUnits,
	IRepeatTask,
	TaskMomentsList,
	TaskCheck,
} from '../../types';
import { getDayOfMonth } from '../../utils/date';
import { getTodayMoment } from '../../utils/date/today';
import { getDiffInDays, getDiffInMonths } from '../../utils/date/diff';
import { isNoRepeatTaskVisibleOnDay } from './noRepeatTask';
import { isWeekDaysTaskVisibleOnDay } from './weekDaysTask';

export function getActiveTasks(tasks: TasksList): TasksList {
	return tasks.filter((task: Task) => {
		return task.active;
	});
}





export function isMonthDaysTaskVisibleOnDay(task: Task, day: Day): boolean {
	return task.monthDays.includes(day.monthDay);
}

export function isPeriodTaskVisibleOnDay(task: IRepeatTask, day: Day): boolean {
	const startMoment = task.startMoment;
	if (startMoment > day.moment) return false;

	if (task.periodUnit === PeriodUnits.Months) {
		const startDateMonthDay = getDayOfMonth(startMoment);

		if (startDateMonthDay !== day.monthDay) {
			return false;
		}

		const diffInMonths = getDiffInMonths(startMoment, day.moment);

		if (diffInMonths % task.periodValue === 0) return true;
	}

	const diffInDays = getDiffInDays(startMoment, day.moment);

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

	// repeat settings
	const { repeat, repeatType } = task;

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
	dayMoment: Moment,
	moments: TaskMomentsList
): DayTasksList {
	const day = DayModel(dayMoment);

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

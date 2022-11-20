import { Moment, MonthDay, Time, WeekDays } from "../types";

export enum PeriodUnits {
	Days,
	Months,
}

export enum RepeatTypes {
	WeekDays,
	MonthDays,
	Period,
}

/****************************
 * Base Entities
 ****************************/

/** Task - настройки задачи */

export interface ITask {
	id: string;
	active: boolean;

	name: string;
	description: string;

	createdMoment: Moment;

	repeat: boolean;

	defaultTime: Array<Time>;

	exclude: {
		weekDays: Array<WeekDays>;
		monthDays: Array<MonthDay>;
	};
}

export interface INoRepeatTask {
	resheduleToNextDay: boolean;
	startMoment: Moment;
}

export interface IRepeatTask {
	repeatType: RepeatTypes;
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
	startMoment: Moment;
	periodUnit: PeriodUnits;
	periodValue: number;
}

export type Task = ITask & INoRepeatTask & IRepeatTask;

export type TasksList = Array<Task>;

export type TaskCheck = {
	moment: Moment;
	time?: Time;
};

/**
 * Task Moments
 * настройки видимости таска для конкретных дней
 */

export type TaskMoments = {
	exclude: Array<Moment>;

	include: Array<Moment>;

	time: {
		[key: Moment]: Array<Moment>;
	};

	checks: Array<TaskCheck>;
};

export type TaskMomentsList = {
	[key: string]: TaskMoments;
};

/**
 * Day Configuration
 * настройки для конкретных дней
 */

export type DayConfiguration = {
	order: Array<number>;
};

export type DaysConfiguration = {
	[key: Moment]: DayConfiguration;
};

/****************************
 * Computed Entities
 ****************************/

/** Day */

export type Day = {
	moment: Moment;
	weekDay: WeekDays;
	monthDay: MonthDay;
};

export type DaysList = {
	[key: Moment]: Day;
};

/** Day Task - отдельный таск в конкретный день */

export type DayTask = {
	id: string;
	name: string;
	description: string;
	time: Time | null;
};

export type DayTasksList = Array<DayTask>;

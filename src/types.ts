export type Moment = number;
export type MonthDay = number;
export type Time = number;

export enum WeekDays {
  Sunday,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
}

export enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export type DateComponents = {
  _dayOfMonth: MonthDay,
  _month: Months,
  _year: number,

  dayOfMonth: string,
  month: string,
  year: string,
}

export type TimeComponents = {
  _hours: number,
  _minutes: number,
  hours: string;
  minutes: string;
}

export enum PeriodUnits {
	Days,
	Months,
}

export enum RepeatTypes {
	WeekDays,
	MonthDays,
	Period,
}

export type CalendarDay = {
  moment: Moment,
  date: MonthDay,
  isToday: boolean,
  isWeekend: boolean,
  active: boolean,
}

export type CalendarMonth = Array<CalendarDay>


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
	resheduleToNextDay: boolean;

	defaultTime: Array<Time>;
}

export interface INoRepeatTask {
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
  id: string;

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
  moment: Moment;
	order: Array<number>;
};

export type DaysConfiguration = {
	[key: Moment]: DayConfiguration;
};

export interface PlannerData {
  list: TasksList,
  moments: TaskMomentsList,
  days: DaysConfiguration
}

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
  taskId: string;
	name: string;
	description: string;
	time: Time | null;
};

export type DayTasksList = Array<DayTask>;

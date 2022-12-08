export type Moment = number;
export type MonthDay = number;
export type Time = number;
export type RoutineId = string;
export type SubRoutineId = string;
export type TaskMomentId = string;

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
	December,
}

export type DateComponents = {
	_dayOfMonth: MonthDay;
	_month: Months;
	_year: number;

	dayOfMonth: string;
	month: string;
	year: string;
};

export type TimeComponents = {
	_hours: number;
	_minutes: number;
	hours: string;
	minutes: string;
};

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
	moment: Moment;
	date: MonthDay;
	isToday: boolean;
	isWeekend: boolean;
	active: boolean;
};

export type CalendarMonth = Array<CalendarDay>;

/****************************
 * Base Entities
 ****************************/

/** Routine - настройки задачи */

export interface SubRoutine {
	id: SubRoutineId;
	time: Time | null;
}

export type SubRoutinesList = Array<SubRoutine>;

export interface IRoutine {
	id: RoutineId;
	active: boolean;
	name: string;
	description: string;
	createdMoment: Moment;
	repeat: boolean;
	resheduleToNextDay: boolean;
	subRoutines: SubRoutinesList;
}

export interface INoRepeatRoutine {
	startMoment: Moment;
}

export interface IRepeatRoutine {
	repeatType: RepeatTypes;
	weekDays: Array<WeekDays>;
	monthDays: Array<MonthDay>;
	startMoment: Moment;
	periodUnit: PeriodUnits;
	periodValue: number;
}

export type Routine = IRoutine & INoRepeatRoutine & IRepeatRoutine;

export type RoutinesList = Array<Routine>;

/**
 * Task Moments
 * перемещение тасков
 */

export type TaskMoment = {
	id: TaskMomentId;
	subRoutineId: SubRoutineId;
	to: Moment | null;
};

export type TaskMomentsList = Array<TaskMoment>;

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
	routines: RoutinesList;
	checks: TasksList;
	moments: TaskMomentsList;
}

export interface RoutineData {
	checks: TasksList;
	moments: TaskMomentsList;
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

/** Task - отдельный таск в конкретный день */

export type Task = {
	routineId: RoutineId;
	subRoutineId: SubRoutineId;
	moment: Moment;
};

export type TasksList = Array<Task>;

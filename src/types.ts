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

export type DayOfYear = `${MonthDay}-${Months}`;

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
	YearDays,
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
	yearDays: Array<DayOfYear>;
	startMoment: Moment;
	periodUnit: PeriodUnits;
	periodValue: number;
}

export type Routine = IRoutine & INoRepeatRoutine & IRepeatRoutine;

export type RoutinesList = Array<Routine>;

/** Task Check (отметка о выполнении) */

export type TaskCheck = {
	id: TaskMomentId;
	moment: Moment;
}

export type TaskChecksList = Array<TaskCheck>;

/** Task Changes (перемещение) */

export type TaskChange = {
	id: TaskMomentId;
	to: Moment | null;
};

export type TaskChangesList = Array<TaskChange>;

export interface PlannerData {
	routines: RoutinesList;
	checks: TaskChecksList;
	changes: TaskChangesList;
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

export type TaskMoment = {
	id: TaskMomentId;
	period: [Moment, Moment | null];
};

export type Task = TaskMoment & {
	routineId: RoutineId;
	subRoutineId: SubRoutineId;
	moment: Moment;
};

export type TasksList = Array<Task>;

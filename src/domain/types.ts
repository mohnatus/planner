export enum WeekDays {
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday,
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

export interface ITask {
	id: string;
	active: boolean;

	name: string;
	description: string;

	createdMoment: number;

	repeat: boolean;

	defaultTime: Array<number>;

	exclude: {
		weekDays: Array<WeekDays>;
		monthDays: Array<number>;
		moments: Array<number>;
	};

	include: {
		moments: Array<number>;
	};

	time: {
		[key: number]: Array<number>;
	};
};

export interface INoRepeatTask {
	resheduleToNextDay: boolean;
	checkedMoment: number|null;
};

export interface IRepeatTask {
	repeatType: RepeatTypes;
	weekDays: Array<WeekDays>;
	monthDays: Array<number>;
	startMoment: number;
	periodUnit: PeriodUnits;
	periodValue: number;
	checkedMoments: Array<number>
};

export type Task = ITask & INoRepeatTask & IRepeatTask;

export type TasksList = Array<Task>;

export type DayTask = {
	id: string;
	name: string;
	description: string;
	time: number | null;
};

export type DayTasksList = Array<DayTask>;

export type Day = {
	id: number;
	moment: number;
	weekDay: WeekDays;
	monthDay: number;
};

export type DaysList = Array<Day>;

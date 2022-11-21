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
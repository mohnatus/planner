import {
	CALENDAR_VIEW_DATE,
	CALENDAR_VIEW_MONTH,
	CALENDAR_VIEW_YEAR,
} from './constants';

export type CalendarView =
	| typeof CALENDAR_VIEW_DATE
	| typeof CALENDAR_VIEW_MONTH
	| typeof CALENDAR_VIEW_YEAR;

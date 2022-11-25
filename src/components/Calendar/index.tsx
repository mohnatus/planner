import { useCallback, useEffect, useState } from 'react';

import { CalendarDay, Moment } from '../../types';
import {
	CALENDAR_VIEW_DATE,
	CALENDAR_VIEW_MONTH,
	CALENDAR_VIEW_YEAR,
} from './constants';

import { MONTHS } from '../../texts/Date';
import { getCalendarMonth } from '../../utils/date/calendar';
import { getTodayMoment } from '../../utils/date/today';

import { CalendarDays } from './CalendarDays';
import { CalendarMonths } from './CalendarMonths';
import { CalendarYears } from './CalendarYears';
import { CalendarHeader } from './CalendarHeader';

interface CalendarProps {
	moment: Moment;
	dayComponent?: (day: CalendarDay, moment: Moment) => JSX.Element;
	onSelect?: (moment: Moment) => void;
}

const CURRENT_YEAR = new Date().getFullYear();

function getYearRangeStart(year: number) {
	return year - (year % 10);
}

function Calendar({ moment, dayComponent, onSelect }: CalendarProps) {
	const [view, setView] = useState(CALENDAR_VIEW_DATE);
	const [viewMoment, setViewMoment] = useState(getTodayMoment());
	const [rangeStart, setRangeStart] = useState(
		getYearRangeStart(CURRENT_YEAR)
	);

	useEffect(() => {
		const _moment = moment || getTodayMoment();
		setViewMoment(_moment);
		const _date = new Date(_moment);
		setRangeStart(getYearRangeStart(_date.getFullYear()));
	}, [setViewMoment, moment]);

	const monthDays = getCalendarMonth(viewMoment);

	const date = new Date(viewMoment);
	const month = date.getMonth();
	const monthName = MONTHS[month];
	const year = date.getFullYear();

	const years = Array(12)
		.fill(null)
		.map((_, i: number) => rangeStart - 1 + i);

	const onDayClick = useCallback(
		(moment: Moment) => {
			if (typeof onSelect === 'function') onSelect(moment);
		},
		[onSelect]
	);

	const prevMonth = useCallback(() => {
		setViewMoment((prev) => {
			const _date = new Date(prev);
			_date.setDate(1);
			_date.setMonth(_date.getMonth() - 1);
			return +_date;
		});
	}, [setViewMoment]);

	const nextMonth = useCallback(() => {
		setViewMoment((prev) => {
			const _date = new Date(prev);
			_date.setDate(1);
			_date.setMonth(_date.getMonth() + 1);
			return +_date;
		});
	}, [setViewMoment]);

	const prevYear = useCallback(() => {
		setViewMoment((prev) => {
			const _date = new Date(prev);
			_date.setDate(1);
			_date.setFullYear(_date.getFullYear() - 1);
			return +_date;
		});
	}, [setViewMoment]);

	const nextYear = useCallback(() => {
		setViewMoment((prev) => {
			const _date = new Date(prev);
			_date.setDate(1);
			_date.setFullYear(_date.getFullYear() + 1);
			return +_date;
		});
	}, [setViewMoment]);

	const updateMonth = useCallback(
		(i: number) => {
			setViewMoment((prev) => {
				const _date = new Date(prev);
				_date.setDate(1);
				_date.setMonth(i);
				return +_date;
			});
			setView(CALENDAR_VIEW_DATE);
		},
		[setViewMoment]
	);

	const prevRange = useCallback(() => {
		setRangeStart((prev) => prev - 10);
	}, [setRangeStart]);

	const nextRange = useCallback(() => {
		setRangeStart((prev) => prev + 10);
	}, [setRangeStart]);

	const updateYear = useCallback(
		(year: number) => {
			setViewMoment((prev) => {
				const _date = new Date(prev);
				_date.setDate(1);
				_date.setFullYear(year);
				return +_date;
			});
			setView(CALENDAR_VIEW_MONTH);
		},
		[setView, setViewMoment]
	);

	return (
		<div>
			{view === CALENDAR_VIEW_DATE && (
				<>
					<CalendarHeader onPrev={prevMonth} onNext={nextMonth}>
						<span onClick={() => setView(CALENDAR_VIEW_MONTH)}>
							{monthName}
						</span>{' '}
						<span onClick={() => setView(CALENDAR_VIEW_YEAR)}>
							{year}
						</span>
					</CalendarHeader>

					<CalendarDays
						days={monthDays}
						moment={moment}
						onDayClick={onDayClick}
						dayComponent={dayComponent}
					/>
				</>
			)}

			{view === CALENDAR_VIEW_MONTH && (
				<>
					<CalendarHeader onPrev={prevYear} onNext={nextYear}>
						<span onClick={() => setView(CALENDAR_VIEW_YEAR)}>
							{year}
						</span>
					</CalendarHeader>

					<CalendarMonths
						onMonthClick={updateMonth}
						currentMonth={month}
					/>
				</>
			)}

			{view === 'year' && (
				<>
					<CalendarHeader onPrev={prevRange} onNext={nextRange}>
						<span>
							{rangeStart} - {rangeStart + 9}
						</span>
					</CalendarHeader>
					<CalendarYears
						years={years}
						currentYear={year}
						onYearClick={updateYear}
					/>
				</>
			)}
		</div>
	);
}

export type { CalendarProps };
export { Calendar };

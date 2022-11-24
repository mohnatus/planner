import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { MONTHS } from '../../texts/Date';
import { CalendarDay, Moment } from '../../types';
import { getCalendarMonth } from '../../utils/date/calendar';
import { getTodayMoment } from '../../utils/date/today';
import {
	CALENDAR_VIEW_DATE,
	CALENDAR_VIEW_MONTH,
	CALENDAR_VIEW_YEAR,
} from './constants';
import { COLORS } from '../../style/colors';

export interface CalendarProps {
	moment: Moment;
	dayComponent?: (day: CalendarDay, moment: Moment) => JSX.Element;
	onSelect?: (moment: Moment) => void;
}

export interface CalendarMonthDayProps {
	day: CalendarDay;
	onClick: (moment: Moment) => void;
  dayComponent: (day: CalendarDay, moment: Moment) => JSX.Element;
  moment: Moment;
}

const CalendarDays = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 245px;
	margin-right: -5px;
`;

interface CalendarDayProps {
	today: boolean;
	weekend: boolean;
	inactive: boolean;
}

const CalendarDate = styled.div<CalendarDayProps>`
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 11px;
	font-weight: 700;
	border-radius: 50%;
	cursor: pointer;
	margin-right: 5px;
	margin-bottom: 5px;

	${(props) => props.inactive && `color: ${COLORS.serviceText}`}
	${(props) =>
		props.today && !props.inactive && `color: ${COLORS.accent.color}`}
`;

function CalendarMonthDay({ day, onClick, moment, dayComponent }: CalendarMonthDayProps) {
	return (
		<CalendarDate
			today={day.isToday}
			weekend={day.isWeekend}
			inactive={!day.active}
			onClick={() => onClick(day.moment)}
		>
			{ dayComponent(day, moment) }
		</CalendarDate>
	);
}

const defaultDayComponent = (day: CalendarDay) => {
	return <span>{day.date}</span>;
};

const CURRENT_YEAR = new Date().getFullYear();
function getYearRangeStart(year: number) {
	return year - (year % 10);
}

export function Calendar({
	moment,
	dayComponent = defaultDayComponent,
	onSelect,
}: CalendarProps) {
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
			setViewMoment(
				(prev) => {
					const _date = new Date(prev);
					_date.setDate(1);
					_date.setFullYear(year);
          return +_date;
				},
			);
			setView(CALENDAR_VIEW_MONTH);
		},
		[setView, setViewMoment]
	);

	return (
		<div>
			{view === CALENDAR_VIEW_DATE && (
				<>
					<div>
						<button type='button' onClick={prevMonth}>
							&lt;
						</button>
						<span onClick={() => setView(CALENDAR_VIEW_MONTH)}>
							{monthName} {year}
						</span>
						<button type='button' onClick={nextMonth}>
							&gt;
						</button>
					</div>
					<CalendarDays>
						{monthDays.map((day) => (
							<CalendarMonthDay
								key={day.moment}
								day={day}
								onClick={onDayClick}
                moment={moment}
                dayComponent={dayComponent}
							></CalendarMonthDay>
						))}
					</CalendarDays>
				</>
			)}

			{view === CALENDAR_VIEW_MONTH && (
				<>
					<div>
						<button type='button' onClick={prevYear}>
							&lt;
						</button>
						<span onClick={() => setView(CALENDAR_VIEW_YEAR)}>
							{year}
						</span>
						<button type='button' onClick={nextYear}>
							&gt;
						</button>
					</div>
					<div>
						{MONTHS.map((monthName, i) => (
							<div key={i} onClick={() => updateMonth(i)}>
								{monthName}
							</div>
						))}
					</div>
				</>
			)}

			{view === 'year' && (
				<>
					<div>
						<button type='button' onClick={prevRange}>
							&lt;
						</button>
						<span>
							{rangeStart} - {rangeStart + 9}
						</span>
						<button type='button' onClick={nextRange}>
							&gt;
						</button>
					</div>
					<div>
						{years.map((year) => (
							<div key={year} onClick={() => updateYear(year)}>
								{year}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
}

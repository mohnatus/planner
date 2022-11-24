import styled from 'styled-components';
import { Moment, CalendarDay } from '../../types';
import { getTodayMoment } from '../../utils/date/today';
import { getCalendarMonth } from '../../utils/date/calendar';
import { COLORS } from '../../style/colors';
import { useCallback, useEffect, useState } from 'react';
import { MONTHS } from '../../texts/Date';

export interface DatepickerProps {
	value: Moment;
	onChange: (newValue: Moment) => void;
}

export interface DatepickerMonthDayProps {
	day: CalendarDay;
	selected: boolean;
	onSelect: (moment: Moment) => void;
}

const DatepickerDays = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 245px;
	margin-right: -5px;
`;

interface DatepickerDayProps {
	today: boolean;
	weekend: boolean;
	inactive: boolean;
	selected: boolean;
}

const DatepickerDate = styled.div<DatepickerDayProps>`
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
	${(props) =>
		props.selected &&
		!props.inactive &&
		`
	color: ${COLORS.accent.contrast};
	background-color: ${COLORS.accent.color};
	}`}
`;

function DatepickerMonthDay({
	day,
	selected,
	onSelect,
}: DatepickerMonthDayProps) {
	const onClick = () => onSelect(day.moment);

	return (
		<DatepickerDate
			today={day.isToday}
			weekend={day.isWeekend}
			inactive={!day.active}
			selected={selected}
			onClick={onClick}
		>
			{day.date}
		</DatepickerDate>
	);
}

export function Datepicker({ value, onChange }: DatepickerProps) {
	const [month, setMonth] = useState(getTodayMoment());
	const [tmpMonth, setTmpMonth] = useState(getTodayMoment());
	const [view, setView] = useState('date');

	useEffect(() => {
		setMonth(value || getTodayMoment());
		setTmpMonth(value || getTodayMoment());
	}, [value]);

	const monthDays = getCalendarMonth(month);

	const date = new Date(month);
	const currentMonth= date.getMonth();
	const currentMonthName = MONTHS[currentMonth];
	const currentYear = date.getFullYear();

	const tmpDate = new Date(tmpMonth);
	const tmpYear = tmpDate.getFullYear();

	const onDaySelect = useCallback(
		(moment: Moment) => {
			onChange(moment);
		},
		[onChange]
	);

	const prevMonth = useCallback(() => {
		setMonth((prev) => {
			const _date = new Date(prev);
			_date.setDate(1);
			_date.setMonth(_date.getMonth() - 1);
			return +_date;
		});
	}, [setMonth]);

	const nextMonth = useCallback(() => {
		setMonth((prev) => {
			const _date = new Date(prev);
			_date.setDate(1);
			_date.setMonth(_date.getMonth() + 1);
			return +_date;
		});
	}, [setMonth]);

	const prevTmpYear = useCallback(() => {
		setTmpMonth((prev) => {
			const _date = new Date(prev);
			_date.setDate(1);
			_date.setFullYear(_date.getFullYear() - 1);
			return +_date;
		});
	}, [setTmpMonth]);

	const nextTmpYear = useCallback(() => {
		setTmpMonth((prev) => {
			const _date = new Date(prev);
			_date.setDate(1);
			_date.setFullYear(_date.getFullYear() + 1);
			return +_date;
		});
	}, [setTmpMonth]);

	const updateMonth = useCallback((newMonth: number) => {
		const _date = new Date(month);
		_date.setDate(1);
		_date.setMonth(newMonth);

		setMonth(+_date);
		setTmpMonth(+_date);
		setView('date');
	}, [month, setMonth, setTmpMonth, setView])

	return (
		<div>
			{view === 'date' && (
				<>
					<div>
						<button type='button' onClick={prevMonth}>
							&lt;
						</button>
						<span onClick={() => setView('month')}>
							{currentMonthName} {currentYear}
						</span>
						<button type='button' onClick={nextMonth}>
							&gt;
						</button>
					</div>
					<DatepickerDays>
						{monthDays.map((day) => (
							<DatepickerMonthDay
								key={day.moment}
								day={day}
								selected={day.moment === value}
								onSelect={onDaySelect}
							/>
						))}
					</DatepickerDays>
				</>
			)}

			{view === 'month' && (
				<>
					<div>
						<button type='button' onClick={prevTmpYear}>
							&lt;
						</button>
						<span onClick={() => setView('year')}>{tmpYear}</span>
						<button type='button' onClick={nextTmpYear}>
							&gt;
						</button>
					</div>
					<div>
						{MONTHS.map((monthName, i) => <div key={i} onClick={() => updateMonth(i)}>{monthName}</div>)}
					</div>
				</>
			)}
		</div>
	);
}

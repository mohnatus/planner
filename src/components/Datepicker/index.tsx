import styled from 'styled-components';
import { Moment, CalendarDay } from '../../types';
import { getTodayMoment } from '../../utils/date/today';
import { getCalendarMonth } from '../../utils/date/calendar';
import { COLORS } from '../../style/colors';
import { useCallback, useEffect, useState } from 'react';
import { MONTHS } from '../../texts/Date';
import { Calendar } from '../Calendar';

export interface DatepickerProps {
	value: Moment;
	onChange: (newValue: Moment) => void;
}

export interface DatepickerMonthDayProps {
	day: CalendarDay;
	selected: boolean;
}


interface DatepickerDayProps {
	selected: boolean;
	inactive: boolean;
}

const DatepickerDate = styled.div<DatepickerDayProps>`
	width: 100%;
	height: 100%;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;

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
}: DatepickerMonthDayProps) {

	return (
		<DatepickerDate
			inactive={!day.active}
			selected={selected}
		>
			{day.date}
		</DatepickerDate>
	);
}

const DayComponentRenderFn = (day: CalendarDay, value: Moment): JSX.Element => {
	return <DatepickerMonthDay day={day} selected={day.moment === value} />
}

export function Datepicker({ value, onChange }: DatepickerProps) {

	const onDaySelect = useCallback(
		(moment: Moment) => {
			onChange(moment);
		},
		[onChange]
	);

	return (
		<div>
			<Calendar moment={value} onSelect={onDaySelect} dayComponent={DayComponentRenderFn} />
		</div>
	);
}

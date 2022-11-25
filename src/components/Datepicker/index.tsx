import { useCallback } from 'react';
import styled from 'styled-components';

import { Moment, CalendarDay } from '../../types';
import { COLORS } from '../../style/colors';

import { Calendar } from '../Calendar';

interface DatepickerProps {
	value: Moment;
	onChange: (newValue: Moment) => void;
}

interface DatepickerMonthDayProps {
	day: CalendarDay;
	selected: boolean;
}

interface DatepickerDayViewProps {
	selected: boolean;
	inactive: boolean;
}

const DatepickerDayView = styled.div<DatepickerDayViewProps>`
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

function DatepickerMonthDay({ day, selected }: DatepickerMonthDayProps) {
	return (
		<DatepickerDayView inactive={!day.active} selected={selected}>
			{day.date}
		</DatepickerDayView>
	);
}

const DayComponentRenderFn = (day: CalendarDay, value: Moment): JSX.Element => {
	return <DatepickerMonthDay day={day} selected={day.moment === value} />;
};

function Datepicker({ value, onChange }: DatepickerProps) {
	const onDaySelect = useCallback(
		(moment: Moment) => {
			onChange(moment);
		},
		[onChange]
	);

	return (
		<div>
			<Calendar
				moment={value}
				onSelect={onDaySelect}
				dayComponent={DayComponentRenderFn}
			/>
		</div>
	);
}

export type { DatepickerProps };
export { Datepicker };

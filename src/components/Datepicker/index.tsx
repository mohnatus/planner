import { useCallback } from 'react';
import styled from 'styled-components';

import { Moment, CalendarDay } from '../../types';
import { COLORS } from '../../ui/colors';

import { Calendar } from '../Calendar';

interface DatepickerProps {
	value: Moment;
	onChange: (newValue: Moment) => void;
}

interface DatepickerMonthDayProps {
	day: CalendarDay;
	selected: boolean;
}

interface DayViewProps {
	selected: boolean;
	inactive: boolean;
}

const DayView = styled.div<DayViewProps>`
	width: 30px;
	height: 30px;
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
		<DayView inactive={!day.active} selected={selected}>
			{day.date}
		</DayView>
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

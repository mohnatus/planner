import styled from 'styled-components';

import { CalendarDay, Moment } from '../../types';
import { COLORS } from '../../style/colors';

interface DayViewProps {
	today: boolean;
	weekend: boolean;
	inactive: boolean;
}

interface CalendarMonthDayProps {
	day: CalendarDay;
	onClick: (moment: Moment) => void;
	dayComponent?: (day: CalendarDay, moment: Moment) => JSX.Element;
	moment: Moment;
}

interface CalendarDaysProps {
	moment: Moment;
	days: Array<CalendarDay>;
	onDayClick: (moment: Moment) => void;
	dayComponent?: (day: CalendarDay, moment: Moment) => JSX.Element;
}

const CalendarDayView = styled.div<DayViewProps>`
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

const defaultDayComponent = (day: CalendarDay) => {
	return <span>{day.date}</span>;
};

function CalendarMonthDay({
	day,
	onClick,
	moment,
	dayComponent = defaultDayComponent,
}: CalendarMonthDayProps) {
	return (
		<CalendarDayView
			today={day.isToday}
			weekend={day.isWeekend}
			inactive={!day.active}
			onClick={() => onClick(day.moment)}
		>
			{dayComponent(day, moment)}
		</CalendarDayView>
	);
}

const CalendarDaysWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 245px;
	margin-right: -5px;
`;

function CalendarDays({
	moment,
	days,
	onDayClick,
	dayComponent,
}: CalendarDaysProps) {
	return (
		<CalendarDaysWrapper>
			{days.map((day) => (
				<CalendarMonthDay
					key={day.moment}
					day={day}
					onClick={onDayClick}
					moment={moment}
					dayComponent={dayComponent}
				></CalendarMonthDay>
			))}
		</CalendarDaysWrapper>
	);
}

export type { CalendarDaysProps };
export { CalendarDays };

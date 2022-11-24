import styled from 'styled-components';
import { CalendarDay, Moment } from '../../types';
import { COLORS } from '../../style/colors';

const defaultDayComponent = (day: CalendarDay) => {
	return <span>{day.date}</span>;
};

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

export interface CalendarMonthDayProps {
	day: CalendarDay;
	onClick: (moment: Moment) => void;
	dayComponent?: (day: CalendarDay, moment: Moment) => JSX.Element;
	moment: Moment;
}

function CalendarMonthDay({
	day,
	onClick,
	moment,
	dayComponent = defaultDayComponent,
}: CalendarMonthDayProps) {
	return (
		<CalendarDate
			today={day.isToday}
			weekend={day.isWeekend}
			inactive={!day.active}
			onClick={() => onClick(day.moment)}
		>
			{dayComponent(day, moment)}
		</CalendarDate>
	);
}

export interface CalendarDaysProps {
	moment: Moment;
	days: Array<CalendarDay>;
	onDayClick: (moment: Moment) => void;
	dayComponent?: (day: CalendarDay, moment: Moment) => JSX.Element;
}

const CalendarDaysWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 245px;
	margin-right: -5px;
`;

export function CalendarDays({
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

import styled from 'styled-components';

import { CalendarDay, Moment } from '../../types';
import { COLORS } from '../../ui/colors';

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

const DayView = styled.div<DayViewProps>`
	flex-shrink: 0;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	font-size: 11px;
	font-weight: 700;
	border-radius: 50%;
	cursor: pointer;

	${(props) => props.inactive && `color: ${COLORS.serviceText}`}
	${(props) =>
		props.today && !props.inactive && `color: ${COLORS.accent.color}`}
`;

const CalendarWeekView = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

const CalendarDaysView = styled.div`

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
		<DayView
			today={day.isToday}
			weekend={day.isWeekend}
			inactive={!day.active}
			onClick={() => onClick(day.moment)}
		>
			{dayComponent(day, moment)}
		</DayView>
	);
}

function CalendarDays({
	moment,
	days,
	onDayClick,
	dayComponent,
}: CalendarDaysProps) {
	const weeks = [];

	let currentIndex = 0;

	while (currentIndex < days.length) {
		const week = days.slice(currentIndex, currentIndex + 7);
		weeks.push(week);
		currentIndex += 7;
	}

	return (
		<CalendarDaysView>
			{weeks.map((week, i) => (
				<CalendarWeekView key={i}>
					{week.map((day) => (
						<CalendarMonthDay
							key={day.moment}
							day={day}
							onClick={onDayClick}
							moment={moment}
							dayComponent={dayComponent}
						></CalendarMonthDay>
					))}
				</CalendarWeekView>
			))}
		</CalendarDaysView>
	);
}

export type { CalendarDaysProps };
export { CalendarDays };

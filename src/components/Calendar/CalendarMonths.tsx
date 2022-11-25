import styled from 'styled-components';

import { MONTHS } from '../../texts/Date';

interface CalendarMonthsProps {
	onMonthClick: (month: number) => void;
	currentMonth: number;
}

const WrapperView = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const MonthView = styled.div`
	width: 33.33%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: pointer;
`;

function CalendarMonths({ onMonthClick, currentMonth }: CalendarMonthsProps) {
	return (
		<WrapperView>
			{MONTHS.map((monthName, i) => (
				<MonthView key={i} onClick={() => onMonthClick(i)}>
					{monthName}
				</MonthView>
			))}
		</WrapperView>
	);
}

export type { CalendarMonthsProps };
export { CalendarMonths };

import styled from 'styled-components';

import { MONTHS } from '../../texts/Date';

interface CalendarMonthsProps {
	onMonthClick: (month: number) => void;
	currentMonth: number;
}

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Month = styled.div`
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
		<Wrapper>
			{MONTHS.map((monthName, i) => (
				<Month key={i} onClick={() => onMonthClick(i)}>
					{monthName}
				</Month>
			))}
		</Wrapper>
	);
}

export type { CalendarMonthsProps };
export { CalendarMonths };

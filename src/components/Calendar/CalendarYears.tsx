import styled from 'styled-components';

interface CalendarYearsProps {
	years: Array<number>;
	currentYear: number;
	onYearClick: (year: number) => void;
}

const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const Year = styled.div`
	width: 33.33%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	text-align: center;
	cursor: pointer;
`;

function CalendarYears({
	years,
	currentYear,
	onYearClick,
}: CalendarYearsProps) {
	return (
		<Wrapper>
			{years.map((year) => (
				<Year key={year} onClick={() => onYearClick(year)}>
					{year}
				</Year>
			))}
		</Wrapper>
	);
}

export type { CalendarYearsProps };
export { CalendarYears };

import styled from 'styled-components';

interface CalendarYearsProps {
	years: Array<number>;
	currentYear: number;
	onYearClick: (year: number) => void;
}

const WrapperView = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

const YearView = styled.div`
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
		<WrapperView>
			{years.map((year) => (
				<YearView key={year} onClick={() => onYearClick(year)}>
					{year}
				</YearView>
			))}
		</WrapperView>
	);
}

export type { CalendarYearsProps };
export { CalendarYears };

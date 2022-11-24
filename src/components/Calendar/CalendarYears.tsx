export interface CalendarYearsProps {
	years: Array<number>;
	currentYear: number;
	onYearClick: (year: number) => void;
}

export function CalendarYears({
	years,
	currentYear,
	onYearClick,
}: CalendarYearsProps) {
	return (
		<div>
			{years.map((year) => (
				<div key={year} onClick={() => onYearClick(year)}>
					{year}
				</div>
			))}
		</div>
	);
}

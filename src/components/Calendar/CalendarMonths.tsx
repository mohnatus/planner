import { MONTHS } from '../../texts/Date';

export interface CalendarMonthsProps {
	onMonthClick: (month: number) => void;
	currentMonth: number;
}

export function CalendarMonths({
	onMonthClick,
	currentMonth,
}: CalendarMonthsProps) {
	return (
		<div>
			{MONTHS.map((monthName, i) => (
				<div key={i} onClick={() => onMonthClick(i)}>
					{monthName}
				</div>
			))}
		</div>
	);
}

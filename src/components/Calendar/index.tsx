import { Moment } from '../../types';
import { getDate, getDayOfMonth, getTodayMoment } from '../../utils/date';
import { getCalendarMonth } from './calendar';
import { CalendarDay } from './calendar.types';

import styles from './Calendar.module.css';

export interface CalendarProps {
	value: Moment;
	onChange: (newValue: Moment) => void;
}

export interface CalendarMonthDayProps {
	day: CalendarDay;
	selected: boolean;
	onSelect: (moment: Moment) => void;
}



function CalendarMonthDay({ day, selected, onSelect }: CalendarMonthDayProps) {
	const classes = [
		styles.Day,
		day.isToday && 'today',
		day.isWeekend && 'weekend',
		!day.active && styles.Inactive,
		selected && styles.Selected
	].filter(Boolean);

	const onClick = () => onSelect(day.moment);

	return (
		<div className={classes.join(' ')} onClick={onClick}>
			{day.date}
		</div>
	);
}

export function Calendar({ value, onChange }: CalendarProps) {
	const month = value || getTodayMoment();
	const monthDays = getCalendarMonth(month);

	const onDaySelect = (moment: Moment) => {
		onChange(moment);
	};

	return (
		<div className={styles.Days}>
			{monthDays.map((day) => (
				<CalendarMonthDay
					key={day.moment}
					day={day}
					selected={day.moment === value}
					onSelect={onDaySelect}
				/>
			))}
		</div>
	);
}

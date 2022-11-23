import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getDayTasks } from "../../domain/operations/getDayTasks";
import { CalendarDay, Moment } from "../../types";
import { getCalendarMonth } from "../../utils/date/calendar";
import { getTodayMoment } from "../../utils/date/today";
import { selectDayTasks } from "../tasks/tasksSlice";

import styles from './TasksCalendar.module.css'

function CalendarMonthDay({ day, onSelect }: { day: CalendarDay, onSelect: (value: Moment) => void }) {
  const tasks = useAppSelector(selectDayTasks(day.moment));

  console.log({ day, tasks })

	const classes = [

		day.isToday && 'today',
		day.isWeekend && 'weekend',
		!day.active && 'inactive',
	].filter(Boolean);

	const onClick = () => onSelect(day.moment);

	return (
		<div className={classes.join(' ')} onClick={onClick}>
			<b>{day.date}</b>({tasks.length})
		</div>
	);
}

export function TasksCalendar() {
  const month = getTodayMoment();
	const monthDays = getCalendarMonth(month);
  const navigate = useNavigate();

	const onDaySelect = (moment: Moment) => {
    navigate(`/day/${moment}`)
	};

	return (
		<div className={styles.Days}>
			{monthDays.map((day) => (

				<CalendarMonthDay
					key={day.moment}
					day={day}
					onSelect={onDaySelect}
				/>
			))}
		</div>
	);
}
import { useAppSelector } from "../../app/hooks";
import { getDayTasks } from "../../domain/operations/getDayTasks";
import { CalendarDay, Moment } from "../../types";
import { getCalendarMonth } from "../../utils/date/calendar";
import { getTodayMoment } from "../../utils/date/today";
import { selectDayTasks } from "../tasks/tasksSlice";

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
			{day.date} - {tasks.length}
		</div>
	);
}

export function TasksCalendar() {
  const month = getTodayMoment();
	const monthDays = getCalendarMonth(month);

	const onDaySelect = (moment: Moment) => {
		
	};

	return (
		<div>
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
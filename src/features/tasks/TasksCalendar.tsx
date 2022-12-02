import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAppSelector } from '../../app/hooks';
import { selectDayActiveTasks, selectDayActiveTasksCount, selectDayTasks, selectDayTasksCount} from './tasksSlice';
import { CalendarDay, Moment } from '../../types';
import { getTodayMoment } from '../../utils/date/today';

import { Calendar } from '../../components/Calendar';
import { COLORS } from '../../ui/colors';
import { getDateComponents } from '../../utils/date/format';
import { Container } from '../../containers/Container';
import { PageHeader } from '../../components/PageHeader';

interface TasksCalendarDayProps {
	day: CalendarDay;
}

interface TasksCalendarDayViewProps {
	today: boolean;
}

const TasksCalendarDayView = styled.div<TasksCalendarDayViewProps>`
	width: 40px;
	height: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	font-size: 16px;
`;

const DayTasksView = styled.div`
	width: 20px;
	height: 10px;
	background-color: ${COLORS.accent.color};
	color: ${COLORS.accent.contrast};
	font-size: 8px;
	position: absolute;
	bottom: 5px;
	right: -5px;
`;

const WrapperView = styled.div`
	width: 280px;
	max-width: 100%;
	margin: 0 auto;
`;

function TasksCalendarDay({ day }: TasksCalendarDayProps) {
	const tasksCount = useAppSelector(selectDayTasksCount(day.moment));
	const activeTasksCount = useAppSelector(selectDayActiveTasksCount(day.moment));

	return (
		<TasksCalendarDayView today={day.isToday}>
			{day.date}
			{tasksCount > 0 && <DayTasksView>{activeTasksCount} / {tasksCount}</DayTasksView>}
		</TasksCalendarDayView>
	);
}

const DayComponentRenderFn = (day: CalendarDay, value: Moment): JSX.Element => {
	return <TasksCalendarDay day={day} />;
};

export function TasksCalendar() {
	const month = getTodayMoment();
	const navigate = useNavigate();

	const onDaySelect = (moment: Moment) => {
		const { dayOfMonth, month, year } = getDateComponents(moment);
		const date = `${year}-${month}-${dayOfMonth}`;
		navigate(`/day/${date}`);
	};

	return (
		<div>
			<PageHeader
				title='Текущие задачи'
			></PageHeader>
			<Container>
				<WrapperView>
					<Calendar
						moment={month}
						onSelect={onDaySelect}
						dayComponent={DayComponentRenderFn}
					/>
				</WrapperView>
			</Container>
		</div>
	);
}

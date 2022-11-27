import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { DateBlock } from '../../components/DateBlock';
import { PageHeader } from '../../components/PageHeader';
import { Container } from '../../containers/Container';
import { Moment } from '../../types';
import { selectDayTasks } from '../tasks/tasksSlice';

export interface DayTasksProps {}

export function DayTasks() {
	const { moment = '' } = useParams();
	const [year, month, dayOfMonth] = moment.split('-');
	const date = new Date(+year, +month - 1, +dayOfMonth);
	const dayMoment: Moment = +date;
	const dayTasks = useAppSelector(selectDayTasks(dayMoment));

	return (
		<div>
			<PageHeader>
				<DateBlock moment={dayMoment} />
			</PageHeader>
			<Container>
				{dayTasks.map((task) => (
					<div key={task.id}>
						<div>{task.name}</div>
						<div>{task.description}</div>
						<hr />
					</div>
				))}
			</Container>
		</div>
	);
}

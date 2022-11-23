import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Moment } from '../../types';
import { selectDayTasks } from '../tasks/tasksSlice';

export interface DayTasksProps {}

export function DayTasks() {
	const { moment } = useParams();
	const dayMoment: Moment = Number(moment);
	const dayTasks = useAppSelector(selectDayTasks(dayMoment));

  console.log(dayTasks);

	return <div>
    {dayTasks.map(task => (<div key={task.id}>
      <div>{task.name}</div>
      <div>{task.description}</div>
      <hr />
    </div>))}
  </div>;
}

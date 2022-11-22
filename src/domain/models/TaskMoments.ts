import { TaskMoments } from '../../types';

export function TaskMomentsModel(taskId: string, data: Partial<TaskMoments>): TaskMoments {
	return {
		id: taskId,
		exclude: [],
		include: [],
		time: {},
		checks: [],
		...data
	};
}

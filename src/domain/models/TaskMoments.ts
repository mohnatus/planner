import { TaskMoments } from '../types';

export function TaskMomentsModel(data: Partial<TaskMoments>): TaskMoments {
	return {
		exclude: [],
		include: [],
		time: {},
		checks: [],
		...data
	};
}

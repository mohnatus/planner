import { RoutineMoments } from '../../types';

export function RoutineMomentsModel(taskId: string, data: Partial<RoutineMoments>): RoutineMoments {
	return {
		id: taskId,
		exclude: [],
		include: [],
		...data
	};
}

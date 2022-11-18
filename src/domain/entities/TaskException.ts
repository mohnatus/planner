import { TaskExceptions } from '../types';

export function TaskExceptionsModel(): TaskExceptions {
	return {
		exclude: {
			weekDays: [],
			monthDays: [],
			moments: [],
		},

		include: {
			moments: [],
		},

		time: {},
	};
}

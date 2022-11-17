import { nanoid } from 'nanoid';
import { PeriodUnits, RepeatTypes, Task } from './types';
import { getToday } from './utils';

export function TaskModel(taskData?: Partial<Task>): Task {
	const model = Object.assign(
		{
			id: nanoid(),
			active: true,

			name: '',
			description: '',
      createdMoment: getToday(),

			repeat: false,

			defaultTime: [],

			exclude: {
				weekDays: [],
				monthDays: [],
				moments: [],
			},

			include: {
				moments: [],
			},

			time: {},

			resheduleToNextDay: false,
			checkedMoment: null,

			repeatType: RepeatTypes.WeekDays,
			weekDays: [],
			monthDays: [],
			startMoment: getToday(),
			periodUnit: PeriodUnits.Days,
			periodValue: 0,
		},
		taskData || {}
	);

	return model;
}

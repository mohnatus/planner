import { nanoid } from 'nanoid';
import { PeriodUnits, RepeatTypes, Task } from '../../types';
import { getTodayMoment } from '../../utils/date/today';

export function TaskModel(taskData?: Partial<Task>): Task {
	const model = Object.assign(
		{
			id: nanoid(),
			active: true,

			name: '',
			description: '',
			createdMoment: getTodayMoment(),

			repeat: false,

			defaultTime: [],

			resheduleToNextDay: false,

			repeatType: RepeatTypes.WeekDays,
			weekDays: [],
			monthDays: [],
			startMoment: getTodayMoment(),
			periodUnit: PeriodUnits.Days,
			periodValue: 0,

			exclude: {
				weekDays: [],
				monthDays: [],
			},
		},
		taskData || {}
	);

	return model;
}

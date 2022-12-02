import { nanoid } from 'nanoid';
import { PeriodUnits, RepeatTypes, Routine } from '../../types';
import { getTodayMoment } from '../../utils/date/today';

export function RoutineModel(routineData?: Partial<Routine>): Routine {
	const model = Object.assign(
		{
			id: nanoid(),
			active: true,

			name: '',
			description: '',
			createdMoment: getTodayMoment(),

			repeat: false,

			defaultTime: [],

			resheduleToNextDay: true,

			repeatType: RepeatTypes.WeekDays,
			weekDays: [],
			monthDays: [],
			startMoment: getTodayMoment(),
			periodUnit: PeriodUnits.Days,
			periodValue: 0,
		},
		routineData || {}
	);

	return model;
}

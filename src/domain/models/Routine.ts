import { nanoid } from 'nanoid';
import { PeriodUnits, RepeatTypes, Routine } from '../../types';
import { getTodayMoment } from '../../utils/date/today';
import { SubRoutineModel } from './SubRoutine';

export function RoutineModel(routineData?: Partial<Routine>): Routine {

	let subRoutines = [ SubRoutineModel() ];
	if (routineData?.subRoutines?.length) {
		subRoutines = routineData.subRoutines;
	}

	const model = Object.assign(
		{
			id: nanoid(),
			active: true,

			name: '',
			description: '',
			createdMoment: getTodayMoment(),

			repeat: false,

			subRoutines,

			resheduleToNextDay: true,

			repeatType: RepeatTypes.WeekDays,
			weekDays: [],
			monthDays: [],
			yearDays: [],
			startMoment: getTodayMoment(),
			periodUnit: PeriodUnits.Days,
			periodValue: 0,
		},
		routineData || {}
	);

	return model;
}

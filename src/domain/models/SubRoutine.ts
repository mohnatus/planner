import { nanoid } from 'nanoid';
import { SubRoutine, Time } from '../../types';

export function SubRoutineModel(time?: Time): SubRoutine {
	return {
		id: nanoid(),
		time: time === undefined ? null : time,
	};
}

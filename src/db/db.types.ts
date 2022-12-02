import { DBSchema } from 'idb';
import { Routine, RoutineId, Task } from '../types';
import { STORE_ROUTINES, STORE_CHECKS } from './constants';

export interface PlannerDB extends DBSchema {
	[STORE_ROUTINES]: { key: RoutineId; value: Routine };
	[STORE_CHECKS]: { key: RoutineId; value: Task };
}

export type StoreNames =
	| typeof STORE_ROUTINES
	| typeof STORE_CHECKS;

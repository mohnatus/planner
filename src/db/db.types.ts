import { DBSchema } from 'idb';
import { Routine, RoutineId, TaskChange, TaskCheck, TaskMomentId } from '../types';
import { STORE_ROUTINES, STORE_CHECKS, STORE_CHANGES } from './constants';

export interface PlannerDB extends DBSchema {
	[STORE_ROUTINES]: { key: RoutineId; value: Routine };
	[STORE_CHECKS]: { key: TaskMomentId; value: TaskCheck };
	[STORE_CHANGES]: { key: TaskMomentId; value: TaskChange }
}

export type StoreNames =
	| typeof STORE_ROUTINES
	| typeof STORE_CHECKS
	| typeof STORE_CHANGES;

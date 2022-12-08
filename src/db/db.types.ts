import { DBSchema } from 'idb';
import { Routine, RoutineId, Task, TaskMoment, TaskMomentId } from '../types';
import { STORE_ROUTINES, STORE_CHECKS, STORE_MOMENTS } from './constants';

export interface PlannerDB extends DBSchema {
	[STORE_ROUTINES]: { key: RoutineId; value: Routine };
	[STORE_CHECKS]: { key: RoutineId; value: Task };
	[STORE_MOMENTS]: { key: TaskMomentId; value: TaskMoment }
}

export type StoreNames =
	| typeof STORE_ROUTINES
	| typeof STORE_CHECKS
	| typeof STORE_MOMENTS;

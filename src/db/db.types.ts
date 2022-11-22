import { DBSchema } from 'idb';
import { DayConfiguration, Moment, Task, TaskMoments } from '../types';
import { STORE_TASKS, STORE_MOMENTS, STORE_DAYS } from './constants';

export interface PlannerDB extends DBSchema {
	[STORE_TASKS]: { key: string; value: Task };
	[STORE_MOMENTS]: { key: string; value: TaskMoments };
	[STORE_DAYS]: { key: Moment; value: DayConfiguration };
}

export type StoreNames =
	| typeof STORE_TASKS
	| typeof STORE_MOMENTS
	| typeof STORE_DAYS;

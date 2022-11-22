import { IDBPDatabase } from 'idb';
import { TaskMoments, TaskMomentsList } from '../types';
import { STORE_MOMENTS } from './constants';
import { PlannerDB } from './db.types';

export async function getMomentsTransaction(
	db: IDBPDatabase<PlannerDB>
): Promise<TaskMomentsList> {

  const transaction = db.transaction(STORE_MOMENTS, 'readonly');
	const store = transaction.objectStore(STORE_MOMENTS);
	const moments = (await store.getAll()) || [];
	await transaction.done;

	const result: TaskMomentsList = {};

	moments.forEach((moment: TaskMoments) => {
		result[moment.id] = moment;
	});
	return result;
}
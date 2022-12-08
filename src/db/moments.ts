import { IDBPDatabase } from 'idb';
import { TaskMoment } from '../types';
import { STORE_MOMENTS } from './constants';
import { getDb } from './db';
import { PlannerDB } from './db.types';

export async function getMomentsTransaction(db: IDBPDatabase<PlannerDB>) {
	const transaction = db.transaction(STORE_MOMENTS, 'readonly');
	const store = transaction.objectStore(STORE_MOMENTS);
	const list = (await store.getAll()) || [];

	await transaction.done;
	return list;
}

export async function saveTaskMomentTransaction(
	db: IDBPDatabase<PlannerDB>,
	taskMoment: TaskMoment
) {
	const transaction = db.transaction(STORE_MOMENTS, 'readwrite');
	const store = transaction.objectStore(STORE_MOMENTS);

	await store.put(taskMoment);
	await transaction.done;
}

export async function saveTaskMoment(taskMoment: TaskMoment) {
	const db = await getDb();
	await saveTaskMomentTransaction(db, taskMoment);
}

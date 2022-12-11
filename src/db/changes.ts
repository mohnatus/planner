import { IDBPDatabase } from 'idb';
import { TaskChange } from '../types';
import { STORE_CHANGES } from './constants';
import { getDb } from './db';
import { PlannerDB } from './db.types';

export async function getChangesTransaction(db: IDBPDatabase<PlannerDB>) {
	const transaction = db.transaction(STORE_CHANGES, 'readonly');
	const store = transaction.objectStore(STORE_CHANGES);
	const list = (await store.getAll()) || [];

	await transaction.done;
	return list;
}

export async function clearChangesTransaction(db: IDBPDatabase<PlannerDB>) {
	const transaction = db.transaction(STORE_CHANGES, 'readwrite');
	const store = transaction.objectStore(STORE_CHANGES);
	await store.clear();
}

export async function saveTaskChangeTransaction(
	db: IDBPDatabase<PlannerDB>,
	taskChange: TaskChange
) {
	const transaction = db.transaction(STORE_CHANGES, 'readwrite');
	const store = transaction.objectStore(STORE_CHANGES);

	await store.put(taskChange);
	await transaction.done;
}

export async function saveTaskChange(taskChange: TaskChange) {
	const db = await getDb();
	await saveTaskChangeTransaction(db, taskChange);
}

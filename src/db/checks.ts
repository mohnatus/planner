import { IDBPDatabase } from 'idb';
import { Task } from '../types';
import { getTaskId } from '../utils/task/getTaskId';
import { STORE_CHECKS } from './constants';
import { getDb } from './db';
import { PlannerDB } from './db.types';

export async function getChecksTransaction(db: IDBPDatabase<PlannerDB>) {
	const transaction = db.transaction(STORE_CHECKS, 'readonly');
	const store = transaction.objectStore(STORE_CHECKS);
	const list = (await store.getAll()) || [];
	await transaction.done;
	return list;
}

export async function setTaskCheckTransaction(
	db: IDBPDatabase<PlannerDB>,
	task: Task
) {
	const transaction = db.transaction(STORE_CHECKS, 'readwrite');
	const store = transaction.objectStore(STORE_CHECKS);
	await store.put(task, getTaskId(task));
	await transaction.done;
}

export async function removeTaskCheckTransaction(
	db: IDBPDatabase<PlannerDB>,
	task: Task
) {
	const transaction = db.transaction(STORE_CHECKS, 'readwrite');
	const store = transaction.objectStore(STORE_CHECKS);
	const item = await store.get(getTaskId(task))
	console.log({ item })
	await store.delete(getTaskId(task));
	await transaction.done;
}

export async function toggleTaskCheck(task: Task, checked: boolean) {
	console.log({ task, checked})
	const db = await getDb();
	if (checked) await setTaskCheckTransaction(db, task);
	else await removeTaskCheckTransaction(db, task);
}

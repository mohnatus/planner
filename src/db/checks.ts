import { IDBPDatabase } from 'idb';
import { Task, TaskCheck, TaskMomentId } from '../types';
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
	check: TaskCheck
) {
	const transaction = db.transaction(STORE_CHECKS, 'readwrite');
	const store = transaction.objectStore(STORE_CHECKS);
	await store.put(check);
	await transaction.done;
}

export async function removeTaskCheckTransaction(
	db: IDBPDatabase<PlannerDB>,
	checkId: TaskMomentId
) {
	const transaction = db.transaction(STORE_CHECKS, 'readwrite');
	const store = transaction.objectStore(STORE_CHECKS);
	await store.delete(checkId);
	await transaction.done;
}

export async function toggleTaskCheck(task: Task, checked: boolean) {
	console.log({ task, checked})
	const db = await getDb();

	if (checked) await setTaskCheckTransaction(db, {
		id: task.id,
		moment: task.moment
	});
	else await removeTaskCheckTransaction(db, task.id);
}

import { IDBPDatabase } from 'idb';
import { Task } from '../types';
import { STORE_TASKS } from './constants';
import { getDb } from './db';
import { PlannerDB } from './db.types';

export async function getTasksTransaction(db: IDBPDatabase<PlannerDB>) {
	const transaction = db.transaction(STORE_TASKS, 'readonly');
	const store = transaction.objectStore(STORE_TASKS);
	const list = (await store.getAll()) || [];
	await transaction.done;
	list.sort((a, b) => {
		return a.createdMoment - b.createdMoment;
	});
	return list;
}

export async function saveTaskTransaction(
	db: IDBPDatabase<PlannerDB>,
	task: Task
) {
	const transaction = db.transaction(STORE_TASKS, 'readwrite');
	const store = transaction.objectStore(STORE_TASKS);
	await store.put(task);
	await transaction.done;
}

export async function deleteTaskTransaction(
	db: IDBPDatabase<PlannerDB>,
	task: Task
) {
	const transaction = db.transaction(STORE_TASKS, 'readwrite');
	const store = transaction.objectStore(STORE_TASKS);
	await store.delete(task.id);
	await transaction.done;
}

export async function createTask(task: Task) {
	const db = await getDb();
	await saveTaskTransaction(db, task);
}

export async function updateTask(task: Task) {
	const db = await getDb();
	await saveTaskTransaction(db, task);
}

export async function deleteTask(task: Task) {
	const db = await getDb();
	await deleteTaskTransaction(db, task);
}

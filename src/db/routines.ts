import { IDBPDatabase } from 'idb';
import { Routine } from '../types';
import { STORE_ROUTINES } from './constants';
import { getDb } from './db';
import { PlannerDB } from './db.types';

export async function getRoutinesTransaction(db: IDBPDatabase<PlannerDB>) {
	const transaction = db.transaction(STORE_ROUTINES, 'readonly');
	const store = transaction.objectStore(STORE_ROUTINES);
	const list = (await store.getAll()) || [];
	await transaction.done;
	list.sort((a, b) => {
		return a.createdMoment - b.createdMoment;
	});
	return list;
}

export async function clearRoutinesTransaction(db: IDBPDatabase<PlannerDB>) {
	const transaction = db.transaction(STORE_ROUTINES, 'readwrite');
	const store = transaction.objectStore(STORE_ROUTINES);
	await store.clear();
}

export async function saveRoutineTransaction(
	db: IDBPDatabase<PlannerDB>,
	routine: Routine
) {
	const transaction = db.transaction(STORE_ROUTINES, 'readwrite');
	const store = transaction.objectStore(STORE_ROUTINES);
	await store.put(routine);
	await transaction.done;
}

export async function deleteRoutineTransaction(
	db: IDBPDatabase<PlannerDB>,
	routine: Routine
) {
	const transaction = db.transaction(STORE_ROUTINES, 'readwrite');
	const store = transaction.objectStore(STORE_ROUTINES);
	await store.delete(routine.id);
	await transaction.done;
}

export async function createRoutine(routine: Routine) {
	const db = await getDb();
	await saveRoutineTransaction(db, routine);
}

export async function updateRoutine(routine: Routine) {
	const db = await getDb();
	await saveRoutineTransaction(db, routine);
}

export async function deleteRoutine(routine: Routine) {
	const db = await getDb();
	await deleteRoutineTransaction(db, routine);
}

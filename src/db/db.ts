import { openDB, deleteDB, wrap, unwrap, DBSchema, IDBPDatabase } from 'idb';
import { PlannerDB } from './db.types';
import { DB_NAME, DB_VERSION, STORE_CHECKS, STORE_ROUTINES } from './constants';

export function initDb(db: IDBPDatabase<PlannerDB>) {
	const { objectStoreNames } = db;

	// TODO удалить старые базы
	console.log({ objectStoreNames });

	if (!objectStoreNames.contains(STORE_ROUTINES)) {
		db.createObjectStore(STORE_ROUTINES, {
			keyPath: 'id',
		});
	}

	if (!objectStoreNames.contains(STORE_CHECKS)) {
		db.createObjectStore(STORE_CHECKS);
	}
}

export async function getDb(): Promise<IDBPDatabase<PlannerDB>> {
	const db = await openDB<PlannerDB>(DB_NAME, DB_VERSION, {
		upgrade: (db) => {
			initDb(db);
		},
	});
	return db;
}

import { openDB, deleteDB, wrap, unwrap, DBSchema, IDBPDatabase } from 'idb';
import { PlannerDB } from './db.types';
import { DB_NAME, DB_VERSION, STORE_CHECKS, STORE_CHANGES, STORE_ROUTINES } from './constants';

export function initDb(db: IDBPDatabase<PlannerDB>) {
	const { objectStoreNames } = db;

	if (!objectStoreNames.contains(STORE_ROUTINES)) {
		db.createObjectStore(STORE_ROUTINES, {
			keyPath: 'id',
		});
	}


	if (!objectStoreNames.contains(STORE_CHECKS)) {
		db.createObjectStore(STORE_CHECKS, {
			keyPath: 'id'
		});
	}

	if (!objectStoreNames.contains(STORE_CHANGES)) {
		db.createObjectStore(STORE_CHANGES, {
			keyPath: 'id'
		});
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

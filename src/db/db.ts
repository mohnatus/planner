import { openDB, deleteDB, wrap, unwrap, DBSchema, IDBPDatabase } from 'idb';
import { PlannerDB } from './db.types';
import {
	DB_NAME,
	DB_VERSION,
	STORE_DAYS,
	STORE_MOMENTS,
	STORE_TASKS,
} from './constants';

export function initDb(db: IDBPDatabase<PlannerDB>) {
	const { objectStoreNames } = db;

	if (!objectStoreNames.contains(STORE_TASKS)) {
		db.createObjectStore(STORE_TASKS, {
			keyPath: 'id',
		});
	}

	if (!objectStoreNames.contains(STORE_MOMENTS)) {
		db.createObjectStore(STORE_MOMENTS, {
			keyPath: 'id',
		});
	}

	if (!objectStoreNames.contains(STORE_DAYS)) {
		db.createObjectStore(STORE_DAYS, {
			keyPath: 'moment',
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

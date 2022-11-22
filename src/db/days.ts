import { IDBPDatabase } from 'idb';
import { DayConfiguration, DaysConfiguration } from '../types';
import { STORE_DAYS } from './constants';
import { PlannerDB } from './db.types';

export async function getDaysTransaction(db: IDBPDatabase<PlannerDB>): Promise<DaysConfiguration> {
  const transaction = db.transaction(STORE_DAYS, 'readonly');
	const store = transaction.objectStore(STORE_DAYS);
	const days = (await store.getAll()) || [];
	await transaction.done;

	const result: DaysConfiguration = {};

	days.forEach((day: DayConfiguration) => {
		result[day.moment] = day;
	});
	return result;
}
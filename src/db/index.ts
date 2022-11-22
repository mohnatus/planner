import { PlannerData } from '../types';

import { getDaysTransaction } from './days';
import { getMomentsTransaction } from './moments';
import { getTasksTransaction } from './tasks';
import { getDb } from './db';

export async function getPlannerData(): Promise<PlannerData> {
	const db = await getDb();

	const list = await getTasksTransaction(db);
	const moments = await getMomentsTransaction(db);
	const days = await getDaysTransaction(db);

	return { list, moments, days };
}
import { PlannerData } from '../types';
import { getDb } from './db';

import { getRoutinesTransaction } from './routines';
import { getChecksTransaction } from './checks';
import { getMomentsTransaction } from './moments';

export async function readPlannerData(): Promise<PlannerData> {
	const db = await getDb();

	const routines = await getRoutinesTransaction(db);
	const checks = await getChecksTransaction(db);
	const moments = await getMomentsTransaction(db);

	return { routines, checks, moments };
}
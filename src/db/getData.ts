import { PlannerData } from '../types';
import { getDb } from './db';

import { getRoutinesTransaction } from './routines';
import { getChecksTransaction } from './checks';
import { getChangesTransaction } from './changes';

export async function readPlannerData(): Promise<PlannerData> {
	const db = await getDb();

	const routines = await getRoutinesTransaction(db);
	const checks = await getChecksTransaction(db);
	const changes = await getChangesTransaction(db);

	return { routines, checks, changes };
}
import { PlannerData } from '../types';
import { getDb } from './db';

import { clearRoutinesTransaction, getRoutinesTransaction } from './routines';
import { clearChecksTransaction, getChecksTransaction } from './checks';
import { clearChangesTransaction, getChangesTransaction } from './changes';

export async function readPlannerData(): Promise<PlannerData> {
	const db = await getDb();

	const routines = await getRoutinesTransaction(db);
	const checks = await getChecksTransaction(db);
	const changes = await getChangesTransaction(db);

	return { routines, checks, changes };
}

export async function clearPlannerData() {
	const db = await getDb();
	await clearRoutinesTransaction(db);
	await clearChecksTransaction(db);
	await clearChangesTransaction(db);
}
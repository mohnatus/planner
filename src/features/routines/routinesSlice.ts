import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import { AppThunk, RootState } from '../../app/store';
import * as db from '../../db';
import { PlannerData, Routine, Task, TaskChange, TaskCheck } from '../../types';
import { RoutineModel } from '../../domain/models/Routine';

export enum Statuses {
	Loading,
	Idle,
}

export interface RoutinesState extends PlannerData {
	status: Statuses;
}

const initialState: RoutinesState = {
	status: Statuses.Loading,

	routines: [],
	checks: [],
	changes: [],
};

export const routinesSlice = createSlice({
	name: 'routines',
	initialState,
	reducers: {
		init: (state, action: PayloadAction<PlannerData>) => {
			console.log('init', action.payload);
			const { routines, checks, changes } = action.payload;
			state.routines = routines;
			state.checks = checks;
			state.changes = changes;

			state.status = Statuses.Idle;
		},
		addRoutine: (state, action: PayloadAction<Routine>) => {
			const newRoutine = action.payload;
			console.log('add routine to list', action, newRoutine);
			state.routines = [...state.routines, newRoutine];
		},
		removeRoutine: (state, action: PayloadAction<string>) => {
			state.routines = state.routines.filter(
				(routine) => routine.id !== action.payload
			);
		},
		editRoutine: (state, action: PayloadAction<Routine>) => {
			const updatedRoutine = action.payload;

			state.routines = state.routines.map((routine: Routine) => {
				if (routine.id === updatedRoutine.id) {
					return updatedRoutine;
				}
				return routine;
			});
		},
		toggleCheck: (
			state,
			action: PayloadAction<{ task: Task; checked: boolean }>
		) => {
			const { task, checked } = action.payload;

			const newChecksList = state.checks.filter(
				(check: TaskCheck) => check.id !== task.id
			);

			if (checked) {
				newChecksList.push(task);
			}

			state.checks = newChecksList;
		},
		addChange: (state, action: PayloadAction<TaskChange>) => {
			state.changes = [
				...state.changes.filter(
					(change: TaskChange) => change.id !== action.payload.id
				),
				action.payload,
			];
		},
	},
});

const {
	init,
	addRoutine: _addRoutine,
	removeRoutine: _removeRoutine,
	editRoutine: _editRoutine,
	toggleCheck,
	addChange,
} = routinesSlice.actions;
export { init, toggleCheck, addChange };

export const selectRoutines = (state: RootState) => state.routines.routines;
export const selectChecks = (state: RootState) => state.routines.checks;
export const selectChanges = (state: RootState) => state.routines.changes;

const routinesCache: {
	[key: string]: Selector<RootState, Routine | undefined>;
} = {};

export const selectRoutine = (id: string = '') => {
	if (!id) return () => undefined;

	if (routinesCache[id]) return routinesCache[id];

	const selector = createSelector(selectRoutines, (routines) => {
		return routines.find((routine: Routine) => routine.id === id);
	});
	console.log({ selector });
	routinesCache[id] = selector;
	return selector;
};

// Thunks

export const addRoutine =
	(routine: Partial<Routine>): AppThunk =>
	(dispatch, getState) => {
		const newRoutine = RoutineModel(routine);
		console.log('add routine', newRoutine);
		db.createRoutine(newRoutine).then(() => {
			dispatch(_addRoutine(newRoutine));
		});
	};

export const editRoutine =
	(routineId: string, data: Partial<Routine>): AppThunk =>
	(dispatch, getState) => {
		const { routines } = getState();
		const originalRoutine = routines.routines.find(
			(routine: Routine) => routine.id === routineId
		);

		if (!originalRoutine) return;

		const updatedRoutine = RoutineModel({
			...originalRoutine,
			...data,
		});

		console.log('edit routine', updatedRoutine);
		db.updateRoutine(updatedRoutine).then(() => {
			dispatch(_editRoutine(updatedRoutine));
		});
	};

export const removeRoutine =
	(routine: Routine): AppThunk =>
	(dispatch, getState) => {
		db.deleteRoutine(routine).then(() => {
			dispatch(_removeRoutine(routine.id));
		});
	};

export default routinesSlice.reducer;

export const clearDb = (): AppThunk => (dispatch) => {
	db.clearPlannerData().then(() => {
		dispatch(
			init({
				routines: [],
				checks: [],
				changes: [],
			})
		);
	});
};

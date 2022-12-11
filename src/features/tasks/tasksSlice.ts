import { createSelector } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import * as db from '../../db';
import { AppThunk, RootState } from '../../app/store';
import { getDayTasks } from '../../domain/operations/getDayTasks';
import { Moment, Task, TaskChange, TaskCheck, TasksList } from '../../types';
import {
	addChange,
	selectChecks,
	selectChanges,
	selectRoutines,
	toggleCheck,
} from '../routines/routinesSlice';

type TypedSelector<T> = Selector<RootState, T>;
type SelectorCreator<K, V> = (item: K) => TypedSelector<V>;

function SelectorWithCache<K, V>(getSelectorFn: SelectorCreator<K, V>) {
	const cache = new Map<K, TypedSelector<V>>();

	return (item: K): TypedSelector<V> => {
		if (cache.has(item)) return cache.get(item) as TypedSelector<V>;

		const selector = getSelectorFn(item);
		cache.set(item, selector);
		return selector;
	};
}

export const selectDayTasks = SelectorWithCache<Moment, TasksList>(
	(dayMoment: Moment) => {
		return createSelector(
			selectRoutines,
			selectChecks,
			selectChanges,
			(routines, checks, changes) => {
				const tasks = getDayTasks(dayMoment, {
					routines,
					checks,
					changes,
				});
				return tasks;
			}
		);
	}
);

export const selectDayTasksCount = SelectorWithCache<Moment, number>(
	(dayMoment: Moment) => {
		return createSelector(selectDayTasks(dayMoment), (tasks) => {
			return tasks.length;
		});
	}
);

export const selectDayActiveTasks = SelectorWithCache<Moment, TasksList>(
	(dayMoment: Moment) => {
		const tasksSelector = selectDayTasks(dayMoment);

		return createSelector(tasksSelector, selectChecks, (tasks, checks) => {
			return tasks.filter((task) => {
				return !checks.some((check) => check.id === task.id);
			});
		});
	}
);

export const selectDayActiveTasksCount = SelectorWithCache<Moment, number>(
	(dayMoment: Moment) => {
		return createSelector(selectDayActiveTasks(dayMoment), (tasks) => {
			return tasks.length;
		});
	}
);

export const isTaskChecked = SelectorWithCache<Task, boolean>((task: Task) => {
	return createSelector(selectChecks, (checks) => {
		console.log('is ttask checked', task, checks)
		return checks.some((check) => {
			return check.id === task.id;
		});
	});
});

// thunks

export const toggleTaskChecked =
	(task: Task): AppThunk =>
	(dispatch, getState) => {
		const { routines } = getState();
		const checked = routines.checks.some((check: TaskCheck) => {
			return check.id === task.id;
		});

		db.toggleTaskCheck(task, !checked).then(() => {
			dispatch(toggleCheck({ task, checked: !checked }));
		});
	};

export const moveTask =
	(task: Task, moment: Moment): AppThunk =>
	(dispatch, getState) => {
		const taskChange = {
			id: task.id,
			to: moment,
		};
		console.log('move task', { taskChange });
		db.saveTaskChange(taskChange).then(() => {
			dispatch(addChange(taskChange));
		});
	};


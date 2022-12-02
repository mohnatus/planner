import { createSelector } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import * as db from '../../db';
import { AppThunk, RootState } from '../../app/store';
import { getDayTasks } from '../../domain/operations/getDayTasks';
import { Moment, Task, TasksList } from '../../types';
import { isSameTask } from '../../utils/task/getTaskId';
import {
	selectChecks,
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
			(routines, checks) => {
				const tasks = getDayTasks(routines, dayMoment, checks);
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
				return !checks.some((check) => isSameTask(task, check));
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
		return checks.some((check) => {
			return (
				check.routineId === task.routineId &&
				check.moment === task.moment &&
				check.time === task.time
			);
		});
	});
});

// thunks

export const toggleTaskChecked =
	(task: Task): AppThunk =>
	(dispatch, getState) => {
		const { routines } = getState();
		const checked = routines.checks.some((check: Task) => {
			return isSameTask(check, task);
		});

		db.toggleTaskCheck(task, !checked).then(() => {
			dispatch(toggleCheck({ task, checked: !checked }));
		});
	};

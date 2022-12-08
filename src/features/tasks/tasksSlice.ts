import { createSelector } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import * as db from '../../db';
import { AppThunk, RootState } from '../../app/store';
import { getDayTasks } from '../../domain/operations/getDayTasks';
import { Moment, Task, TaskMoment, TasksList } from '../../types';
import {
	addMoment,
	selectChecks,
	selectMoments,
	selectRoutines,
	toggleCheck,
} from '../routines/routinesSlice';
import { isSameTask } from '../../utils/task/isSameTask';
import { getTaskMoment } from '../../domain/operations/getTaskMoment';
import { getRoutineById } from '../../domain/operations/routines';

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
			selectMoments,
			(routines, checks, moments) => {
			const tasks = getDayTasks(dayMoment, {routines, checks, moments});
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
			return isSameTask(check, task)
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

export const moveTask = (task: Task, moment: Moment): AppThunk => (dispatch, getState) => {
	const { routines } = getState();
	const routine = getRoutineById(task.routineId, routines.routines)
	if (!routine) return;

	const taskMoment = getTaskMoment(task, moment, routine);
	console.log('move task', { taskMoment })
	db.saveTaskMoment(taskMoment).then(() => {
		dispatch(addMoment(taskMoment))
	})
}

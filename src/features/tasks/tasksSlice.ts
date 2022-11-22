import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Selector } from 'react-redux';
import { AppThunk, RootState } from '../../app/store';
import { TaskModel } from '../../domain/models/Task';
import { getDayTasks } from '../../domain/operations/getDayTasks';
import { Moment, PlannerData, TasksList } from '../../types';
import {
	DaysConfiguration,
	DayTasksList,
	Task,
	TaskMomentsList,
} from '../../types';
import { addTask as addTaskToDb } from '../../db/tasks';

export enum Statuses {
	Loading,
	Idle,
}

export interface TasksState extends PlannerData {
	status: Statuses;
}

const initialState: TasksState = {
	status: Statuses.Loading,

	list: [],
	days: {},
	moments: {},
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		init: (state, action: PayloadAction<PlannerData>) => {
			console.log('init', { action });
			const { list, days, moments } = action.payload;
			state.list = list;
			state.days = days;
			state.moments = moments;
			state.status = Statuses.Idle;
		},
		addTaskToList: (state, action: PayloadAction<Task>) => {
			const newTask = action.payload;
			console.log('add task to list', action, newTask);
			state.list = [...state.list, newTask];
		},
		removeTask: (state, action: PayloadAction<string>) => {
			state.list = state.list.filter(
				(task) => task.id !== action.payload
			);
		},
		editTask: (
			state,
			action: PayloadAction<{ taskId: string; data: Partial<Task> }>
		) => {
			const { taskId, data } = action.payload;

			state.list = state.list.map((task: Task) => {
				if (task.id === taskId) {
					return {
						...task,
						...data,
					};
				}
				return task;
			});
		},
	},
});

export const { init, addTaskToList, removeTask, editTask } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.list;
export const selectDays = (state: RootState) => state.tasks.days;
export const selectMoments = (state: RootState) => state.tasks.moments;

const tasksCache: {
	[key: string]: Selector<RootState, Task | undefined>;
} = {};

export const selectTask = (id: string = '') => {
	if (!id) return () => undefined;

	if (tasksCache[id]) return tasksCache[id];

	const selector = createSelector(selectTasks, (tasks) => {
		return tasks.find((task: Task) => task.id === id);
	});
	console.log({ selector });
	tasksCache[id] = selector;
	return selector;
};

const daySelectorsCache: {
	[key: Moment]: Selector<RootState, DayTasksList>;
} = {};

export const selectDayTasks = (dayMoment: Moment) => {
	if (daySelectorsCache[dayMoment]) return daySelectorsCache[dayMoment];

	const selector = createSelector(
		selectTasks,
		selectMoments,
		(tasks, moments) => {
			return getDayTasks(tasks, dayMoment, moments);
		}
	);
	daySelectorsCache[dayMoment] = selector;
	return selector;
};

export const addTask =
	(task: Partial<Task>): AppThunk =>
	(dispatch, getState) => {
		const newTask = TaskModel(task);
		console.log('add task', newTask);
		addTaskToDb(newTask).then(() => {
			dispatch(addTaskToList(newTask));
		})

	};

// export const incrementIfOdd =
// 	(amount: number): AppThunk =>
// 	(dispatch, getState) => {
// 		const currentValue = selectCount(getState());
// 		if (currentValue % 2 === 1) {
// 			//dispatch(incrementByAmount(amount));
// 		}
// 	};

export default tasksSlice.reducer;

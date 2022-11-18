import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stringify } from 'querystring';
import { Selector } from 'react-redux';
import { RootState, AppThunk } from '../../app/store';
import { DayModel } from '../../domain/models/Day';
import { TaskModel } from '../../domain/models/Task';
import { getDayTasks } from '../../domain/operations/getDayTasks';
import {
	Day,
	DaysConfiguration,
	DayTasksList,
	Moment,
	Task,
	TaskMomentsList,
} from '../../domain/types';

export enum Statuses {
	Loading,
	Idle,
}

export interface TasksState {
	status: Statuses;

	list: Array<Task>;
	days: DaysConfiguration;
	moments: TaskMomentsList;
}

const initialState: TasksState = {
	status: Statuses.Idle,

	list: [],
	days: {},
	moments: {},
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Partial<Task>>) => {
      console.log('add task', action)
			const newTask = TaskModel(action.payload);
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

export const { addTask } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.list;
export const selectDays = (state: RootState) => state.tasks.days;
export const selectMoments = (state: RootState) => state.tasks.moments;

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


// export const incrementIfOdd =
// 	(amount: number): AppThunk =>
// 	(dispatch, getState) => {
// 		const currentValue = selectCount(getState());
// 		if (currentValue % 2 === 1) {
// 			//dispatch(incrementByAmount(amount));
// 		}
// 	};

export default tasksSlice.reducer;

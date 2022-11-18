import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { DaysConfiguration, Task, TaskExceptionsList } from '../../domain/types';

export enum Statuses {
  Loading,
  Idle,
}

export interface TasksState {
  status: Statuses,
  list: Array<Task>,
  daysConfiguration: DaysConfiguration,
  exceptions: TaskExceptionsList
}

const initialState: TasksState = {
  status: Statuses.Idle,
  list: [],
  daysConfiguration: {},
  exceptions: {}
};


// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     return response.data;
//   }
// );


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: state => {}
  },

  extraReducers: (builder) => {
    // builder
    //   .addCase(incrementAsync.pending, (state) => {
    //     state.status = 'loading';
    //   })
    //   .addCase(incrementAsync.fulfilled, (state, action) => {
    //     state.status = 'idle';
    //     state.value += action.payload;
    //   })
    //   .addCase(incrementAsync.rejected, (state) => {
    //     state.status = 'failed';
    //   });
  },
});

export const { addTask } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.list;


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      //dispatch(incrementByAmount(amount));
    }
  };

export default tasksSlice.reducer;

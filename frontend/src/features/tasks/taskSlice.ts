import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ITask } from '../../interfaces/ITask';
import { taskService } from '../../services/taskService';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await taskService.getTasks();
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: ITask) => {
  return await taskService.createTask(task);
});

interface TaskState {
  tasks: ITask[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      });
  },
});

export default taskSlice.reducer;
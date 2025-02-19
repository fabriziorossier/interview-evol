import { Task } from './task.entity';
import { TASK_REPOSITORY } from '../../core/database/constants';

export const tasksProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
];

export interface ITask {
  id?: number;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}
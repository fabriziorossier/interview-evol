import { useEffect, useState } from 'react';
import { fetchTasks } from '../features/tasks/taskSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { taskService } from '../services/taskService';
import { ITask } from '../interfaces/ITask';

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const { tasks, status, error } = useAppSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState<ITask | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleEdit = (task: ITask) => {
    setEditingTask(task);
  };

  const handleUpdate = async (id: number, updatedTask: Partial<ITask>) => {
    try {
      await taskService.updateTask(id, updatedTask);
      setEditingTask(null);
      dispatch(fetchTasks()); // Refresh the list after update
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await taskService.deleteTask(id);
      dispatch(fetchTasks()); // Refresh the list after deletion
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 border rounded shadow">
          {editingTask?.id === task.id ? (
            // Edit mode
            <div className="space-y-2">
              <input
                type="text"
                value={editingTask?.title || ''}
                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value, description: editingTask?.description || '' })}
                className="w-full p-2 border rounded"
              />
              <textarea
                value={editingTask?.description || ''}
                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value, title: editingTask?.title || '' })}
                className="w-full p-2 border rounded"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdate(task.id!, {
                    title: editingTask?.title || '',
                    description: editingTask?.description || ''
                  })}
                  className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View mode
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p className="mt-2">{task.description}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleEdit(task)}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id!)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
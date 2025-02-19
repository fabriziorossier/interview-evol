import { ITask } from '../interfaces/ITask';

const API_URL = 'http://localhost:3000/api';

export const taskService = {
    getTasks: async (): Promise<ITask[]> => {
        const response = await fetch(`${API_URL}/tasks`);
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return response.json();
    },
  
    createTask: async (task: ITask): Promise<ITask> => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check if the backend is running.');
      }
      throw error;
    }
  },

    updateTask: async (id: number, task: Partial<ITask>): Promise<ITask> => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }

            return response.json();
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to the server. Please check if the backend is running.');
            }
            throw error;
        }
    },

    deleteTask: async (id: number): Promise<void> => {
        try {
            const response = await fetch(`${API_URL}/tasks/${id}`, {
                credentials: 'include',
                method: 'DELETE',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                throw new Error('Unable to connect to the server. Please check if the backend is running.');
            }
            throw error;
        }
    }
};
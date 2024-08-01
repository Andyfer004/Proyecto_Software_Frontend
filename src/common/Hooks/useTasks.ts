import { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../../api/tasksApi';

type Task = {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status_id: number;
  created_at: string;
  updated_at: string;
};


const useTasks = () => {
    const [data, setData] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const tasks = await getTasks();
        setData(tasks);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const createTask = async (newTask: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
      setLoading(true);
      try {
        await addTask(newTask);
        await fetchData(); // Refrescar la lista de tareas
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const modifyTask = async (id: number, updatedTask: Partial<Omit<Task, 'id'>>) => {
      setLoading(true);
      try {
        await updateTask(id, updatedTask);
        await fetchData(); // Refrescar la lista de tareas
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    const removeTask = async (id: number) => {
      setLoading(true);
      try {
        await deleteTask(id);
        await fetchData(); // Refrescar la lista de tareas
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return { data, loading, error, createTask, modifyTask, removeTask };
  };
  
  export default useTasks;
  
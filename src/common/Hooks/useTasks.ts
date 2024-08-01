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

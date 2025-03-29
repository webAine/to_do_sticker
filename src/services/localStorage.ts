import { Task } from '../types/types';

// Theme
export const getTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark';
}

export const saveTheme = (isDarkTheme: boolean) => {
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Tasks
export const getTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks
    ? JSON.parse(savedTasks)
    : [];
}

export const saveTasks = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

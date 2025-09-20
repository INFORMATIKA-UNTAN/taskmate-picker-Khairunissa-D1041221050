import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskStatus } from '../types/task';

const TASKS_KEY = 'TASKS_KEY';

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
  toggleTask: () => {},
  deleteTask: () => {},
});

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load data dari AsyncStorage saat pertama kali
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem(TASKS_KEY);
      if (saved) setTasks(JSON.parse(saved));
    })();
  }, []);

  const saveTasks = async (newTasks: Task[]) => {
    setTasks(newTasks);
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(newTasks));
  };

  // addTask sekarang terima full Task
  const addTask = (task: Task) => {
    const updated = [...tasks, task];
    saveTasks(updated);
  };

  // toggle status → muter dari pending → todo → done → pending lagi
  const toggleTask = (task: Task) => {
    const nextStatus: TaskStatus =
      task.status === 'pending'
        ? 'todo'
        : task.status === 'todo'
        ? 'done'
        : 'pending';

    const updated: Task[] = tasks.map((t) =>
      t.id === task.id ? { ...t, status: nextStatus } : t
    );

    saveTasks(updated);
  };

  const deleteTask = (task: Task) => {
    const updated = tasks.filter((t) => t.id !== task.id);
    saveTasks(updated);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

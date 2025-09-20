// src/storage/taskStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const STORAGE_KEY = 'TASKS_DATA';

export const saveTasks = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Gagal menyimpan tasks', e);
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Gagal memuat tasks', e);
    return [];
  }
};

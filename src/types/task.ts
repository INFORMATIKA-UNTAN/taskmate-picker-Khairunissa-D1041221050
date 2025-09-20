export type TaskStatus = 'pending' | 'todo' | 'done';

export type Task = {
  id: number;
  title: string;
  description: string;
  deadline: string;   // pakai string supaya gampang disimpan di AsyncStorage
  category: string;
  status: TaskStatus;
};

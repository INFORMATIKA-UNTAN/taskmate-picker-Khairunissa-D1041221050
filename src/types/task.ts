// types/task.ts
import { Priority } from "../data/priorities";

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: "pending" | "todo" | "done";
  deadline: string;
  priority: Priority; // ✅ tambahin ini
}

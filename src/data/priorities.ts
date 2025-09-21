// data/priorities.ts

export type Priority = "High" | "Medium" | "Low";

interface PriorityConfig {
  color: string;
  weight: number;
}

const priorities: Record<Priority, PriorityConfig> = {
  High: { color: "#ef4444", weight: 3 },   // merah
  Medium: { color: "#f59e0b", weight: 2 }, // kuning
  Low: { color: "#3b82f6", weight: 1 },    // biru
};

/** Ambil warna sesuai prioritas */
export function colorOfPriority(priority: Priority): string {
  return priorities[priority]?.color || "#94a3b8";
}

/** Ambil bobot untuk sorting (High > Medium > Low) */
export function weightOfPriority(priority: Priority): number {
  return priorities[priority]?.weight || 0;
}

export default priorities;

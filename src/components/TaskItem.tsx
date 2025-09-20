import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const categoryColors: Record<string, string> = {
  Mobile: "#3b82f6", // biru
  RPL: "#10b981",    // hijau
  IoT: "#6b7280",    // abu
};

const statusColors: Record<string, string> = {
  pending: "#f59e0b", // kuning
  todo: "#fca5a5",    // merah muda
  done: "#22c55e",    // hijau
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        {/* Judul (dicoret kalau Done) */}
        <Text
          style={[
            styles.title,
            task.status === "done" && styles.completedTitle,
          ]}
        >
          {task.title}
        </Text>

        {/* Deskripsi */}
        {task.description ? (
          <Text style={styles.description}>{task.description}</Text>
        ) : null}

        {/* Category + Deadline */}
        <Text style={styles.meta}>
          {task.category} • Due {new Date(task.deadline).toISOString().split("T")[0]}
        </Text>

      </View>

      {/* Badge Category */}
      <View
        style={[
          styles.badge,
          { backgroundColor: categoryColors[task.category] || "#94a3b8" },
        ]}
      >
        <Text style={styles.badgeText}>{task.category}</Text>
      </View>

      {/* Badge Status */}
      <TouchableOpacity
        style={[
          styles.badge,
          { backgroundColor: statusColors[task.status] || "#cbd5e1" },
        ]}
        onPress={onToggle}
      >
        <Text style={styles.badgeText}>{task.status}</Text>
      </TouchableOpacity>

      {/* Tombol Delete */}
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#0f172a" },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  description: { fontSize: 14, color: "#475569", marginTop: 2 },
  meta: { fontSize: 12, color: "#64748b", marginTop: 4 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 6,
  },
  badgeText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  delete: { fontSize: 18, color: "#ef4444", marginLeft: 8 },
});

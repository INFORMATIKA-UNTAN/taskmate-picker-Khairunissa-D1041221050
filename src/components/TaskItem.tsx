import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../types/task";
import { colorOfPriority } from "../data/priorities";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

const categoryColors: Record<string, string> = {
  Mobile: "#3b82f6",
  RPL: "#10b981",
  IoT: "#6b7280",
};

const statusColors: Record<string, string> = {
  pending: "#f59e0b",
  todo: "#fca5a5",
  done: "#22c55e",
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const deadline = task.deadline ? new Date(task.deadline) : null;
  let deadlineText = "";
  let deadlineColor = "#64748b"; // default abu

  if (deadline) {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (task.status === "done") {
      // ✅ Logika khusus kalau status DONE
      if (diffDays >= 0) {
        deadlineText = "✅ Selesai tepat waktu";
        deadlineColor = "#16a34a"; // hijau
      } else {
        deadlineText = `⚠️ Selesai (telat ${Math.abs(diffDays)} hari)`;
        deadlineColor = "#f97316"; // oranye
      }
    } else {
      // ✅ Normal (belum selesai)
      if (diffDays > 1) {
        deadlineText = `${diffDays} hari lagi`;
        deadlineColor = "#0284c7"; // biru
      } else if (diffDays === 1) {
        deadlineText = "Besok";
        deadlineColor = "#f59e0b"; // kuning
      } else if (diffDays === 0) {
        deadlineText = "Hari ini";
        deadlineColor = "#10b981"; // hijau
      } else {
        deadlineText = `Overdue ${Math.abs(diffDays)} hari`;
        deadlineColor = "#ef4444"; // merah
      }
    }
  }

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        {/* Judul */}
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

        {/* Category + Deadline (tanggal mentah) */}
        {task.category || task.deadline ? (
          <Text style={styles.meta}>
            {task.category}{" "}
            {task.deadline &&
              `• Due ${new Date(task.deadline).toISOString().split("T")[0]}`}
          </Text>
        ) : null}

        {/* Reminder / Status Deadline */}
        {deadline && (
          <Text style={[styles.deadline, { color: deadlineColor }]}>
            {deadlineText}
          </Text>
        )}
      </View>

      {/* Badge Category */}
      {task.category && (
        <View
          style={[
            styles.badge,
            { backgroundColor: categoryColors[task.category] || "#94a3b8" },
          ]}
        >
          <Text style={styles.badgeText}>{task.category}</Text>
        </View>
      )}

      {/* Badge Priority */}
      {task.priority && (
        <View
          style={[
            styles.badge,
            { backgroundColor: colorOfPriority(task.priority) },
          ]}
        >
          <Text style={styles.badgeText}>{task.priority}</Text>
        </View>
      )}

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
  deadline: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 6,
  },
  badgeText: { color: "#fff", fontWeight: "600", fontSize: 12 },
  delete: { fontSize: 18, color: "#ef4444", marginLeft: 8 },
});

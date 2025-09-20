import { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";
import { TaskContext } from "@/context/TaskContext";
import TaskItem from "@/components/TaskItem";
import { Task } from "@/types/task";
import { useRouter } from "expo-router";

const filters = ["All", "Pending", "Todo", "Done"] as const;
type FilterType = typeof filters[number];

export default function HomeScreen() {
  const { tasks, toggleTask, deleteTask } = useContext(TaskContext);
  const [filter, setFilter] = useState<FilterType>("All");
  const router = useRouter();

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Pending") return task.status === "pending";
    if (filter === "Todo") return task.status === "todo";
    if (filter === "Done") return task.status === "done";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* Filter Buttons */}
      <View style={styles.filterRow}>
        {filters.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[styles.filterText, filter === f && styles.filterTextActive]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTask(item)}
            onDelete={() => deleteTask(item)}
          />
        )}
      />

      {/* Tombol ke Add Task */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: { fontSize: 20, fontWeight: "700", padding: 16 },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  filterActive: {
    backgroundColor: "#3b82f6",
    borderColor: "#3b82f6",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  filterTextActive: {
    color: "#fff",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#3b82f6",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { color: "#fff", fontSize: 32, fontWeight: "800" },
});

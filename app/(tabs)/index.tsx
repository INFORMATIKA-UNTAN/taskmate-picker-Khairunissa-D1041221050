import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { TaskContext } from "@/context/TaskContext";
import TaskItem from "@/components/TaskItem";
import { useRouter } from "expo-router";

const categoryFilters = ["All", "Mobile", "RPL", "IoT", "General"];
const statusFilters = ["All", "Pending", "Todo", "Done"];
const priorityFilters = ["All", "High", "Medium", "Low"];

export default function HomeScreen() {
  const { tasks, toggleTask, deleteTask } = useContext(TaskContext);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const router = useRouter();

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      categoryFilter === "All" ||
      task.category?.toLowerCase() === categoryFilter.toLowerCase();
    const statusMatch =
      statusFilter === "All" ||
      task.status?.toLowerCase() === statusFilter.toLowerCase();
    const priorityMatch =
      priorityFilter === "All" ||
      task.priority?.toLowerCase() === priorityFilter.toLowerCase();
    return categoryMatch && statusMatch && priorityMatch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

      {/* ✅ Filter Bar 1 Baris */}
      <View style={styles.filterRow}>
        {/* Category */}
        <View style={styles.dropdown}>
          <Text style={styles.label}>Category:</Text>
          <Picker
            selectedValue={categoryFilter}
            onValueChange={(val) => setCategoryFilter(val)}
            style={styles.picker}
            dropdownIconColor="#3b82f6"
          >
            {categoryFilters.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        {/* Status */}
        <View style={styles.dropdown}>
          <Text style={styles.label}>Progress:</Text>
          <Picker
            selectedValue={statusFilter}
            onValueChange={(val) => setStatusFilter(val)}
            style={styles.picker}
            dropdownIconColor="#3b82f6"
          >
            {statusFilters.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>

        {/* Priority */}
        <View style={styles.dropdown}>
          <Text style={styles.label}>Priority:</Text>
          <Picker
            selectedValue={priorityFilter}
            onValueChange={(val) => setPriorityFilter(val)}
            style={styles.picker}
            dropdownIconColor="#3b82f6"
          >
            {priorityFilters.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Task List */}
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

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add")}>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 10,
  },

  dropdown: {
    flex: 1,
    marginHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb", // ✅ abu-abu muda
    borderWidth: 1,
    borderColor: "#d1d5db", // ✅ abu-abu border
    borderRadius: 8,
    paddingHorizontal: 6,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151", // ✅ abu-abu gelap
    marginRight: 4,
  },

  picker: {
    flex: 1,
    height: 36,
    color: "#111827", // teks lebih gelap supaya terbaca
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


import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete?: (task: Task) => void; // opsional
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(task)}>
        <Text
          style={[
            styles.text,
            task.status === "done" && styles.completed, // coret kalau selesai
          ]}
        >
          {task.title}
        </Text>
      </TouchableOpacity>

      {onDelete && (
        <TouchableOpacity onPress={() => onDelete(task)}>
          <Text style={styles.delete}>❌</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  text: {
    fontSize: 16,
    color: "#1e293b",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  delete: {
    fontSize: 18,
    color: "red",
    marginLeft: 10,
  },
});

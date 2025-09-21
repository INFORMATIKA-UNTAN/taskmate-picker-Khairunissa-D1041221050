// app/(tabs)/add.tsx  (atau path sesuai projectmu)
import { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { TaskContext } from "@/context/TaskContext";
import { Task } from "@/types/task";
import { Priority } from "@/data/priorities"; // <- import Priority
import { useRouter } from "expo-router";

export default function AddScreen() {
  const { addTask } = useContext(TaskContext);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(""); // placeholder default kosong
  const [priority, setPriority] = useState<Priority | null>(null); // null = placeholder
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority(null); // <-- penting: set ke null, bukan ""
    setDate(new Date());
  };

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Judul tidak boleh kosong!");
      return;
    }
    if (!category) {
      Alert.alert("Error", "Silakan pilih kategori!");
      return;
    }
    if (!priority) {
      Alert.alert("Error", "Silakan pilih priority!");
      return;
    }

    const newTask: Task = {
      id: Date.now(), // number sesuai types/task.ts
      title,
      description,
      deadline: date.toISOString(),
      category,
      status: "pending",
      priority: priority as Priority, // safe karena sudah divalidasi
    };

    addTask(newTask);

    Alert.alert("Sukses", "Task berhasil ditambahkan!", [
      {
        text: "OK",
        onPress: () => {
          router.back();
        },
      },
    ]);

    resetForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Tugas</Text>

      <Text style={styles.label}>Judul</Text>
      <TextInput
        style={styles.input}
        placeholder="Judul Tugas"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={styles.input}
        placeholder="Deskripsi"
        value={description}
        onChangeText={setDescription}
      />

      {/* Date Picker */}
      <Text style={styles.label}>Deadline</Text>
      {Platform.OS === "web" ? (
        <View style={styles.input}>
          <input
            type="date"
            style={{
              border: "none",
              width: "100%",
              outline: "none",
              background: "transparent",
              fontSize: 16,
            }}
            value={date.toISOString().split("T")[0]}
            onChange={(e) =>
              setDate(new Date((e.target as HTMLInputElement).value))
            }
          />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text>{date.toISOString().split("T")[0]}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selected) => {
                setShowPicker(false);
                if (selected) setDate(selected);
              }}
            />
          )}
        </>
      )}

      {/* Category Picker */}
      <Text style={styles.label}>Kategori</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(v) => setCategory(v)}
          mode="dropdown"
        >
          <Picker.Item label="-- Pilih Kategori --" value="" />
          <Picker.Item label="Mobile" value="Mobile" />
          <Picker.Item label="RPL" value="RPL" />
          <Picker.Item label="IoT" value="IoT" />
          <Picker.Item label="General" value="General" />
        </Picker>
      </View>

      {/* Priority Picker */}
      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={priority}
          onValueChange={(v) => setPriority(v as Priority | null)}
          mode="dropdown"
        >
          <Picker.Item label="-- Pilih Priority --" value={null} />
          <Picker.Item label="High" value="High" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Low" value="Low" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>+ Tambah</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8fafc" },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    color: "#334155",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    padding: Platform.OS === "web" ? 8 : 2,
  },
  button: {
    backgroundColor: "#4f7cf5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

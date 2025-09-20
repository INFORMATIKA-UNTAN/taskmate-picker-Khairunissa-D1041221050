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
import { useRouter } from "expo-router";

export default function AddScreen() {
  const { addTask } = useContext(TaskContext);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("General");
    setDate(new Date());
  };

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Judul tidak boleh kosong!");
      return;
    }

    const newTask: Task = {
      id: Date.now(), // number
      title,
      description,
      deadline: date.toISOString(),
      category,
      status: "pending",
    };

    addTask(newTask);

    Alert.alert("Sukses ✅", "Task berhasil ditambahkan!");

    resetForm();

    // balik ke tab Home
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Tugas</Text>

      <TextInput
        style={styles.input}
        placeholder="Judul Tugas"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Deskripsi"
        value={description}
        onChangeText={setDescription}
      />

      {/* Date Picker */}
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
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={category} onValueChange={(v) => setCategory(v)}>
          <Picker.Item label="Mobile" value="Mobile" />
          <Picker.Item label="RPL" value="RPL" />
          <Picker.Item label="IoT" value="IoT" />
          <Picker.Item label="General" value="General" />
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
  title: { fontSize: 22, fontWeight: "800", marginBottom: 16 },
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
    padding: 12,
  },
  button: {
    backgroundColor: "#4f7cf5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});

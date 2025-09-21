import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAddCategory: (name: string) => void;
};

export default function AddCategoryModal({ visible, onClose, onAddCategory }: Props) {
  const [name, setName] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return; // TODO: tambah validasi (duplikat, dll)
    onAddCategory(name);
    setName("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Tambah Kategori</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama kategori..."
            value={name}
            onChangeText={setName}
          />
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose}><Text>Batal</Text></TouchableOpacity>
            <TouchableOpacity onPress={handleAdd}><Text>Simpan</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000077" },
  modal: { backgroundColor: "#fff", padding: 16, borderRadius: 12, width: "80%" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8, marginBottom: 12 },
  actions: { flexDirection: "row", justifyContent: "space-between" }
});

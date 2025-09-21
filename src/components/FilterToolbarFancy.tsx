import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  activeFilter: string;
  onPressFilter: (type: "Category" | "Progress" | "Priority") => void;
};

export default function FilterToolbarFancy({ activeFilter, onPressFilter }: Props) {
  return (
    <View style={styles.toolbar}>
      {["Category", "Progress", "Priority"].map((f) => (
        <TouchableOpacity
          key={f}
          style={[styles.pill, activeFilter === f && styles.active]}
          onPress={() => onPressFilter(f as any)}
        >
          <Text style={styles.text}>{f}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: { flexDirection: "row", justifyContent: "center", marginVertical: 8 },
  pill: { backgroundColor: "#eee", paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, marginHorizontal: 4 },
  active: { backgroundColor: "#4cafef" },
  text: { fontSize: 14 }
});

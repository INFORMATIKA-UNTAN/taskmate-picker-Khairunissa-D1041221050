import AsyncStorage from "@react-native-async-storage/async-storage";
import { Category } from "../data/categories";

const KEY = "categories";

export async function saveCategories(categories: Category[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(categories));
  } catch (e) {
    console.error("Error saving categories", e);
  }
}

export async function loadCategories(): Promise<Category[]> {
  try {
    const data = await AsyncStorage.getItem(KEY);
    return data ? (JSON.parse(data) as Category[]) : [];
  } catch (e) {
    console.error("Error loading categories", e);
    return [];
  }
}

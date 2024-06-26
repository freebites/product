/* These are all functions from https://react-native-async-storage.github.io/async-storage/docs/api    */

import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting item:", error);
  }
};

export const getItem = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? (JSON.parse(value) as T) : null;
  } catch (error) {
    console.error("Error getting item:", error);
    return null;
  }
};

export const getItemWithDefault = async <T>(
  key: string,
  defaultValue: T
): Promise<T> => {
  const storageItem = await getItem<T>(key);
  return storageItem ?? defaultValue;
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};

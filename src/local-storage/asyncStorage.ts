import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting item:', error);
  }
};

export const getItem = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting item:', error);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing item:', error);
  }
};

// export const mergeItem = async (key: string, value: any): Promise<void> => {
//   try {
//     await AsyncStorage.mergeItem(key, JSON.stringify(value));
//   } catch (error) {
//     console.error('Error merging item:', error);
//   }
// };

// export const clear = async (): Promise<void> => {
//   try {
//     await AsyncStorage.clear();
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };

// export const getAllKeys = async (): Promise<string[]> => {
//   try {
//     return await AsyncStorage.getAllKeys();
//   } catch (error) {
//     console.error('Error getting all keys:', error);
//     return [];
//   }
// };

// export const getAllItems = async (): Promise<{ [key: string]: any }> => {
//   try {
//     const keys = await AsyncStorage.getAllKeys();
//     const items = await AsyncStorage.multiGet(keys);
//     return items.reduce((accumulator, [key, value]) => {
//       if (value !== null) {
//         accumulator[key] = JSON.parse(value);
//       }
//       return accumulator;
//     }, {} as { [key: string]: any });
//   } catch (error) {
//     console.error('Error getting all items:', error);
//     return {};
//   }
// };

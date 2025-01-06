import AsyncStorage from '@react-native-async-storage/async-storage';

export class DataStorage {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error('Error setting item ' + key + ':' + value);
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error(error);
      throw new Error('Error getting item ' + key);
    }
  }
  static async removeItem(key: string): Promise<void> {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
      throw new Error('Error removing item ' + key);
    }
  }
}

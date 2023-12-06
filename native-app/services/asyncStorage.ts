import * as AsyncStorageBase from "@react-native-async-storage/async-storage";

export type AsyncStorageKeys = "MACHINE_VALUES";

export class AsyncStorage {
  static async setValue(key: AsyncStorageKeys, value: string) {
    await AsyncStorageBase.default.setItem(key, value);
  }

  static async getValue(key: AsyncStorageKeys): Promise<string> {
    return AsyncStorageBase.default.getItem(key);
  }
}

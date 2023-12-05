import * as ExpoSecureStore from "expo-secure-store";

export type SecureStoreKeys = "ACCESS_TOKEN" | "REFRESH_TOKEN";

export class SecureStore {
  static async setValue(key: SecureStoreKeys, value: string) {
    await ExpoSecureStore.setItemAsync(key, value);
  }

  static async getValue(key: SecureStoreKeys) {
    return ExpoSecureStore.getItemAsync(key);
  }
}

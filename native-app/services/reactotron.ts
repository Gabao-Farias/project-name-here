import Reactotron from "reactotron-react-native";

export class ReactotronService {
  static init() {
    if (!__DEV__) {
      return;
    }

    Reactotron.configure({
      name: "React Native Demo",
    })
      .useReactNative({
        asyncStorage: false,
        networking: {
          ignoreUrls: /symbolicate/,
        },
        editor: false,
        overlay: false,
      })
      .connect();
  }
}

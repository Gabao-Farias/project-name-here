import axios from "axios";
import { Platform } from "react-native";
import { UNAUTHORIZED_STATUS_CODE } from "../constants";
import { UnauthorizedObservable } from "../observables";
import { SecureStore } from "../services";

const isAndroid = Platform.OS === "android";

let baseURL = process.env.EXPO_PUBLIC_API_URL;

if (isAndroid && __DEV__) {
  baseURL = "http://10.0.2.2:3001";
}

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getValue("ACCESS_TOKEN");

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response.status === UNAUTHORIZED_STATUS_CODE) {
      UnauthorizedObservable.notify();
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };

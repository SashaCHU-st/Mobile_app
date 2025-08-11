import Constants from "expo-constants";

export const LOCAL_IP = Constants.expoConfig?.extra?.LOCAL_IP ?? "localhost";

export const API_URL =
  typeof navigator !== "undefined" && navigator.product === "ReactNative"
    ? `http://${LOCAL_IP}:3001`
    : "http://localhost:3001";

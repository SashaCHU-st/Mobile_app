// export const LOCAL_IP = "192.168.0.20";
export const LOCAL_IP = "10.0.2.2";

export const API_URL =
  typeof navigator !== "undefined" && navigator.product === "ReactNative"
    ? `http://${LOCAL_IP}:3001`
    : "http://localhost:3001";

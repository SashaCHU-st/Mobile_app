const adress = process.env.LOCAL_IP;
export const LOCAL_IP = adress;

export const API_URL =
  typeof navigator !== "undefined" && navigator.product === "ReactNative"
    ? `http://${LOCAL_IP}:3001`
    : "http://localhost:3001";

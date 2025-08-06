import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

export async function fetchMe() {
  const myId = await AsyncStorage.getItem("id");
  const token = await AsyncStorage.getItem("token");

  const results = await fetch(`${API_URL}/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: myId }),
  });

  if (!results.ok) {
    const data = await results.json();
    throw new Error(data.message || "Something went wrong");
  }

  const data = await results.json();
  console.log("DATA=>", data)
  return data.me[0];
}

export async function fetchNotification() {

      const token = await AsyncStorage.getItem("token");
      const results = await fetch(`${API_URL}/checkRequests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
        if (!results.ok) {
    const data = await results.json();
    throw new Error(data.message || "Something went wrong");
  }
      const data = await results.json();
      console.log("NOTIF=>", data)
    return data
}

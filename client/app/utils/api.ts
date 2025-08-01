import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

export async function fetchMe() {
  const myId = await AsyncStorage.getItem("id");
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}/me`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId: myId }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Something went wrong");
  }

  const data = await response.json();
  return data.me[0];
}

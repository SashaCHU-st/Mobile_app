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

export async function notifications(): Promise<number> {
  try {
    const token = await AsyncStorage.getItem("token");

    const results = await fetch(`${API_URL}/checkRequests`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (results.status === 204) {
      console.log("No notifications");
      return 0;
    }

    const text = await results.text();
    if (!text) {
      console.log("Empty response body");
      return 0; 
    }

    const data = JSON.parse(text);
    console.log("dataaaa =>", data);

    if (Array.isArray(data)) {
      return data.length;
    }
    return 1;
  } catch (error) {
    console.error("Notifications fetch error:", error);
    return 0;
  }
}


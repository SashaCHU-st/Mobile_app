import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { Me } from "../types/types";

export async function fetchMe(): Promise<Me> {

  const results = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!results.ok) {
    const data = await results.json();
    throw new Error(data.message || "Something went wrong");
  }

  const data = await results.json();
  console.log("DATA=>", data);
  return data.me;
}

export async function notifications(): Promise<number> {
  try {

    const results = await fetch(`${API_URL}/checkRequests`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await results.text();
    if (!text) {
      return 0;
    }

    const data = JSON.parse(text);

    if (Array.isArray(data)) {
      return data.length;
    }
    return data.users.length;
  } catch (error) {
    console.error("Notifications fetch error:", error);
    return 0;
  }
}

export async function chats(): Promise<number> {
  try {
    const id = await AsyncStorage.getItem("id");

    const results = await fetch(`${API_URL}/getChats`, {
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await results.text();
    if (!text) {
      return 0;
    }
    const data = JSON.parse(text);

    if (
      data.chats[0].read === false &&
      data.chats[0].from_friend !== Number(id)
    ) {
      return 1;
    } else return 0;
  } catch (error) {
    console.error("Chat fetch error:", error);
    return 0;
  }
}

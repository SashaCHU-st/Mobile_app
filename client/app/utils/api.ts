import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { Me } from "../types/types";

export async function fetchMe():Promise<Me> {
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

export async function notifications(): Promise<number> {
  try {
    const token = await AsyncStorage.getItem("token");

    const results = await fetch(`${API_URL}/checkRequests`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await results.text();
    if (!text) {
      console.log("Empty response body");
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
    const token = await AsyncStorage.getItem("token");

    const results = await fetch(`${API_URL}/getChats`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await results.text();
    if (!text) {
      console.log("Empty response body");
      return 0; 
    }
    const data = JSON.parse(text);

    console.log("GGGGGGG=>", data.chats[0].read)
    if(data.chats[0].read === false)
    {
      return 1
    }
    else
      return(0)
    // if (Array.isArray(data)) {
    //   return data.length;
    // }
    // return data.users.length;
  } catch (error) {
    console.error("Chat fetch error:", error);
    return 0;
  }
}
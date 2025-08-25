import { useState } from "react";
import { View, Pressable, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { size } from "../utils/size";
import { API_URL } from "../config";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Chats } from "../types/types";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const Chat = () => {
  const [chats, setChats] = useState<Chats[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [id, setId] = useState<number>(0);

  const handleChatList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const results = await fetch(`${API_URL}/getChats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("OOOO=>", data.chats);
      const myId = await AsyncStorage.getItem("id");

      console.log("ID=>", myId);
      setId(Number(myId));
      setChats(data.chats);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleChatList();
    }, [])
  );

  const moveToChat = async (id: number, message_id:number) => {
    console.log("MES_ID=>", message_id)
    console.log("ID=>", id)
    router.push({
      pathname: "/components/Chat/Chat",
      params: { id: id.toString(), message_id: message_id.toString() },
    });
  };

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10 }}
      ListEmptyComponent={<Text style={styles.emptyText}>No messages yet</Text>}
      renderItem={({ item: chat }) => {
        if (id === chat.id) return null;
        return (
          <Pressable
            style={styles.chatItem}
            onPress={() => moveToChat(chat.id, chat.message_id)}
          >
            {chat.read === false ? (
              <Text style={styles.chatTitle}>{chat.name} *</Text>
            ) : (
              <Text style={styles.chatTitle}>{chat.name}</Text>
            )}
            <FontAwesome name="comment" size={20} color="#7A85C1" />
            {/* <Text style={styles.chatTitle}>{chat.name}</Text> */}
          </Pressable>
        );
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({
  chats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 50,
    fontSize: 18,
    color: "#999",
    textAlign: "center",
  },
  chatItem: {
    flex: 1,
    margin: 8,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    alignItems: "flex-end",
  },
});

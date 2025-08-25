import { useState, useEffect, useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useChat } from "../../hooks/ChatHooks";
import { ChatRouteParams, Message } from "../../types/types";
import { API_URL } from "@/app/config";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chat() {
  const route = useRoute<RouteProp<{ params: ChatRouteParams }, "params">>();
  const friendId = Number(route.params?.id);
  const messageId = Number(route.params?.message_id);
  const [error, setError] = useState("");
  const { messages, sendMessage, myId } = useChat(friendId);
  const [text, setText] = useState("");

  const setRead = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const myId = await AsyncStorage.getItem("id");
      const result = await fetch(`${API_URL}/readChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: Number(messageId),
          to: Number(myId),
        }),
      });
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log("DATA", data);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };

  useFocusEffect(
    useCallback(() => {
      setRead();
    }, [])
  );
  const flatListRef = useRef<FlatList<Message>>(null);
  useEffect(() => {
    if (!flatListRef.current || messages.length === 0) return;

    requestAnimationFrame(() => {
      (flatListRef.current as any)?.scrollToEnd?.({ animated: true });
      try {
        flatListRef.current!.scrollToIndex({
          index: messages.length - 1,
          animated: true,
        });
      } catch {}
    });
  }, [messages.length]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <ChatMessage message={item} myId={myId} />}
          contentContainerStyle={{ paddingBottom: 70, paddingHorizontal: 8 }}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            }, 50);
          }}
        />
        <ChatInput text={text} setText={setText} sendMessage={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

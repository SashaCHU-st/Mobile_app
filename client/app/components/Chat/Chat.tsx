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

export default function Chat() {
  const route = useRoute<RouteProp<{ params: ChatRouteParams }, "params">>();
  const friendId = Number(route.params?.id);
  const { messages, sendMessage, myId } = useChat(friendId);
  const [text, setText] = useState("");

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

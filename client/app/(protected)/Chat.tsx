import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import { useChat } from "../hooks/ChatHooks";
import { ChatRouteParams } from "../types/types";

export default function Chat() {
  const route = useRoute<RouteProp<{ params: ChatRouteParams }, "params">>();
  const friendId = Number(route.params?.id);
  const { messages, sendMessage, myId } = useChat(friendId);
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9F9F9" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => <ChatMessage message={item} myId={myId} />}
          contentContainerStyle={{ paddingBottom: 70, paddingHorizontal: 8 }}
        />
        <ChatInput text={text} setText={setText} sendMessage={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

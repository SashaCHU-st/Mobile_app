import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import { ws_address } from "../config_key";
import { Message } from "../types/types";

export default function Chat() {
  const route = useRoute();
  const friendId = Number(route.params?.id);
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [myId, setMyId] = useState<number | null>(null);

  const addMessage = async (msg: Message) => {
    setMessages((prev) => {
      const newMessages = [...prev, msg];
      if (myId) {
        AsyncStorage.setItem(
          `chat_${myId}_${friendId}`,
          JSON.stringify(newMessages)
        );
      }
      return newMessages;
    });
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const token = await AsyncStorage.getItem("token");
      const storedId = await AsyncStorage.getItem("id");
      if (!token) return console.log("No token");
      if (storedId && isMounted) {
        setMyId(Number(storedId));
      }
    })();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, []);
  useEffect(() => {
    if (!myId) return;

    let isMounted = true;

    (async () => {
      setMessages([]);

      const token = await AsyncStorage.getItem("token");
      try {
        const res = await fetch(`${ws_address}/chat/${myId}/${friendId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const chatHistory: Message[] = await res.json();
          if (isMounted) {
            setMessages(chatHistory);
          }
        }
      } catch (err) {
        console.log("Error fetching chat history:", err);
      }

      if (!token) return;

      const ws = new WebSocket(`${ws_address}/ws?token=${token}`);
      wsRef.current = ws;

      ws.onopen = () => console.log("✅ WS connected");

      ws.onmessage = (e) => {
        if (!isMounted) return;

        const data: Message | { myId?: number } = JSON.parse(e.data);
        if ("myId" in data) {
          setMyId(myId);
          return;
        }

        const msg = data as Message;
        if (msg.from === friendId) {
          addMessage(msg);
        }
      };

      ws.onclose = () => console.log("❌ WS disconnected");
      ws.onerror = (err) => console.log("WS error", err);
    })();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, [friendId, myId]);

  const sendMessage = () => {
    if (!myId || !text.trim()) return;

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const msg: Message = { from: myId, to: friendId, message: text.trim() };
      wsRef.current.send(JSON.stringify(msg));
      addMessage(msg);
      setText("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          renderItem={({ item }) => {
            const isMe = item.from === myId;
            return (
              <View
                style={[
                  styles.messageContainer,
                  isMe ? styles.myMessage : styles.friendMessage,
                ]}
              >
                <Text style={[styles.messageText, !isMe && { color: "#000" }]}>
                  {item.message}
                </Text>
              </View>
            );
          }}
          contentContainerStyle={{ paddingBottom: 70, paddingHorizontal: 8 }}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Message"
            placeholderTextColor="#999"
            blurOnSubmit={false}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  messageContainer: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#b0b0b0ff",
    borderBottomRightRadius: 0,
  },
  friendMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000000ff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: "#fdfdfd",
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

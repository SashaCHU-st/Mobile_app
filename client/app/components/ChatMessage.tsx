import { View, Text, StyleSheet } from "react-native";
import { ChatMessageProps } from "../types/types";


export default function ChatMessage({ message, myId }: ChatMessageProps) {
  const isMe = message.from === myId;
  return (
    <View style={[styles.container, isMe ? styles.myMessage : styles.friendMessage]}>

      <Text style={[styles.text, !isMe && { color: "#000" }]}>
        {message.from}: 
        {message.message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  text: { fontSize: 16, color: "#000000ff" },
});

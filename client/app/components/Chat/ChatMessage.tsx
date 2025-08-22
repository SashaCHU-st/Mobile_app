import { View, Text, StyleSheet } from "react-native";
import { ChatMessageProps } from "../../types/types";

export default function ChatMessage({ message, myId }: ChatMessageProps) {
  const isMe = message.from.id === myId;

  return (
    <View
      style={[styles.wrapper, isMe ? styles.myWrapper : styles.friendWrapper]}
    >
      <View
        style={[
          styles.container,
          isMe ? styles.myMessage : styles.friendMessage,
        ]}
      >
        <Text style={styles.name}>{message.from.name}</Text>
        <Text style={styles.text}>{message.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  myWrapper: {
    alignItems: "flex-end",
  },
  friendWrapper: {
    alignItems: "flex-start",
  },
  container: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 16,
  },
  myMessage: {
    backgroundColor: "#b0b0b0ff",
    borderBottomRightRadius: 0,
  },
  friendMessage: {
    backgroundColor: "#E5E5EA",
    borderBottomLeftRadius: 0,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#000",
  },
  text: {
    fontSize: 16,
    color: "#000",
  },
});

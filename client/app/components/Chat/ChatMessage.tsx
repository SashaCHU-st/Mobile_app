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
        <View style={styles.chatHeader}>
          <Text style={styles.name}>{message.from.name}              </Text>
          
          <Text style={styles.text}>
            {new Date(message.created_at).toLocaleTimeString("en-GB", {
              timeZone: "Europe/Helsinki",
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <Text style={styles.text}>{message.message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatHeader:
  {
    flexDirection:"row",
    justifyContent:"space-between"
  },
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

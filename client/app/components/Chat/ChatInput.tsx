import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { ChatInputProps } from "../../types/types";

export default function ChatInput({
  text,
  setText,
  sendMessage,
}: ChatInputProps) {
  const [inputHeight, setInputHeight] = useState(40);

  const handleSend = () => {
    sendMessage(text);
    setText("");
    setInputHeight(40);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { height: Math.max(40, inputHeight) }]}
        value={text}
        onChangeText={setText}
        placeholder="Message"
        placeholderTextColor="#999"
        multiline={true}
        onContentSizeChange={(e) =>
          setInputHeight(e.nativeEvent.contentSize.height)
        }
        onKeyPress={({ nativeEvent }) => {
          if (nativeEvent.key === "Enter") {
            handleSend();
          }
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end", // чтобы кнопка выравнивалась по низу input
    padding: 8,
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
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});

import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { size } from "../utils/size";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

const Chat = () => {
  const { id } = useLocalSearchParams();
  const [inputHeight, setInputHeight] = useState(60);
  const [error, setError] = useState("");
  const [message, setMessage] = useState<string>("");

  const MAX_HEIGHT = 60; 

  const handleSendMessage = async (message:string) =>
  {
    try
    {
      const myId = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("token");
      const results = await fetch(`${API_URL}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(myId),
          friends_id: Number(id), 
          message
        }),
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
    }
    catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.messagesArea}></View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <View style={style.inputContainer}>
          <TextInput
            style={[style.input, { height: inputHeight }]}
            placeholder="Type a message..."
            multiline
            scrollEnabled={inputHeight >= MAX_HEIGHT}
            value={message}
            onChangeText={setMessage}
            onContentSizeChange={(e) =>
              setInputHeight(Math.min(MAX_HEIGHT, e.nativeEvent.contentSize.height + 10))
            }
          />
          <Pressable style={style.button} onPress={()=> handleSendMessage(message)}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesArea: {
    flex: 1,
  },
  inputContainer: {
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    width: 80,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});
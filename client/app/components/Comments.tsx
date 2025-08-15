import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import { PropsComments } from "../types/types";
import { useState } from "react";
const size = Dimensions.get("window").width * 0.1;

const Comments = ({ comments, setComments, id }: PropsComments) => {
  const [time, setTime] = useState(new Date().toISOString());
  const handleAddComment = async (comments: string, id: number) => {
    // const myId = await AsyncStorage.getItem("id");
    setTime(new Date().toISOString())
    const token = await AsyncStorage.getItem("token");
    const results = await fetch(`${API_URL}/addComments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // userId: Number(myId),
        id,
        comments,
        time,
      }),
    });
    const data = await results.json();
    if (!results.ok) {
      throw new Error(data.message || "Something went wrong");
    }
  };
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="My comments"
        value={comments}
        onChangeText={(text) => {
          setComments(text);
        }}
      />
      <Pressable
        style={styles.button}
        onPress={() => handleAddComment(comments, id)}
      >
        <Text>Add comments</Text>
      </Pressable>
    </View>
  );
};

export default Comments;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
});

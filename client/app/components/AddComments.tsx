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

const AddComments = ({ comments, setComments, id }: PropsComments) => {
  const [time, setTime] = useState(new Date().toISOString());
  const handleAddComment = async (comments: string, id: number) => {
    setTime(new Date().toISOString());

    const token = await AsyncStorage.getItem("token");
    const results = await fetch(`${API_URL}/addComments`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        comments,
        time,
      }),
    });
    const data = await results.json();
    if (!results.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    console.log("HHHH=>", data.comments);
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

export default AddComments;
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
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
});

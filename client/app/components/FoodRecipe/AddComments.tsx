import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import { API_URL } from "../../config";
import { PropsComments } from "../../types/types";
import { useState } from "react";
const size = Dimensions.get("window").width * 0.1;

const AddComments = ({ comments, setComments, id, onAdded }: PropsComments) => {
  const [error, setError] = useState<string>("");
  const [time, setTime] = useState(new Date().toISOString());
  const handleAddComment = async (comments: string, id: number) => {
    setComments("");
    setTime(new Date().toISOString());

    try {
      const results = await fetch(`${API_URL}/addComments`, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          comments,
          time,
        }),
      });
      if (results.ok) {
        setComments("");
        onAdded();
      }
      const data = await results.json();
      if (!results.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      console.log("DATA=>", data.comments);
    } catch (err: any) {
      setError(err.message || "Failed to add comments");
    }
  };
  return (
    <View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="My comments"
        value={comments}
        onChangeText={(text) => {
          setComments(text);
          setError("")
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
  errorText: {
    color: "red",
    marginBottom: 10,
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

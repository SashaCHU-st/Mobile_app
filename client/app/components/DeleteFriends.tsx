import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeleteFriendProps } from "../types/types";
import { API_URL } from "../config";
const size = Dimensions.get("window").width * 0.1;

const DeleteFriends: React.FC<DeleteFriendProps> = ({
  id,
  onDeleteFriends,
}) => {
  const [error, setError] = useState("");

  const handleDelete = async (id: number) => {
    const myId = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");

    try {
      const results = await fetch(`${API_URL}/deleteFriend`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(myId),
          friendsId: id,
        }),
      });
      const data = await results.json();
      if (!results.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${results.status}`
        );
      }
      if (onDeleteFriends) onDeleteFriends();
    } catch (err: any) {
      console.error("Error", err);
      setError(err.message || "Something went wrong");
    }
  };
  return (
    <View>
      <Pressable style={styles.button} onPress={() => handleDelete(id)}>
        <Text> Delete Friends</Text>
      </Pressable>
    </View>
  );
};

export default DeleteFriends;
const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  }
});

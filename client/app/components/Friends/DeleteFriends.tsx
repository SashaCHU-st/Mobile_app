import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { DeleteFriendProps } from "../../types/types";
import { API_URL } from "../../config";
import { size } from "../../utils/size";

const DeleteFriends: React.FC<DeleteFriendProps> = ({
  id,
  onDeleteFriends,
}) => {
  const [error, setError] = useState("");

  const handleDelete = async (id: number) => {

    try {
      const results = await fetch(`${API_URL}/deleteFriend`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        <Text> Delete</Text>
      </Pressable>
    </View>
  );
};

export default DeleteFriends;
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
});

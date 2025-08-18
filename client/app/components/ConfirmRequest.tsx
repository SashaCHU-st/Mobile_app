import { Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useState } from "react";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfirmFriendProps } from "../types/types";

const size = Dimensions.get("window").width * 0.1;
const ConfirmRequest: React.FC<ConfirmFriendProps> = ({ id, onConfirm }) => {
  const [error, setError] = useState("");
  const handleConfirm = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const fetchConfirm = await fetch(`${API_URL}/confirmFriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          friendsId: Number(id),
        }),
      });
      const data = await fetchConfirm.json();
      if (!fetchConfirm.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${fetchConfirm.status}`
        );
      }
      if (onConfirm) {
        onConfirm();
      }
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };
  return (
    <Pressable style={styles.button} onPress={() => handleConfirm(id)}>
      <Text>Confirm</Text>
    </Pressable>
  );
};

export default ConfirmRequest;
const styles = StyleSheet.create({
  userText: {
    fontSize: 20,
    marginVertical: 4,
  },
  button: {
    width: 100,
    height: 20,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
});

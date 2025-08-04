import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { useState } from "react";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ConfirmFriendProps } from "../types/types";


const size = Dimensions.get("window").width * 0.1;
const ConfirmRequest: React.FC<ConfirmFriendProps> = ({id}) => {
  const [error, setError] = useState("");
  const handleDecline = async (id: number) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const fetchDecline = await fetch(`${API_URL}/declineFriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          friendsId: Number(id),
        }),
      });
      const data = await fetchDecline.json();
      if (!fetchDecline.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${fetchDecline.status}`
        );
      }
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    }
  };
  return (
    <Pressable style={styles.button} onPress={() => handleDecline(id)}>
      <Text>Decline</Text>
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
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#DEE791",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    width: 140,
    backgroundColor: "#ff8989ff",
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

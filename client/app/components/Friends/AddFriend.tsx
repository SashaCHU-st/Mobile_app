import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../config";
import { AddFriendProps } from "../../types/types";

const size = Dimensions.get("window").width * 0.1;

const AddFriend: React.FC<
  AddFriendProps & { requestFrom?: "sent" | "received" | null }
> = ({ id, onFriendAdded, status, requestFrom = null }) => {
  const [error, setError] = useState<string>("");
  const isDisabled =
    status === 2 && (requestFrom === "sent" || requestFrom === "received");

  const handleAddFriends = async (friendsId: number) => {
    const myId = await AsyncStorage.getItem("id");
    const token = await AsyncStorage.getItem("token");

    try {
      const results = await fetch(`${API_URL}/addFriend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: Number(myId),
          friendsId,
        }),
      });

      const data = await results.json();

      if (!results.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${results.status}`
        );
      }

      if (onFriendAdded) onFriendAdded();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  const renderButtonText = () => {
    if (status === 2 && requestFrom === "sent") return "Request Sent";
    if (status === 2 && requestFrom === "received") return "Requested";
    return "Add Friend";
  };

  return (
    <View>
      <Pressable
        style={[styles.button, isDisabled && styles.disabledButton]}
        onPress={() => handleAddFriends(id)}
        disabled={isDisabled}
      >
        <Text>{renderButtonText()}</Text>
      </Pressable>
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
};

export default AddFriend;

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 40,
    borderRadius: size / 4,
    backgroundColor: "#7A85C1",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ff8989ff",
  },
});
